# _*_ coding: utf-8 _*_
############################################################
# File: mas-dev/.scripts/qa.py
#
# Author: Johnny Xu <johnny.xcy1997@outlook.com>
#
# File Created: 09/08/2023 10:50 am
#
# Last Modified: 09/08/2023 11:26 am
#
# Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
#
# Copyright (c) 2023 Maspectra Dev Team
############################################################
import argparse
import os
import pathlib
import subprocess
import sys
import time
import typing
from dataclasses import dataclass

import colorama

IQAUse = typing.Literal["eslint", "prettier", "pytest", "pyright", "black", "autoflake", "isort"]

REPO_ROOT: typing.Final[pathlib.Path] = pathlib.Path(__file__).parent.parent.resolve().absolute()


@dataclass
class QACliArgs:
    use: IQAUse
    fix: bool
    files_or_dirs: list[str]
    extra: typing.List[str]


def parse_args() -> QACliArgs:
    parser = argparse.ArgumentParser("Common QA toolkit for mas-dev codebase")
    parser.add_argument(
        "--use",
        required=True,
        choices=[
            "eslint",
            "prettier",
            "pytest",
            "pyright",
            "black",
            "autoflake",
            "isort",
        ],
        help="specify the qa tool to use",
    )
    parser.add_argument(
        "--fix",
        action="store_true",
        default=False,
        help="Whether to fix code with selected QA tool",
    )
    parser.add_argument("FILE_OR_DIR", help="The file or dir to be checked", nargs="+")
    [ns, extra] = parser.parse_known_args()

    return QACliArgs(use=ns.use, fix=ns.fix, files_or_dirs=ns.FILE_OR_DIR, extra=extra)


class IQACmdGetter(typing.Protocol):
    def __call__(
        self,
        cwd: pathlib.Path,
        fix: bool,
        files_or_dirs: list[pathlib.Path],
        extra: typing.List[str],
    ) -> str:
        raise NotImplementedError


def eslint_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    # !WARN 指定 eslint config 路径会导致 configuration invalid
    #     eslintrc = cwd.joinpath(".eslintrc.js").resolve()
    #     # fallback, search up to repo root
    #     while not eslintrc.exists():
    #         if eslintrc.parent == REPO_ROOT:
    #             raise FileNotFoundError("没有找到可以使用的 .eslintrc.js")
    #         eslintrc = eslintrc.parent.parent.joinpath(".eslintrc.js").resolve()

    cmd_parts = ["yarn", "eslint", "--cache", "--color"]
    if fix:
        cmd_parts.append("--fix")
    cmd_parts.extend(extra)

    cmd_parts.append(" ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]))
    return " ".join(cmd_parts)


def prettier_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    prettierrc = cwd.joinpath(".prettierrc.cjs").resolve()
    if not prettierrc.exists():
        # fallback
        prettierrc = REPO_ROOT.joinpath(".prettierrc.cjs").resolve()

    prettierignore = cwd.joinpath(".prettierignore").resolve()
    if not prettierignore.exists():
        # fallback
        prettierignore = REPO_ROOT.joinpath(".prettierignore").resolve()

    cmd_parts = [
        "yarn",
        "prettier",
        f"--config={prettierrc.as_posix()}",
        f"--ignore-path={prettierignore.as_posix()}",
    ]
    if fix:
        cmd_parts.append("--write")
    else:
        cmd_parts.append("--check")

    cmd_parts.extend(extra)

    cmd_parts.append(" ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]))
    return " ".join(cmd_parts)


def pytest_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    config = REPO_ROOT.joinpath("pyproject.toml").resolve()

    if fix:
        raise ValueError('pytest does not support "fix" mode')

    return " ".join(
        [
            "python",
            "-m",
            "pytest",
            "-c",
            config.as_posix(),
            f"--cov-config={config.as_posix()}",
            *extra,
            " ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]),
        ]
    )


def pyright_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    if fix:
        raise ValueError('Pyright does not support "fix" mode')

    return " ".join(
        [
            "yarn",
            "pyright",
            *extra,
            " ".join([f_or_d.relative_to(REPO_ROOT).as_posix() for f_or_d in files_or_dirs]),
        ]
    )


def black_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    config = REPO_ROOT.joinpath("pyproject.toml").resolve()
    cmd_parts = [
        "black",
        "--config",  # 递归处理文件夹
        config.relative_to(REPO_ROOT).as_posix(),
    ]

    if not fix:
        cmd_parts.append("--check")

    cmd_parts.extend(extra)
    cmd_parts.append(" ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]))

    return " ".join(cmd_parts)


def autoflake_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    cmd_parts = [
        "autoflake",
        "--recursive",  # 递归处理文件夹
        "--quiet",  # 不需要打印过多的输出
        "--remove-all-unused-imports",  # 没有使用的 import
        "--remove-unused-variables",  # 没有使用的变量
        "--remove-duplicate-keys",  # 重复的 key
        "--exclude",
        "node_modules,vendor,.venv,__pycache__,.pytest_cache,.mypy_cache,*pb2*.py,dist,build",
    ]

    if fix:
        cmd_parts.append("--in-place")
    else:
        cmd_parts.append("--check-diff")

    cmd_parts.extend(extra)
    cmd_parts.append(" ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]))

    return " ".join(cmd_parts)


def isort_cmd_getter(
    cwd: pathlib.Path,
    fix: bool,
    files_or_dirs: list[pathlib.Path],
    extra: typing.List[str],
) -> str:
    config = REPO_ROOT.joinpath("pyproject.toml").resolve()

    cmd_parts = [
        "isort",
        "--atomic",
        "--only-modified",
        "--settings",
        config.as_posix(),
    ]

    if not fix:
        cmd_parts.extend(["--diff", "--check"])
    cmd_parts.append(" ".join([f_or_d.as_posix() for f_or_d in files_or_dirs]))
    return " ".join(cmd_parts)


def cli() -> typing.NoReturn:
    cwd = pathlib.Path(os.getcwd()).absolute()
    args = parse_args()

    # "pytest", "eslint", "prettier", "mypy", "yapf", "autoflake", "isort", "black"
    cmd_getter: typing.Dict[IQAUse, IQACmdGetter] = {
        "eslint": eslint_cmd_getter,
        "prettier": prettier_cmd_getter,
        "pytest": pytest_cmd_getter,
        "pyright": pyright_cmd_getter,
        "black": black_cmd_getter,
        "autoflake": autoflake_cmd_getter,
        "isort": isort_cmd_getter,
    }

    refined_files_or_dirs: list[pathlib.Path] = []
    for f_or_d in args.files_or_dirs:
        p = pathlib.Path(f_or_d)
        if not p.is_absolute():
            p = cwd.joinpath(p).resolve()
        refined_files_or_dirs.append(p)

    # python qa tools must use REPO root as cwd
    if args.use in ["pytest", "pyright", "mypy", "yapf", "autoflake", "isort", "black"]:
        os.chdir(REPO_ROOT)
    cmd = cmd_getter[args.use](cwd=cwd, fix=args.fix, files_or_dirs=refined_files_or_dirs, extra=args.extra)
    print("cwd:", os.getcwd())
    print(">", cmd)

    start_time = time.time()
    p = subprocess.Popen(cmd, stdout=sys.stdout, stderr=sys.stderr, shell=True)
    p.communicate()
    time_elapsed = round(time.time() - start_time, 2)

    os.chdir(cwd)

    if p.returncode != 0:
        print(colorama.Fore.RED + f"😫 Failed: {args.use} (elapsed: {time_elapsed}s)" + colorama.Fore.RESET)
    else:
        print(colorama.Fore.GREEN + f"🎊 Success: {args.use} (elapsed: {time_elapsed}s)" + colorama.Fore.RESET)

    sys.exit(p.returncode)


if __name__ == "__main__":
    cli()

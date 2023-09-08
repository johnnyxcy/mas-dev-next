# _*_ coding: utf-8 _*_
############################################################
# File: mas-dev/.scripts/verify_commit.py
#
# Author: Johnny Xu <johnny.xcy1997@outlook.com>
#
# File Created: 09/08/2023 11:27 am
#
# Last Modified: 09/08/2023 11:29 am
#
# Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
#
# Copyright (c) 2023 Maspectra Dev Team
############################################################

import argparse
import pathlib
import re
import sys

import colorama
import git.repo

EMOJI_RANGES = [
    "\U0001F1E0-\U0001F1FF",  # flags (iOS)
    "\U0001F300-\U0001F5FF",  # symbols & pictographs
    "\U0001F600-\U0001F64F",  # emoticons
    "\U0001F680-\U0001F6FF",  # transport & map symbols
    "\U0001F700-\U0001F77F",  # alchemical symbols
    "\U0001F780-\U0001F7FF",  # Geometric Shapes Extended
    "\U0001F800-\U0001F8FF",  # Supplemental Arrows-C
    "\U0001F900-\U0001F9FF",  # Supplemental Symbols and Pictographs
    "\U0001FA00-\U0001FA6F",  # Chess Symbols
    "\U0001FA70-\U0001FAFF",  # Symbols and Pictographs Extended-A
    "\U00002702-\U000027B0",  # Dingbats
    "\U000024C2-\U0001F251",
]

EMOJI_PATTERN = f"[{'|'.join(EMOJI_RANGES)}]"


def _read_commit_msg_from_file(file_path: pathlib.Path) -> str:
    commit_msg: str = ""
    with open(file_path, mode="r", encoding="utf-8") as msg_file:
        for line in msg_file.readlines():
            # it is a comment line
            if line.startswith("#"):
                continue
            else:
                commit_msg += line

    return commit_msg


def verify_commit(commit_msg: str) -> None:
    """检查提交信息是否符合规范

    Args:
        commit_msg: 提交信息

    Notes:
        具体约定式提交的规范查看
    """
    repo = git.repo.Repo()

    is_merge_commit = pathlib.Path(repo.git_dir).joinpath("MERGE_HEAD").exists()

    valid_pattern: re.Pattern[str]

    if is_merge_commit:
        print(colorama.Fore.GREEN + "========== 检查到是 Merge Commit ==========" + colorama.Fore.RESET)
        valid_pattern = re.compile(r"Merge (remote[\w-]+\b )?branch .+ into .+")
    else:
        valid_pattern = re.compile(
            rf"^({EMOJI_PATTERN} )?(revert: )?(feat|fix|docs|perf|perform|performance|style|styles|refactor|chore|test|tests|locale)(\(.+\))?: .+"
        )

    colorama.init()
    if re.findall(valid_pattern, commit_msg):
        sys.exit(0)
    else:
        print(
            colorama.Back.RED
            + colorama.Fore.WHITE
            + "========== ERROR =========="
            + colorama.Back.RESET
            + colorama.Fore.RESET
        )
        print(colorama.Fore.RED + f'提交消息不符合规范 "{commit_msg.strip()}"' + colorama.Fore.RESET)

        if is_merge_commit:
            print(colorama.Fore.RED)

            print(
                """Merge commit 要求 commit 格式必须符合

    Merge branch .+ into .+'
    """
            )
            print(colorama.Fore.RESET)

        else:
            print(colorama.Fore.GREEN)

            print(
                """合法的提交日志格式如下 (emoji 和模块可选填):

    [<emoji>] [revert: ?]<type>[(scope)?]: <message>

    💥 feat: 添加了个很棒的功能
    🐛 fix: 修复了一些 bug
    📝 docs: 更新了一下文档
    🌷 style: 修改了一下样式
    📊 perf: 优化了性能瓶颈
    🔧 refactor: 重构了代码
    🤖 tests: 补充了一些测试
    🏰 chore: 对脚手架做了些更改
    🌐 locale: 为国际化做了微小的贡献
    """
            )

            print(colorama.Fore.RESET)
            print(colorama.Fore.RED + "查看 wikis/commit-convention.md 学习约定式提交的规范")

            print(colorama.Fore.RESET)

        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("*")
    args = parser.parse_args()
    kwargs = args._get_kwargs()
    if len(kwargs) != 1:
        raise ValueError("不知道如何处理 commit-msg hook 的入参", kwargs)
    commit_msg = _read_commit_msg_from_file(file_path=kwargs[0][1])
    verify_commit(commit_msg=commit_msg)

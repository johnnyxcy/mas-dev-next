# _*_ coding: utf-8 _*_
############################################################
# File: @mas/cmake-tools/ext_setup.py
#
# Author: 许翀轶 <chongyi.xu@drugchina.net>
#
# File Created: 11/07/2022 07:58 pm
#
# Last Modified: 09/07/2023 10:22 am
#
# Modified By: Chongyi Xu <johnny.xcy1997@outlook.com>
#
# Copyright (c) 2022 MaS Dev Team
############################################################

import pathlib
import os
import shutil
import subprocess
import sys
import re
import typing
import ninja

from setuptools import Extension
from setuptools.command.build_ext import build_ext

REPO_ROOT: typing.Final[pathlib.Path] = pathlib.Path(__file__).parent.parent.parent.parent.absolute()
sys.path.append(REPO_ROOT.as_posix())
import common.utils.console_logger as logger
from mas.vendor import pybind11_stubgen  # type: ignore


# A CMakeExtension needs a sourcedir instead of a file list.
# The name must be the _single_ output extension from the CMake build.
# If you need multiple extensions, see scikit-build.
class CMakeExtension(Extension):

    def __init__(
        self,
        module: str,
        source_dir: pathlib.Path,
        extra_cmake_args: list[str] = [],
        skip_tests: bool = True,
        report_coverage: bool = True,
        extra_dylib: list[str] = []
    ) -> None:
        # The last segment of module is name
        name = module.split(".")[-1]

        super().__init__(name, sources=[])
        self.source_dir = source_dir
        self.module = module
        self.extra_cmake_args = extra_cmake_args
        self.skip_tests = skip_tests
        self.report_coverage = report_coverage
        self.extra_dylib_patterns = [re.compile(rf"(lib|){p}(.+)?(\.dll|\.a|\.dylib)") for p in extra_dylib]


class CMakeBuild(build_ext):

    def build_extension(self, ext: CMakeExtension) -> None:
        library_out_dir = ext.source_dir / "build"
        if library_out_dir.exists():
            shutil.rmtree(library_out_dir)
        library_out_dir.mkdir()

        # Using this requires trailing slash for auto-detection & inclusion of
        # auxiliary "native" libs

        debug = int(os.environ.get("DEBUG", 0)) if self.debug is None else self.debug
        build_type = "Debug" if debug else "Release"

        # c_compiler = "clang"
        # cxx_compiler = "clang++"
        c_compiler = "gcc"
        cxx_compiler = "g++"

        # Set Python_EXECUTABLE instead if you use PYBIND11_FINDPYTHON
        # EXAMPLE_VERSION_INFO shows you how to pass a value into the C++ code
        # from Python.
        cmake_args = [
            "--fresh",
            f"-DCMAKE_C_COMPILER={c_compiler}",  # 使用 gcc 编译 C
            f"-DCMAKE_CXX_COMPILER={cxx_compiler}",  # 使用 g++ 编译 Cpp
            "-DMAS_SKIP_PYD=OFF",  # 使用 g++ 编译 Cpp
            f"-DCMAKE_LIBRARY_OUTPUT_DIRECTORY={library_out_dir.as_posix()}",
            f"-DPYTHON_EXECUTABLE={pathlib.Path(sys.executable).as_posix()}",
            f"-DCMAKE_BUILD_TYPE={build_type}",  # not used on MSVC, but no harm
        ]

        if ext.skip_tests:  # 跳过 gtest 编译
            cmake_args.append("-DMAS_SKIP_TESTS=ON")

        # if ext.report_coverage:
        #     cmake_args.append("-DCODE_COVERAGE=ON")

        # Adding CMake arguments set as environment variable
        # (needed e.g. to build for ARM OSx on conda-forge)
        if "CMAKE_ARGS" in os.environ:
            cmake_args += [item for item in os.environ["CMAKE_ARGS"].split(" ") if item]

        ninja_executable_path = pathlib.Path(ninja.BIN_DIR) / "ninja"
        cmake_args += [
            "-GNinja",  # 使用 Ninja 编译，这个更好用
            f"-DCMAKE_MAKE_PROGRAM={ninja_executable_path.as_posix()}",
        ]
        if sys.platform.startswith("darwin"):
            # Cross-compile support for macOS - respect ARCHFLAGS if set
            archs = re.findall(r"-arch (\S+)", os.environ.get("ARCHFLAGS", ""))
            if archs:
                cmake_args += ["-DCMAKE_OSX_ARCHITECTURES={}".format(";".join(archs))]

        build_args: typing.List[str] = ["--clean-first"]
        # Set CMAKE_BUILD_PARALLEL_LEVEL to control the parallel build level
        # across all generators.
        if "CMAKE_BUILD_PARALLEL_LEVEL" not in os.environ:
            # self.parallel is a Python 3 only way to set parallel jobs by hand
            # using -j in the build_ext call, not supported by pip or PyPA-build.
            if hasattr(self, "parallel") and self.parallel:
                # CMake 3.12+ only.
                build_args += [f"-j{self.parallel}"]

        build_dir = REPO_ROOT / "build"
        if not build_dir.exists():
            build_dir.mkdir()

        cmake_args.extend(ext.extra_cmake_args)

        cmake_cmd = ["cmake", "..", *cmake_args]
        logger.info(f"$ {' '.join(cmake_cmd)}")
        subprocess.run(cmake_cmd, cwd=build_dir, check=True)

        cmake_build_cmd = ["cmake", "--build", ".", *build_args]
        logger.info(f"$ {' '.join(cmake_build_cmd)}")
        subprocess.run(cmake_build_cmd, cwd=build_dir, check=True)

        # only windows platform need copy dll
        if sys.platform == "win32":
            # copy dll
            logger.info("检测到 windows 平台，拷贝 mingw dll")
            gcc_bin = shutil.which("g++")
            if not gcc_bin:
                raise ValueError("g++ not found")
            mingw_bin = pathlib.Path(gcc_bin).parent
            for dll in mingw_bin.glob('*.dll'):
                shutil.copy(dll, library_out_dir.joinpath(dll.name))

            local_install_prefix = REPO_ROOT / ".local"
            local_install_bin_dir = local_install_prefix / "bin"
            dylib_regex = "*.dll"
            for dll in local_install_bin_dir.glob(dylib_regex):
                for pattern in ext.extra_dylib_patterns:
                    if pattern.search(dll.as_posix()):
                        dest = library_out_dir.joinpath(dll.name)
                        logger.info(f"拷贝 dylib {dll.as_posix()} => {dest.as_posix()}")
                        shutil.copy(dll, dest)

        logger.info("================ pyi auto gen ================")

        pybind11_stubgen.BARE_NUPMY_NDARRAY = False
        pybind11_stubgen.logger.setLevel(10)
        libebt = pybind11_stubgen.ModuleStubsGenerator(ext.module)  # type: ignore
        libebt.parse()  # type: ignore
        os.chdir(library_out_dir)
        libebt.stub_suffix = ""
        libebt.write_setup_py = False
        libebt.write()  # type: ignore

        if pybind11_stubgen.FunctionSignature.n_fatal_errors() != 0:  # type: ignore
            logger.error(f"❌❌❌ pyi 已生成但是存在错误 ❌❌❌")

        logger.info("================ FINISHED ================")

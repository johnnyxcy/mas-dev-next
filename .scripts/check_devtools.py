# _*_ coding: utf-8 _*_
############################################################
# File: .scripts/check_devtools.py
#
# Author: 许翀轶 <chongyi.xu@drugchina.net>
#
# File Created: 08/03/2023 01:20 pm
#
# Last Modified: 09/07/2023 10:48 am
#
# Modified By: Chongyi Xu <johnny.xcy1997@outlook.com>
#
# Copyright (c) 2023 Maspectra Dev Team
############################################################
import re
import subprocess
import sys

import logger


def check_py_version() -> bool:
    """检查 conda 版本是否符合要求

    Notes:
        Required: conda@^23

    Returns:
        如果符合规范, 返回 True
    """
    logger.info("👉 Checking python version ^3.10")

    version_info = sys.version_info
    major = version_info.major
    minor = version_info.minor
    micro = version_info.micro

    if major != 3 or minor != 10 or micro < 8:
        logger.error(f"❌ Python {sys.version}")
        return False

    return True


def check_node_version() -> bool:
    """检查 Node 版本是否符合要求

    Notes:
        Required: node@^16

    Returns:
        如果符合规范, 返回 True
    """
    logger.info("👉 Checking node version ^16")
    return_code, node_version = subprocess.getstatusoutput("node --version")
    if return_code != 0:
        logger.error("❌ Node is not installed")
        return False
    if re.match(r"v16\.[0-9]+\.[0-9]+", node_version):
        logger.info(f"✅ Node {node_version}")
        return True
    else:
        logger.error(f"❌ Node {node_version}")
        return False


def check_yarn_version() -> bool:
    """检查 yarn 版本是否符合要求

    Notes:
        Required: yarn@^1.22

    Returns:
        如果符合规范, 返回 True
    """
    logger.info("👉 Checking yarn version ^1.22")
    return_code, yarn_version = subprocess.getstatusoutput("yarn --version")
    if return_code != 0:
        logger.error("❌ yarn is not installed")
        return False

    if re.match(r"1\.22.[0-9]+", yarn_version):
        logger.info(f"✅ yarn {yarn_version}")
        return True
    else:
        logger.error(f"❌ yarn {yarn_version}")
        return False


def check_cmake_version() -> bool:
    """检查 cmake 版本是否符合要求

    Notes:
        Required: cmake@^3

    Returns:
        如果符合规范, 返回 True
    """
    logger.info("👉 Checking CMake version ^3.22")
    return_code, cmake_version_output = subprocess.getstatusoutput(
        "cmake --version")
    if return_code != 0:
        logger.error("❌ cmake is not installed")
        return False
    cmake_version = re.findall(r"cmake version ([0-9]+\.[0-9]+\.[0-9]+)",
                               cmake_version_output.splitlines()[0])[0]
    if cmake_version and cmake_version >= "3.22.0":
        logger.info(f"✅ cmake {cmake_version}")
        return True
    else:
        logger.error(f"❌ cmake {cmake_version_output}")
        return False


def check_ninja_version() -> bool:
    """检查 Ninja 版本是否符合要求

    Notes:
        Required: Ninja@^1.10
    """
    logger.info("👉 Checking Ninja version ^1.10")
    return_code, ninja_version_output = subprocess.getstatusoutput(
        "ninja --version")
    if return_code != 0:
        logger.error("❌ Ninja is not installed")
        return False

    if re.match(r"[0-9]+\.[0-9]+\.[0-9]+",
                ninja_version_output) and ninja_version_output >= "1.10.0":
        logger.info(f"✅ Ninja {ninja_version_output}")
        return True
    else:
        logger.error(f"❌ Ninja {ninja_version_output}")
        return False


def check_devtools() -> None:
    py_version_is_valid = check_py_version()
    node_version_is_valid = check_node_version()
    yarn_version_is_valid = check_yarn_version()
    cmake_version_is_valid = check_cmake_version()
    ninja_version_is_valid = check_ninja_version()

    if py_version_is_valid and \
        node_version_is_valid and \
        yarn_version_is_valid and \
        cmake_version_is_valid and \
        ninja_version_is_valid:
        logger.info(f"😁 [OK] Devtools are all valid")
        return
    else:
        logger.error("😥 [FATAL] Please resolve devtools setup before warmup")
        sys.exit(1)


if __name__ == "__main__":
    check_devtools()

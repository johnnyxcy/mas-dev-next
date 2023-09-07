# _*_ coding: utf-8 _*_
############################################################
# File: .scripts/logger.py
#
# Author: Chongyi Xu <johnny.xcy1997@outlook.com>
#
# File Created: 09/07/2023 10:45 am
#
# Last Modified: 09/07/2023 10:48 am
#
# Modified By: Chongyi Xu <johnny.xcy1997@outlook.com>
#
# Copyright (c) 2023 Maspectra Dev Team
############################################################

import logging
import sys
import typing


class _ConsoleLoggerFormatter(logging.Formatter):
    grey = '\x1b[38;20m'
    light_green = '\x1b[92;20m'
    yellow = '\x1b[33;20m'
    red = '\x1b[31;20m'
    bold_red = '\x1b[31;1m'
    reset = '\x1b[0m'
    record_fmt = '[%(levelname)s][%(asctime)s] %(message)s'

    FORMATS = {
        logging.DEBUG: grey + record_fmt + reset,
        logging.INFO: light_green + record_fmt + reset,
        logging.WARNING: yellow + record_fmt + reset,
        logging.ERROR: red + record_fmt + reset,
        logging.CRITICAL: bold_red + record_fmt + reset
    }

    def format(self, record: logging.LogRecord) -> str:
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


def get_logger(name: str = "mas-dev-logger") -> logging.Logger:
    _logger = logging.getLogger(name=name)

    if not _logger.hasHandlers():
        _logger.setLevel(logging.DEBUG)
        _hdl = logging.StreamHandler(stream=sys.stdout)
        _hdl.setLevel(logging.DEBUG)
        _hdl.setFormatter(_ConsoleLoggerFormatter())
        _logger.addHandler(_hdl)

    return _logger


console: typing.Final[logging.Logger] = get_logger()
debug = console.debug
info = console.info
warning = console.warning
error = console.error
critical = console.critical

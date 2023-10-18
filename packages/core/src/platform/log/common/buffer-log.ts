/*
 * File: @mas/core/src/platform/log/common/buffer-log.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 01:35 pm
 *
 * Last Modified: 10/18/2023 01:36 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import {
    AbstractMessageLogger,
    DEFAULT_LOG_LEVEL,
    log,
    type ILogger,
    type LogLevel,
} from "@mas/core/platform/log/common/log";

interface ILog {
    level: LogLevel;
    message: string;
}

export class BufferLogger extends AbstractMessageLogger {
    declare readonly _serviceBrand: undefined;
    private buffer: ILog[] = [];
    private _logger: ILogger | undefined = undefined;

    constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
        super();
        this.setLevel(logLevel);
        this._register(
            this.onDidChangeLogLevel((level) => {
                this._logger?.setLevel(level);
            }),
        );
    }

    set logger(logger: ILogger) {
        this._logger = logger;

        for (const { level, message } of this.buffer) {
            log(logger, level, message);
        }

        this.buffer = [];
    }

    protected log(level: LogLevel, message: string): void {
        if (this._logger) {
            log(this._logger, level, message);
        } else if (this.getLevel() <= level) {
            this.buffer.push({ level, message });
        }
    }

    override dispose(): void {
        this._logger?.dispose();
    }

    override flush(): void {
        this._logger?.flush();
    }
}

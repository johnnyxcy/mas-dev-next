/*
 * File: @mas/core/src/platform/log/common/log-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 01:33 pm
 *
 * Last Modified: 10/18/2023 01:34 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { type Event } from "@mas/base/common/event";
import { Disposable } from "@mas/base/common/lifecycle";
import { MultiplexLogger, type ILogService, type ILogger, type LogLevel } from "@mas/core/platform/log/common/log";

export class LogService extends Disposable implements ILogService {
    declare readonly _serviceBrand: undefined;

    private readonly logger: ILogger;

    constructor(primaryLogger: ILogger, otherLoggers: ILogger[] = []) {
        super();
        this.logger = new MultiplexLogger([primaryLogger, ...otherLoggers]);
        this._register(primaryLogger.onDidChangeLogLevel((level) => this.setLevel(level)));
    }

    get onDidChangeLogLevel(): Event<LogLevel> {
        return this.logger.onDidChangeLogLevel;
    }

    setLevel(level: LogLevel): void {
        this.logger.setLevel(level);
    }

    getLevel(): LogLevel {
        return this.logger.getLevel();
    }

    trace(message: string, ...args: any[]): void {
        this.logger.trace(message, ...args);
    }

    debug(message: string, ...args: any[]): void {
        this.logger.debug(message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.logger.info(message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.logger.warn(message, ...args);
    }

    error(message: string | Error, ...args: any[]): void {
        this.logger.error(message, ...args);
    }

    flush(): void {
        this.logger.flush();
    }
}

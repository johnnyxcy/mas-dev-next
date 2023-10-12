/*
 * File: mas-dev/.scripts/bootstrap/loader.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/11/2023 03:24 pm
 *
 * Last Modified: 10/11/2023 03:55 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

"use strict";

// @ts-check

/**
 * @type {import("node:path")}
 */
const path = require("node:path");

/**
 * @type {import("tsconfig-paths")}
 */
const tsConfigPaths = require("tsconfig-paths");

/**
 * @type {import("typescript")}
 */
const ts = require("typescript");

// 获取当前工作目录的绝对路径
const currentDirectory = process.cwd();

const tsConfigFile = ts.findConfigFile(currentDirectory, ts.sys.fileExists, "tsconfig.json");

console.debug("[bootstrap/loader.cjs] using tsconfig.json: ", tsConfigFile);

const tsConfig = ts.readConfigFile(tsConfigFile, ts.sys.readFile).config;
// 获取编译选项（compilerOptions）
const compilerOptions = ts.parseJsonConfigFileContent(tsConfig, ts.sys, currentDirectory).options;

console.debug("[bootstrap/loader.cjs] compilerOptions: ", compilerOptions);

/*
 * File: @mas/vite-electron-plugin/src/index.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 03:12 pm
 *
 * Last Modified: 10/31/2023 11:19 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
export { notBundle, type NotBundleOptions } from "@mas/vite-electron-plugin/not-bundle";
export { type ElectronOptions } from "@mas/vite-electron-plugin/options";
export { default as electron, startup } from "@mas/vite-electron-plugin/plugin";

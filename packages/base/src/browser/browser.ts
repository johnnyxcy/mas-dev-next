/*
 * File: @mas/base/src/browser/browser.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 01:34 pm
 *
 * Last Modified: 10/12/2023 01:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, Event } from "@mas/base/common/event";
import { Disposable, markAsSingleton } from "@mas/base/common/lifecycle";

class WindowManager {
    static readonly INSTANCE = new WindowManager();

    // --- Zoom Level
    private _zoomLevel: number = 0;

    getZoomLevel(): number {
        return this._zoomLevel;
    }
    setZoomLevel(zoomLevel: number): void {
        if (this._zoomLevel === zoomLevel) {
            return;
        }
        this._zoomLevel = zoomLevel;
    }

    // --- Zoom Factor
    private _zoomFactor: number = 1;

    getZoomFactor(): number {
        return this._zoomFactor;
    }
    setZoomFactor(zoomFactor: number): void {
        this._zoomFactor = zoomFactor;
    }

    // --- Fullscreen
    private _fullscreen: boolean = false;
    private readonly _onDidChangeFullscreen = new Emitter<void>();

    readonly onDidChangeFullscreen: Event<void> = this._onDidChangeFullscreen.event;
    setFullscreen(fullscreen: boolean): void {
        if (this._fullscreen === fullscreen) {
            return;
        }

        this._fullscreen = fullscreen;
        this._onDidChangeFullscreen.fire();
    }
    isFullscreen(): boolean {
        return this._fullscreen;
    }
}

/**
 * See https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#monitoring_screen_resolution_or_zoom_level_changes
 */
class DevicePixelRatioMonitor extends Disposable {
    private readonly _onDidChange = this._register(new Emitter<void>());
    readonly onDidChange = this._onDidChange.event;

    private readonly _listener: () => void;
    private _mediaQueryList: MediaQueryList | null;

    constructor() {
        super();

        this._listener = () => this._handleChange(true);
        this._mediaQueryList = null;
        this._handleChange(false);
    }

    private _handleChange(fireEvent: boolean): void {
        this._mediaQueryList?.removeEventListener("change", this._listener);

        this._mediaQueryList = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
        this._mediaQueryList.addEventListener("change", this._listener);

        if (fireEvent) {
            this._onDidChange.fire();
        }
    }
}

class PixelRatioImpl extends Disposable {
    private readonly _onDidChange = this._register(new Emitter<number>());
    readonly onDidChange = this._onDidChange.event;

    private _value: number;

    get value(): number {
        return this._value;
    }

    constructor() {
        super();

        this._value = this._getPixelRatio();

        const dprMonitor = this._register(new DevicePixelRatioMonitor());
        this._register(
            dprMonitor.onDidChange(() => {
                this._value = this._getPixelRatio();
                this._onDidChange.fire(this._value);
            }),
        );
    }

    private _getPixelRatio(): number {
        const ctx: any = document.createElement("canvas").getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        const bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
        return dpr / bsr;
    }
}

class PixelRatioFacade {
    private _pixelRatioMonitor: PixelRatioImpl | null = null;
    private _getOrCreatePixelRatioMonitor(): PixelRatioImpl {
        if (!this._pixelRatioMonitor) {
            this._pixelRatioMonitor = markAsSingleton(new PixelRatioImpl());
        }
        return this._pixelRatioMonitor;
    }

    /**
     * Get the current value.
     */
    get value(): number {
        return this._getOrCreatePixelRatioMonitor().value;
    }

    /**
     * Listen for changes.
     */
    get onDidChange(): Event<number> {
        return this._getOrCreatePixelRatioMonitor().onDidChange;
    }
}

export function addMatchMediaChangeListener(
    query: string | MediaQueryList,
    callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
): void {
    if (typeof query === "string") {
        query = window.matchMedia(query);
    }
    query.addEventListener("change", callback);
}

/**
 * Returns the pixel ratio.
 *
 * This is useful for rendering <canvas> elements at native screen resolution or for being used as
 * a cache key when storing font measurements. Fonts might render differently depending on resolution
 * and any measurements need to be discarded for example when a window is moved from a monitor to another.
 */
export const PixelRatio = new PixelRatioFacade();

/** A zoom index, e.g. 1, 2, 3 */
export function setZoomLevel(zoomLevel: number): void {
    WindowManager.INSTANCE.setZoomLevel(zoomLevel);
}
export function getZoomLevel(): number {
    return WindowManager.INSTANCE.getZoomLevel();
}

/** The zoom scale for an index, e.g. 1, 1.2, 1.4 */
export function getZoomFactor(): number {
    return WindowManager.INSTANCE.getZoomFactor();
}
export function setZoomFactor(zoomFactor: number): void {
    WindowManager.INSTANCE.setZoomFactor(zoomFactor);
}

export function setFullscreen(fullscreen: boolean): void {
    WindowManager.INSTANCE.setFullscreen(fullscreen);
}
export function isFullscreen(): boolean {
    return WindowManager.INSTANCE.isFullscreen();
}
export const onDidChangeFullscreen = WindowManager.INSTANCE.onDidChangeFullscreen;

const userAgent = navigator.userAgent;

export const isFirefox = userAgent.includes("Firefox");
export const isWebKit = userAgent.includes("AppleWebKit");
export const isChrome = userAgent.includes("Chrome");
export const isSafari = !isChrome && userAgent.includes("Safari");
export const isWebkitWebView = !isChrome && !isSafari && isWebKit;
export const isElectron = userAgent.includes("Electron/");
export const isAndroid = userAgent.includes("Android");

let standalone = false;
if (window.matchMedia) {
    const standaloneMatchMedia = window.matchMedia(
        "(display-mode: standalone) or (display-mode: window-controls-overlay)",
    );
    const fullScreenMatchMedia = window.matchMedia("(display-mode: fullscreen)");
    standalone = standaloneMatchMedia.matches;
    addMatchMediaChangeListener(standaloneMatchMedia, ({ matches }) => {
        // entering fullscreen would change standaloneMatchMedia.matches to false
        // if standalone is true (running as PWA) and entering fullscreen, skip this change
        if (standalone && fullScreenMatchMedia.matches) {
            return;
        }
        // otherwise update standalone (browser to PWA or PWA to browser)
        standalone = matches;
    });
}
export function isStandalone(): boolean {
    return standalone;
}

// Visible means that the feature is enabled, not necessarily being rendered
// e.g. visible is true even in fullscreen mode where the controls are hidden
// See docs at https://developer.mozilla.org/en-US/docs/Web/API/WindowControlsOverlay/visible
export function isWCOEnabled(): boolean {
    return (navigator as any)?.windowControlsOverlay?.visible;
}

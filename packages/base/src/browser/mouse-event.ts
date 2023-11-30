/*
 * File: @mas/base/src/browser/mouse-event.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 02:39 pm
 *
 * Last Modified: 11/30/2023 02:40 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as browser from "@mas/base/browser/browser";
import { IframeUtils } from "@mas/base/browser/iframe";
import * as platform from "@mas/base/common/platform";

export interface IMouseEvent {
    readonly browserEvent: MouseEvent;
    readonly leftButton: boolean;
    readonly middleButton: boolean;
    readonly rightButton: boolean;
    readonly buttons: number;
    readonly target: HTMLElement;
    readonly detail: number;
    readonly posx: number;
    readonly posy: number;
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly timestamp: number;

    preventDefault(): void;
    stopPropagation(): void;
}

export class StandardMouseEvent implements IMouseEvent {
    readonly browserEvent: MouseEvent;

    readonly leftButton: boolean;
    readonly middleButton: boolean;
    readonly rightButton: boolean;
    readonly buttons: number;
    readonly target: HTMLElement;
    detail: number;
    readonly posx: number;
    readonly posy: number;
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
    readonly timestamp: number;

    constructor(targetWindow: Window, e: MouseEvent) {
        this.timestamp = Date.now();
        this.browserEvent = e;
        this.leftButton = e.button === 0;
        this.middleButton = e.button === 1;
        this.rightButton = e.button === 2;
        this.buttons = e.buttons;

        this.target = <HTMLElement>e.target;

        this.detail = e.detail || 1;
        if (e.type === "dblclick") {
            this.detail = 2;
        }
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;

        if (typeof e.pageX === "number") {
            this.posx = e.pageX;
            this.posy = e.pageY;
        } else {
            // Probably hit by MSGestureEvent
            this.posx =
                e.clientX +
                this.target.ownerDocument.body.scrollLeft +
                this.target.ownerDocument.documentElement.scrollLeft;
            this.posy =
                e.clientY +
                this.target.ownerDocument.body.scrollTop +
                this.target.ownerDocument.documentElement.scrollTop;
        }

        // Find the position of the iframe this code is executing in relative to the iframe where the event was captured.
        const iframeOffsets = IframeUtils.getPositionOfChildWindowRelativeToAncestorWindow(targetWindow, e.view);
        this.posx -= iframeOffsets.left;
        this.posy -= iframeOffsets.top;
    }

    preventDefault(): void {
        this.browserEvent.preventDefault();
    }

    stopPropagation(): void {
        this.browserEvent.stopPropagation();
    }
}

export class DragMouseEvent extends StandardMouseEvent {
    readonly dataTransfer: DataTransfer;

    constructor(targetWindow: Window, e: MouseEvent) {
        super(targetWindow, e);
        this.dataTransfer = (<any>e).dataTransfer;
    }
}

export interface IMouseWheelEvent extends MouseEvent {
    readonly wheelDelta: number;
    readonly wheelDeltaX: number;
    readonly wheelDeltaY: number;

    readonly deltaX: number;
    readonly deltaY: number;
    readonly deltaZ: number;
    readonly deltaMode: number;
}

interface IWebKitMouseWheelEvent {
    wheelDeltaY: number;
    wheelDeltaX: number;
}

interface IGeckoMouseWheelEvent {
    HORIZONTAL_AXIS: number;
    VERTICAL_AXIS: number;
    axis: number;
    detail: number;
}

export class StandardWheelEvent {
    readonly browserEvent: IMouseWheelEvent | null;
    readonly deltaY: number;
    readonly deltaX: number;
    readonly target: Node;

    constructor(e: IMouseWheelEvent | null, deltaX: number = 0, deltaY: number = 0) {
        this.browserEvent = e || null;
        this.target = e ? e.target || (<any>e).targetNode || e.srcElement : null;

        this.deltaY = deltaY;
        this.deltaX = deltaX;

        if (e) {
            // Old (deprecated) wheel events
            const e1 = <IWebKitMouseWheelEvent>(<any>e);
            const e2 = <IGeckoMouseWheelEvent>(<any>e);

            // vertical delta scroll
            if (typeof e1.wheelDeltaY !== "undefined") {
                this.deltaY = e1.wheelDeltaY / 120;
            } else if (typeof e2.VERTICAL_AXIS !== "undefined" && e2.axis === e2.VERTICAL_AXIS) {
                this.deltaY = -e2.detail / 3;
            } else if (e.type === "wheel") {
                // Modern wheel event
                // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                const ev = <WheelEvent>(<unknown>e);

                if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                    // the deltas are expressed in lines
                    if (browser.isFirefox && !platform.isMacintosh) {
                        this.deltaY = -e.deltaY / 3;
                    } else {
                        this.deltaY = -e.deltaY;
                    }
                } else {
                    this.deltaY = -e.deltaY / 40;
                }
            }

            // horizontal delta scroll
            if (typeof e1.wheelDeltaX !== "undefined") {
                if (browser.isSafari && platform.isWindows) {
                    this.deltaX = -(e1.wheelDeltaX / 120);
                } else {
                    this.deltaX = e1.wheelDeltaX / 120;
                }
            } else if (typeof e2.HORIZONTAL_AXIS !== "undefined" && e2.axis === e2.HORIZONTAL_AXIS) {
                this.deltaX = -e.detail / 3;
            } else if (e.type === "wheel") {
                // Modern wheel event
                // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                const ev = <WheelEvent>(<unknown>e);

                if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                    // the deltas are expressed in lines
                    if (browser.isFirefox && !platform.isMacintosh) {
                        this.deltaX = -e.deltaX / 3;
                    } else {
                        this.deltaX = -e.deltaX;
                    }
                } else {
                    this.deltaX = -e.deltaX / 40;
                }
            }

            // Assume a vertical scroll if nothing else worked
            if (this.deltaY === 0 && this.deltaX === 0 && e.wheelDelta) {
                this.deltaY = e.wheelDelta / 120;
            }
        }
    }

    preventDefault(): void {
        this.browserEvent?.preventDefault();
    }

    stopPropagation(): void {
        this.browserEvent?.stopPropagation();
    }
}

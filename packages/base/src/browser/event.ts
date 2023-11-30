/*
 * File: @mas/base/src/browser/event.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 03:01 pm
 *
 * Last Modified: 11/30/2023 03:01 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Event as BaseEvent, Emitter } from "@mas/base/common/event";
import { IDisposable } from "@mas/base/common/lifecycle";

export type EventHandler = HTMLElement | HTMLDocument | Window;

export interface IDomEvent {
    <K extends keyof HTMLElementEventMap>(
        element: EventHandler,
        type: K,
        useCapture?: boolean,
    ): BaseEvent<HTMLElementEventMap[K]>;
    (element: EventHandler, type: string, useCapture?: boolean): BaseEvent<unknown>;
}

export interface DOMEventMap extends HTMLElementEventMap, DocumentEventMap, WindowEventMap {
    compositionstart: CompositionEvent;
    compositionupdate: CompositionEvent;
    compositionend: CompositionEvent;
}

export class DomEmitter<K extends keyof DOMEventMap> implements IDisposable {
    private emitter: Emitter<DOMEventMap[K]>;

    get event(): BaseEvent<DOMEventMap[K]> {
        return this.emitter.event;
    }

    constructor(element: Window & typeof globalThis, type: WindowEventMap, useCapture?: boolean);
    constructor(element: Document, type: DocumentEventMap, useCapture?: boolean);
    constructor(element: EventHandler, type: K, useCapture?: boolean);
    constructor(element: EventHandler, type: K, useCapture?: boolean) {
        const fn = (e: Event) => this.emitter.fire(e as DOMEventMap[K]);
        this.emitter = new Emitter({
            onWillAddFirstListener: () => element.addEventListener(type, fn, useCapture),
            onDidRemoveLastListener: () => element.removeEventListener(type, fn, useCapture),
        });
    }

    dispose(): void {
        this.emitter.dispose();
    }
}

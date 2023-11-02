/*
 * File: @mas/core/tests/platform/files/common/files.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 03:14 pm
 *
 * Last Modified: 11/02/2023 03:21 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { assert, describe, test } from "vitest";

import { isEqual, isEqualOrParent } from "@mas/base/common/extpath";
import { isLinux, isMacintosh, isWindows } from "@mas/base/common/platform";
import { URI } from "@mas/base/common/uri";
import { ensureNoDisposablesAreLeakedInTestSuite, toResource } from "@mas/base/testing/common/utils";
import { FileChangeType, FileChangesEvent, IFileChange, isParent } from "@mas/core/platform/files/common/files";

describe("Files", () => {
    test("FileChangesEvent - basics", function () {
        const changes = [
            { resource: toResource(test, "/foo/updated.txt"), type: FileChangeType.UPDATED },
            { resource: toResource(test, "/foo/otherupdated.txt"), type: FileChangeType.UPDATED },
            { resource: toResource(test, "/added.txt"), type: FileChangeType.ADDED },
            { resource: toResource(test, "/bar/deleted.txt"), type: FileChangeType.DELETED },
            { resource: toResource(test, "/bar/folder"), type: FileChangeType.DELETED },
            { resource: toResource(test, "/BAR/FOLDER"), type: FileChangeType.DELETED },
        ];

        for (const ignorePathCasing of [false, true]) {
            const event = new FileChangesEvent(changes, ignorePathCasing);

            assert(!event.contains(toResource(test, "/foo"), FileChangeType.UPDATED));
            assert(event.affects(toResource(test, "/foo"), FileChangeType.UPDATED));
            assert(event.contains(toResource(test, "/foo/updated.txt"), FileChangeType.UPDATED));
            assert(event.affects(toResource(test, "/foo/updated.txt"), FileChangeType.UPDATED));
            assert(event.contains(toResource(test, "/foo/updated.txt"), FileChangeType.UPDATED, FileChangeType.ADDED));
            assert(event.affects(toResource(test, "/foo/updated.txt"), FileChangeType.UPDATED, FileChangeType.ADDED));
            assert(
                event.contains(
                    toResource(test, "/foo/updated.txt"),
                    FileChangeType.UPDATED,
                    FileChangeType.ADDED,
                    FileChangeType.DELETED,
                ),
            );
            assert(
                !event.contains(toResource(test, "/foo/updated.txt"), FileChangeType.ADDED, FileChangeType.DELETED),
            );
            assert(!event.contains(toResource(test, "/foo/updated.txt"), FileChangeType.ADDED));
            assert(!event.contains(toResource(test, "/foo/updated.txt"), FileChangeType.DELETED));
            assert(!event.affects(toResource(test, "/foo/updated.txt"), FileChangeType.DELETED));

            assert(event.contains(toResource(test, "/bar/folder"), FileChangeType.DELETED));
            assert(event.contains(toResource(test, "/BAR/FOLDER"), FileChangeType.DELETED));
            assert(event.affects(toResource(test, "/BAR"), FileChangeType.DELETED));
            if (ignorePathCasing) {
                assert(event.contains(toResource(test, "/BAR/folder"), FileChangeType.DELETED));
                assert(event.affects(toResource(test, "/bar"), FileChangeType.DELETED));
            } else {
                assert(!event.contains(toResource(test, "/BAR/folder"), FileChangeType.DELETED));
                assert(event.affects(toResource(test, "/bar"), FileChangeType.DELETED));
            }
            assert(event.contains(toResource(test, "/bar/folder/somefile"), FileChangeType.DELETED));
            assert(event.contains(toResource(test, "/bar/folder/somefile/test.txt"), FileChangeType.DELETED));
            assert(event.contains(toResource(test, "/BAR/FOLDER/somefile/test.txt"), FileChangeType.DELETED));
            if (ignorePathCasing) {
                assert(event.contains(toResource(test, "/BAR/folder/somefile/test.txt"), FileChangeType.DELETED));
            } else {
                assert(!event.contains(toResource(test, "/BAR/folder/somefile/test.txt"), FileChangeType.DELETED));
            }
            assert(!event.contains(toResource(test, "/bar/folder2/somefile"), FileChangeType.DELETED));

            assert.strictEqual(1, event.rawAdded.length);
            assert.strictEqual(2, event.rawUpdated.length);
            assert.strictEqual(3, event.rawDeleted.length);
            assert.strictEqual(true, event.gotAdded());
            assert.strictEqual(true, event.gotUpdated());
            assert.strictEqual(true, event.gotDeleted());
        }
    });

    test("FileChangesEvent - supports multiple changes on file tree", function () {
        for (const type of [FileChangeType.ADDED, FileChangeType.UPDATED, FileChangeType.DELETED]) {
            const changes = [
                { resource: toResource(test, "/foo/bar/updated.txt"), type },
                { resource: toResource(test, "/foo/bar/otherupdated.txt"), type },
                { resource: toResource(test, "/foo/bar"), type },
                { resource: toResource(test, "/foo"), type },
                { resource: toResource(test, "/bar"), type },
                { resource: toResource(test, "/bar/foo"), type },
                { resource: toResource(test, "/bar/foo/updated.txt"), type },
                { resource: toResource(test, "/bar/foo/otherupdated.txt"), type },
            ];

            for (const ignorePathCasing of [false, true]) {
                const event = new FileChangesEvent(changes, ignorePathCasing);

                for (const change of changes) {
                    assert(event.contains(change.resource, type));
                    assert(event.affects(change.resource, type));
                }

                assert(event.affects(toResource(test, "/foo"), type));
                assert(event.affects(toResource(test, "/bar"), type));
                assert(event.affects(toResource(test, "/"), type));
                assert(!event.affects(toResource(test, "/foobar"), type));

                assert(!event.contains(toResource(test, "/some/foo/bar"), type));
                assert(!event.affects(toResource(test, "/some/foo/bar"), type));
                assert(!event.contains(toResource(test, "/some/bar"), type));
                assert(!event.affects(toResource(test, "/some/bar"), type));

                switch (type) {
                    case FileChangeType.ADDED:
                        assert.strictEqual(8, event.rawAdded.length);
                        break;
                    case FileChangeType.DELETED:
                        assert.strictEqual(8, event.rawDeleted.length);
                        break;
                }
            }
        }
    });

    test("FileChangesEvent - correlation", function () {
        let changes: IFileChange[] = [
            { resource: toResource(test, "/foo/updated.txt"), type: FileChangeType.UPDATED },
            { resource: toResource(test, "/foo/otherupdated.txt"), type: FileChangeType.UPDATED },
            { resource: toResource(test, "/added.txt"), type: FileChangeType.ADDED },
        ];

        let event: FileChangesEvent = new FileChangesEvent(changes, true);
        assert.strictEqual(event.hasCorrelation(), false);
        assert.strictEqual(event.correlates(100), false);

        changes = [
            { resource: toResource(test, "/foo/updated.txt"), type: FileChangeType.UPDATED, cId: 100 },
            { resource: toResource(test, "/foo/otherupdated.txt"), type: FileChangeType.UPDATED, cId: 100 },
            { resource: toResource(test, "/added.txt"), type: FileChangeType.ADDED, cId: 100 },
        ];

        event = new FileChangesEvent(changes, true);
        assert.strictEqual(event.hasCorrelation(), true);
        assert.strictEqual(event.correlates(100), true);
        assert.strictEqual(event.correlates(120), false);

        changes = [
            { resource: toResource(test, "/foo/updated.txt"), type: FileChangeType.UPDATED, cId: 100 },
            { resource: toResource(test, "/foo/otherupdated.txt"), type: FileChangeType.UPDATED },
            { resource: toResource(test, "/added.txt"), type: FileChangeType.ADDED, cId: 100 },
        ];

        event = new FileChangesEvent(changes, true);
        assert.strictEqual(event.hasCorrelation(), false);
        assert.strictEqual(event.correlates(100), false);
        assert.strictEqual(event.correlates(120), false);

        changes = [
            { resource: toResource(test, "/foo/updated.txt"), type: FileChangeType.UPDATED, cId: 100 },
            { resource: toResource(test, "/foo/otherupdated.txt"), type: FileChangeType.UPDATED, cId: 120 },
            { resource: toResource(test, "/added.txt"), type: FileChangeType.ADDED, cId: 100 },
        ];

        event = new FileChangesEvent(changes, true);
        assert.strictEqual(event.hasCorrelation(), false);
        assert.strictEqual(event.correlates(100), false);
        assert.strictEqual(event.correlates(120), false);
    });

    function testIsEqual(testMethod: (pA: string, pB: string, ignoreCase: boolean) => boolean): void {
        // corner cases
        assert(testMethod("", "", true));
        assert(!testMethod(null!, "", true));
        assert(!testMethod(undefined!, "", true));

        // basics (string)
        assert(testMethod("/", "/", true));
        assert(testMethod("/some", "/some", true));
        assert(testMethod("/some/path", "/some/path", true));

        assert(testMethod("c:\\", "c:\\", true));
        assert(testMethod("c:\\some", "c:\\some", true));
        assert(testMethod("c:\\some\\path", "c:\\some\\path", true));

        assert(testMethod("/someöäü/path", "/someöäü/path", true));
        assert(testMethod("c:\\someöäü\\path", "c:\\someöäü\\path", true));

        assert(!testMethod("/some/path", "/some/other/path", true));
        assert(!testMethod("c:\\some\\path", "c:\\some\\other\\path", true));
        assert(!testMethod("c:\\some\\path", "d:\\some\\path", true));

        assert(testMethod("/some/path", "/some/PATH", true));
        assert(testMethod("/someöäü/path", "/someÖÄÜ/PATH", true));
        assert(testMethod("c:\\some\\path", "c:\\some\\PATH", true));
        assert(testMethod("c:\\someöäü\\path", "c:\\someÖÄÜ\\PATH", true));
        assert(testMethod("c:\\some\\path", "C:\\some\\PATH", true));
    }

    test("isEqual (ignoreCase)", function () {
        testIsEqual(isEqual);

        // basics (uris)
        assert(isEqual(URI.file("/some/path").fsPath, URI.file("/some/path").fsPath, true));
        assert(isEqual(URI.file("c:\\some\\path").fsPath, URI.file("c:\\some\\path").fsPath, true));

        assert(isEqual(URI.file("/someöäü/path").fsPath, URI.file("/someöäü/path").fsPath, true));
        assert(isEqual(URI.file("c:\\someöäü\\path").fsPath, URI.file("c:\\someöäü\\path").fsPath, true));

        assert(!isEqual(URI.file("/some/path").fsPath, URI.file("/some/other/path").fsPath, true));
        assert(!isEqual(URI.file("c:\\some\\path").fsPath, URI.file("c:\\some\\other\\path").fsPath, true));

        assert(isEqual(URI.file("/some/path").fsPath, URI.file("/some/PATH").fsPath, true));
        assert(isEqual(URI.file("/someöäü/path").fsPath, URI.file("/someÖÄÜ/PATH").fsPath, true));
        assert(isEqual(URI.file("c:\\some\\path").fsPath, URI.file("c:\\some\\PATH").fsPath, true));
        assert(isEqual(URI.file("c:\\someöäü\\path").fsPath, URI.file("c:\\someÖÄÜ\\PATH").fsPath, true));
        assert(isEqual(URI.file("c:\\some\\path").fsPath, URI.file("C:\\some\\PATH").fsPath, true));
    });

    test("isParent (ignorecase)", function () {
        if (isWindows) {
            assert(isParent("c:\\some\\path", "c:\\", true));
            assert(isParent("c:\\some\\path", "c:\\some", true));
            assert(isParent("c:\\some\\path", "c:\\some\\", true));
            assert(isParent("c:\\someöäü\\path", "c:\\someöäü", true));
            assert(isParent("c:\\someöäü\\path", "c:\\someöäü\\", true));
            assert(isParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar", true));
            assert(isParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\", true));

            assert(isParent("c:\\some\\path", "C:\\", true));
            assert(isParent("c:\\some\\path", "c:\\SOME", true));
            assert(isParent("c:\\some\\path", "c:\\SOME\\", true));

            assert(!isParent("c:\\some\\path", "d:\\", true));
            assert(!isParent("c:\\some\\path", "c:\\some\\path", true));
            assert(!isParent("c:\\some\\path", "d:\\some\\path", true));
            assert(!isParent("c:\\foo\\bar\\test.ts", "c:\\foo\\barr", true));
            assert(!isParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\test", true));
        }

        if (isMacintosh || isLinux) {
            assert(isParent("/some/path", "/", true));
            assert(isParent("/some/path", "/some", true));
            assert(isParent("/some/path", "/some/", true));
            assert(isParent("/someöäü/path", "/someöäü", true));
            assert(isParent("/someöäü/path", "/someöäü/", true));
            assert(isParent("/foo/bar/test.ts", "/foo/bar", true));
            assert(isParent("/foo/bar/test.ts", "/foo/bar/", true));

            assert(isParent("/some/path", "/SOME", true));
            assert(isParent("/some/path", "/SOME/", true));
            assert(isParent("/someöäü/path", "/SOMEÖÄÜ", true));
            assert(isParent("/someöäü/path", "/SOMEÖÄÜ/", true));

            assert(!isParent("/some/path", "/some/path", true));
            assert(!isParent("/foo/bar/test.ts", "/foo/barr", true));
            assert(!isParent("/foo/bar/test.ts", "/foo/bar/test", true));
        }
    });

    test("isEqualOrParent (ignorecase)", function () {
        // same assertions apply as with isEqual()
        testIsEqual(isEqualOrParent); //

        if (isWindows) {
            assert(isEqualOrParent("c:\\some\\path", "c:\\", true));
            assert(isEqualOrParent("c:\\some\\path", "c:\\some", true));
            assert(isEqualOrParent("c:\\some\\path", "c:\\some\\", true));
            assert(isEqualOrParent("c:\\someöäü\\path", "c:\\someöäü", true));
            assert(isEqualOrParent("c:\\someöäü\\path", "c:\\someöäü\\", true));
            assert(isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar", true));
            assert(isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\", true));
            assert(isEqualOrParent("c:\\some\\path", "c:\\some\\path", true));
            assert(isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\test.ts", true));

            assert(isEqualOrParent("c:\\some\\path", "C:\\", true));
            assert(isEqualOrParent("c:\\some\\path", "c:\\SOME", true));
            assert(isEqualOrParent("c:\\some\\path", "c:\\SOME\\", true));

            assert(!isEqualOrParent("c:\\some\\path", "d:\\", true));
            assert(!isEqualOrParent("c:\\some\\path", "d:\\some\\path", true));
            assert(!isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\barr", true));
            assert(!isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\test", true));
            assert(!isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\bar\\test.", true));
            assert(!isEqualOrParent("c:\\foo\\bar\\test.ts", "c:\\foo\\BAR\\test.", true));
        }

        if (isMacintosh || isLinux) {
            assert(isEqualOrParent("/some/path", "/", true));
            assert(isEqualOrParent("/some/path", "/some", true));
            assert(isEqualOrParent("/some/path", "/some/", true));
            assert(isEqualOrParent("/someöäü/path", "/someöäü", true));
            assert(isEqualOrParent("/someöäü/path", "/someöäü/", true));
            assert(isEqualOrParent("/foo/bar/test.ts", "/foo/bar", true));
            assert(isEqualOrParent("/foo/bar/test.ts", "/foo/bar/", true));
            assert(isEqualOrParent("/some/path", "/some/path", true));

            assert(isEqualOrParent("/some/path", "/SOME", true));
            assert(isEqualOrParent("/some/path", "/SOME/", true));
            assert(isEqualOrParent("/someöäü/path", "/SOMEÖÄÜ", true));
            assert(isEqualOrParent("/someöäü/path", "/SOMEÖÄÜ/", true));

            assert(!isEqualOrParent("/foo/bar/test.ts", "/foo/barr", true));
            assert(!isEqualOrParent("/foo/bar/test.ts", "/foo/bar/test", true));
            assert(!isEqualOrParent("foo/bar/test.ts", "foo/bar/test.", true));
            assert(!isEqualOrParent("foo/bar/test.ts", "foo/BAR/test.", true));
        }
    });

    ensureNoDisposablesAreLeakedInTestSuite();
});

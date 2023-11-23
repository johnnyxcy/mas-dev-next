/*
 * File: @mas/icons/stories/codicons.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/10/2023 04:00 pm
 *
 * Last Modified: 11/23/2023 03:22 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import "@mas/icons/codicons";

type IconButtonProps = {
    iconId: string;
    label: string;
};

const IconButton: React.FC<IconButtonProps> = ({ iconId, label }) => {
    const clsName = `codicon ${iconId}`;
    return (
        <div
            className="icon"
            data-name={iconId}
            title={iconId}
            onClick={() => {
                navigator.clipboard.writeText(clsName);
                const notification = document.querySelector("#notification");
                const notificationText = document.querySelector("#notification-id");
                if (notification && notificationText) {
                    notificationText.innerHTML = iconId;
                    if (!notification.classList.contains("show")) {
                        notification.classList.add("show");
                    }
                    setTimeout(() => {
                        if (notification.classList.contains("show")) {
                            notification.classList.remove("show");
                        }
                    }, 3000);
                }
            }}
        >
            <span className="inner">
                <i className={clsName} aria-hidden="true"></i>
            </span>
            <br />
            <span className="label">{label}</span>
        </div>
    );
};

const codiconsCss = `
.codicon-add:before { content: "\\ea60" }
.codicon-plus:before { content: "\\ea60" }
.codicon-gist-new:before { content: "\\ea60" }
.codicon-repo-create:before { content: "\\ea60" }
.codicon-lightbulb:before { content: "\\ea61" }
.codicon-light-bulb:before { content: "\\ea61" }
.codicon-repo:before { content: "\\ea62" }
.codicon-repo-delete:before { content: "\\ea62" }
.codicon-gist-fork:before { content: "\\ea63" }
.codicon-repo-forked:before { content: "\\ea63" }
.codicon-git-pull-request:before { content: "\\ea64" }
.codicon-git-pull-request-abandoned:before { content: "\\ea64" }
.codicon-record-keys:before { content: "\\ea65" }
.codicon-keyboard:before { content: "\\ea65" }
.codicon-tag:before { content: "\\ea66" }
.codicon-git-pull-request-label:before { content: "\\ea66" }
.codicon-tag-add:before { content: "\\ea66" }
.codicon-tag-remove:before { content: "\\ea66" }
.codicon-person:before { content: "\\ea67" }
.codicon-person-follow:before { content: "\\ea67" }
.codicon-person-outline:before { content: "\\ea67" }
.codicon-person-filled:before { content: "\\ea67" }
.codicon-git-branch:before { content: "\\ea68" }
.codicon-git-branch-create:before { content: "\\ea68" }
.codicon-git-branch-delete:before { content: "\\ea68" }
.codicon-source-control:before { content: "\\ea68" }
.codicon-mirror:before { content: "\\ea69" }
.codicon-mirror-public:before { content: "\\ea69" }
.codicon-star:before { content: "\\ea6a" }
.codicon-star-add:before { content: "\\ea6a" }
.codicon-star-delete:before { content: "\\ea6a" }
.codicon-star-empty:before { content: "\\ea6a" }
.codicon-comment:before { content: "\\ea6b" }
.codicon-comment-add:before { content: "\\ea6b" }
.codicon-alert:before { content: "\\ea6c" }
.codicon-warning:before { content: "\\ea6c" }
.codicon-search:before { content: "\\ea6d" }
.codicon-search-save:before { content: "\\ea6d" }
.codicon-log-out:before { content: "\\ea6e" }
.codicon-sign-out:before { content: "\\ea6e" }
.codicon-log-in:before { content: "\\ea6f" }
.codicon-sign-in:before { content: "\\ea6f" }
.codicon-eye:before { content: "\\ea70" }
.codicon-eye-unwatch:before { content: "\\ea70" }
.codicon-eye-watch:before { content: "\\ea70" }
.codicon-circle-filled:before { content: "\\ea71" }
.codicon-primitive-dot:before { content: "\\ea71" }
.codicon-close-dirty:before { content: "\\ea71" }
.codicon-debug-breakpoint:before { content: "\\ea71" }
.codicon-debug-breakpoint-disabled:before { content: "\\ea71" }
.codicon-debug-hint:before { content: "\\ea71" }
.codicon-terminal-decoration-success:before { content: "\\ea71" }
.codicon-primitive-square:before { content: "\\ea72" }
.codicon-edit:before { content: "\\ea73" }
.codicon-pencil:before { content: "\\ea73" }
.codicon-info:before { content: "\\ea74" }
.codicon-issue-opened:before { content: "\\ea74" }
.codicon-gist-private:before { content: "\\ea75" }
.codicon-git-fork-private:before { content: "\\ea75" }
.codicon-lock:before { content: "\\ea75" }
.codicon-mirror-private:before { content: "\\ea75" }
.codicon-close:before { content: "\\ea76" }
.codicon-remove-close:before { content: "\\ea76" }
.codicon-x:before { content: "\\ea76" }
.codicon-repo-sync:before { content: "\\ea77" }
.codicon-sync:before { content: "\\ea77" }
.codicon-clone:before { content: "\\ea78" }
.codicon-desktop-download:before { content: "\\ea78" }
.codicon-beaker:before { content: "\\ea79" }
.codicon-microscope:before { content: "\\ea79" }
.codicon-vm:before { content: "\\ea7a" }
.codicon-device-desktop:before { content: "\\ea7a" }
.codicon-file:before { content: "\\ea7b" }
.codicon-file-text:before { content: "\\ea7b" }
.codicon-more:before { content: "\\ea7c" }
.codicon-ellipsis:before { content: "\\ea7c" }
.codicon-kebab-horizontal:before { content: "\\ea7c" }
.codicon-mail-reply:before { content: "\\ea7d" }
.codicon-reply:before { content: "\\ea7d" }
.codicon-organization:before { content: "\\ea7e" }
.codicon-organization-filled:before { content: "\\ea7e" }
.codicon-organization-outline:before { content: "\\ea7e" }
.codicon-new-file:before { content: "\\ea7f" }
.codicon-file-add:before { content: "\\ea7f" }
.codicon-new-folder:before { content: "\\ea80" }
.codicon-file-directory-create:before { content: "\\ea80" }
.codicon-trash:before { content: "\\ea81" }
.codicon-trashcan:before { content: "\\ea81" }
.codicon-history:before { content: "\\ea82" }
.codicon-clock:before { content: "\\ea82" }
.codicon-folder:before { content: "\\ea83" }
.codicon-file-directory:before { content: "\\ea83" }
.codicon-symbol-folder:before { content: "\\ea83" }
.codicon-logo-github:before { content: "\\ea84" }
.codicon-mark-github:before { content: "\\ea84" }
.codicon-github:before { content: "\\ea84" }
.codicon-terminal:before { content: "\\ea85" }
.codicon-console:before { content: "\\ea85" }
.codicon-repl:before { content: "\\ea85" }
.codicon-zap:before { content: "\\ea86" }
.codicon-symbol-event:before { content: "\\ea86" }
.codicon-error:before { content: "\\ea87" }
.codicon-stop:before { content: "\\ea87" }
.codicon-variable:before { content: "\\ea88" }
.codicon-symbol-variable:before { content: "\\ea88" }
.codicon-array:before { content: "\\ea8a" }
.codicon-symbol-array:before { content: "\\ea8a" }
.codicon-symbol-module:before { content: "\\ea8b" }
.codicon-symbol-package:before { content: "\\ea8b" }
.codicon-symbol-namespace:before { content: "\\ea8b" }
.codicon-symbol-object:before { content: "\\ea8b" }
.codicon-symbol-method:before { content: "\\ea8c" }
.codicon-symbol-function:before { content: "\\ea8c" }
.codicon-symbol-constructor:before { content: "\\ea8c" }
.codicon-symbol-boolean:before { content: "\\ea8f" }
.codicon-symbol-null:before { content: "\\ea8f" }
.codicon-symbol-numeric:before { content: "\\ea90" }
.codicon-symbol-number:before { content: "\\ea90" }
.codicon-symbol-structure:before { content: "\\ea91" }
.codicon-symbol-struct:before { content: "\\ea91" }
.codicon-symbol-parameter:before { content: "\\ea92" }
.codicon-symbol-type-parameter:before { content: "\\ea92" }
.codicon-symbol-key:before { content: "\\ea93" }
.codicon-symbol-text:before { content: "\\ea93" }
.codicon-symbol-reference:before { content: "\\ea94" }
.codicon-go-to-file:before { content: "\\ea94" }
.codicon-symbol-enum:before { content: "\\ea95" }
.codicon-symbol-value:before { content: "\\ea95" }
.codicon-symbol-ruler:before { content: "\\ea96" }
.codicon-symbol-unit:before { content: "\\ea96" }
.codicon-activate-breakpoints:before { content: "\\ea97" }
.codicon-archive:before { content: "\\ea98" }
.codicon-arrow-both:before { content: "\\ea99" }
.codicon-arrow-down:before { content: "\\ea9a" }
.codicon-arrow-left:before { content: "\\ea9b" }
.codicon-arrow-right:before { content: "\\ea9c" }
.codicon-arrow-small-down:before { content: "\\ea9d" }
.codicon-arrow-small-left:before { content: "\\ea9e" }
.codicon-arrow-small-right:before { content: "\\ea9f" }
.codicon-arrow-small-up:before { content: "\\eaa0" }
.codicon-arrow-up:before { content: "\\eaa1" }
.codicon-bell:before { content: "\\eaa2" }
.codicon-bold:before { content: "\\eaa3" }
.codicon-book:before { content: "\\eaa4" }
.codicon-bookmark:before { content: "\\eaa5" }
.codicon-debug-breakpoint-conditional-unverified:before { content: "\\eaa6" }
.codicon-debug-breakpoint-conditional:before { content: "\\eaa7" }
.codicon-debug-breakpoint-conditional-disabled:before { content: "\\eaa7" }
.codicon-debug-breakpoint-data-unverified:before { content: "\\eaa8" }
.codicon-debug-breakpoint-data:before { content: "\\eaa9" }
.codicon-debug-breakpoint-data-disabled:before { content: "\\eaa9" }
.codicon-debug-breakpoint-log-unverified:before { content: "\\eaaa" }
.codicon-debug-breakpoint-log:before { content: "\\eaab" }
.codicon-debug-breakpoint-log-disabled:before { content: "\\eaab" }
.codicon-briefcase:before { content: "\\eaac" }
.codicon-broadcast:before { content: "\\eaad" }
.codicon-browser:before { content: "\\eaae" }
.codicon-bug:before { content: "\\eaaf" }
.codicon-calendar:before { content: "\\eab0" }
.codicon-case-sensitive:before { content: "\\eab1" }
.codicon-check:before { content: "\\eab2" }
.codicon-checklist:before { content: "\\eab3" }
.codicon-chevron-down:before { content: "\\eab4" }
.codicon-chevron-left:before { content: "\\eab5" }
.codicon-chevron-right:before { content: "\\eab6" }
.codicon-chevron-up:before { content: "\\eab7" }
.codicon-chrome-close:before { content: "\\eab8" }
.codicon-chrome-maximize:before { content: "\\eab9" }
.codicon-chrome-minimize:before { content: "\\eaba" }
.codicon-chrome-restore:before { content: "\\eabb" }
.codicon-circle-outline:before { content: "\\eabc" }
.codicon-circle:before { content: "\\eabc" }
.codicon-debug-breakpoint-unverified:before { content: "\\eabc" }
.codicon-terminal-decoration-incomplete:before { content: "\\eabc" }
.codicon-circle-slash:before { content: "\\eabd" }
.codicon-circuit-board:before { content: "\\eabe" }
.codicon-clear-all:before { content: "\\eabf" }
.codicon-clippy:before { content: "\\eac0" }
.codicon-close-all:before { content: "\\eac1" }
.codicon-cloud-download:before { content: "\\eac2" }
.codicon-cloud-upload:before { content: "\\eac3" }
.codicon-code:before { content: "\\eac4" }
.codicon-collapse-all:before { content: "\\eac5" }
.codicon-color-mode:before { content: "\\eac6" }
.codicon-comment-discussion:before { content: "\\eac7" }
.codicon-credit-card:before { content: "\\eac9" }
.codicon-dash:before { content: "\\eacc" }
.codicon-dashboard:before { content: "\\eacd" }
.codicon-database:before { content: "\\eace" }
.codicon-debug-continue:before { content: "\\eacf" }
.codicon-debug-disconnect:before { content: "\\ead0" }
.codicon-debug-pause:before { content: "\\ead1" }
.codicon-debug-restart:before { content: "\\ead2" }
.codicon-debug-start:before { content: "\\ead3" }
.codicon-debug-step-into:before { content: "\\ead4" }
.codicon-debug-step-out:before { content: "\\ead5" }
.codicon-debug-step-over:before { content: "\\ead6" }
.codicon-debug-stop:before { content: "\\ead7" }
.codicon-debug:before { content: "\\ead8" }
.codicon-device-camera-video:before { content: "\\ead9" }
.codicon-device-camera:before { content: "\\eada" }
.codicon-device-mobile:before { content: "\\eadb" }
.codicon-diff-added:before { content: "\\eadc" }
.codicon-diff-ignored:before { content: "\\eadd" }
.codicon-diff-modified:before { content: "\\eade" }
.codicon-diff-removed:before { content: "\\eadf" }
.codicon-diff-renamed:before { content: "\\eae0" }
.codicon-diff:before { content: "\\eae1" }
.codicon-discard:before { content: "\\eae2" }
.codicon-editor-layout:before { content: "\\eae3" }
.codicon-empty-window:before { content: "\\eae4" }
.codicon-exclude:before { content: "\\eae5" }
.codicon-extensions:before { content: "\\eae6" }
.codicon-eye-closed:before { content: "\\eae7" }
.codicon-file-binary:before { content: "\\eae8" }
.codicon-file-code:before { content: "\\eae9" }
.codicon-file-media:before { content: "\\eaea" }
.codicon-file-pdf:before { content: "\\eaeb" }
.codicon-file-submodule:before { content: "\\eaec" }
.codicon-file-symlink-directory:before { content: "\\eaed" }
.codicon-file-symlink-file:before { content: "\\eaee" }
.codicon-file-zip:before { content: "\\eaef" }
.codicon-files:before { content: "\\eaf0" }
.codicon-filter:before { content: "\\eaf1" }
.codicon-flame:before { content: "\\eaf2" }
.codicon-fold-down:before { content: "\\eaf3" }
.codicon-fold-up:before { content: "\\eaf4" }
.codicon-fold:before { content: "\\eaf5" }
.codicon-folder-active:before { content: "\\eaf6" }
.codicon-folder-opened:before { content: "\\eaf7" }
.codicon-gear:before { content: "\\eaf8" }
.codicon-gift:before { content: "\\eaf9" }
.codicon-gist-secret:before { content: "\\eafa" }
.codicon-gist:before { content: "\\eafb" }
.codicon-git-commit:before { content: "\\eafc" }
.codicon-git-compare:before { content: "\\eafd" }
.codicon-compare-changes:before { content: "\\eafd" }
.codicon-git-merge:before { content: "\\eafe" }
.codicon-github-action:before { content: "\\eaff" }
.codicon-github-alt:before { content: "\\eb00" }
.codicon-globe:before { content: "\\eb01" }
.codicon-grabber:before { content: "\\eb02" }
.codicon-graph:before { content: "\\eb03" }
.codicon-gripper:before { content: "\\eb04" }
.codicon-heart:before { content: "\\eb05" }
.codicon-home:before { content: "\\eb06" }
.codicon-horizontal-rule:before { content: "\\eb07" }
.codicon-hubot:before { content: "\\eb08" }
.codicon-inbox:before { content: "\\eb09" }
.codicon-issue-reopened:before { content: "\\eb0b" }
.codicon-issues:before { content: "\\eb0c" }
.codicon-italic:before { content: "\\eb0d" }
.codicon-jersey:before { content: "\\eb0e" }
.codicon-json:before { content: "\\eb0f" }
.codicon-kebab-vertical:before { content: "\\eb10" }
.codicon-key:before { content: "\\eb11" }
.codicon-law:before { content: "\\eb12" }
.codicon-lightbulb-autofix:before { content: "\\eb13" }
.codicon-link-external:before { content: "\\eb14" }
.codicon-link:before { content: "\\eb15" }
.codicon-list-ordered:before { content: "\\eb16" }
.codicon-list-unordered:before { content: "\\eb17" }
.codicon-live-share:before { content: "\\eb18" }
.codicon-loading:before { content: "\\eb19" }
.codicon-location:before { content: "\\eb1a" }
.codicon-mail-read:before { content: "\\eb1b" }
.codicon-mail:before { content: "\\eb1c" }
.codicon-markdown:before { content: "\\eb1d" }
.codicon-megaphone:before { content: "\\eb1e" }
.codicon-mention:before { content: "\\eb1f" }
.codicon-milestone:before { content: "\\eb20" }
.codicon-git-pull-request-milestone:before { content: "\\eb20" }
.codicon-mortar-board:before { content: "\\eb21" }
.codicon-move:before { content: "\\eb22" }
.codicon-multiple-windows:before { content: "\\eb23" }
.codicon-mute:before { content: "\\eb24" }
.codicon-no-newline:before { content: "\\eb25" }
.codicon-note:before { content: "\\eb26" }
.codicon-octoface:before { content: "\\eb27" }
.codicon-open-preview:before { content: "\\eb28" }
.codicon-package:before { content: "\\eb29" }
.codicon-paintcan:before { content: "\\eb2a" }
.codicon-pin:before { content: "\\eb2b" }
.codicon-play:before { content: "\\eb2c" }
.codicon-run:before { content: "\\eb2c" }
.codicon-plug:before { content: "\\eb2d" }
.codicon-preserve-case:before { content: "\\eb2e" }
.codicon-preview:before { content: "\\eb2f" }
.codicon-project:before { content: "\\eb30" }
.codicon-pulse:before { content: "\\eb31" }
.codicon-question:before { content: "\\eb32" }
.codicon-quote:before { content: "\\eb33" }
.codicon-radio-tower:before { content: "\\eb34" }
.codicon-reactions:before { content: "\\eb35" }
.codicon-references:before { content: "\\eb36" }
.codicon-refresh:before { content: "\\eb37" }
.codicon-regex:before { content: "\\eb38" }
.codicon-remote-explorer:before { content: "\\eb39" }
.codicon-remote:before { content: "\\eb3a" }
.codicon-remove:before { content: "\\eb3b" }
.codicon-replace-all:before { content: "\\eb3c" }
.codicon-replace:before { content: "\\eb3d" }
.codicon-repo-clone:before { content: "\\eb3e" }
.codicon-repo-force-push:before { content: "\\eb3f" }
.codicon-repo-pull:before { content: "\\eb40" }
.codicon-repo-push:before { content: "\\eb41" }
.codicon-report:before { content: "\\eb42" }
.codicon-request-changes:before { content: "\\eb43" }
.codicon-rocket:before { content: "\\eb44" }
.codicon-root-folder-opened:before { content: "\\eb45" }
.codicon-root-folder:before { content: "\\eb46" }
.codicon-rss:before { content: "\\eb47" }
.codicon-ruby:before { content: "\\eb48" }
.codicon-save-all:before { content: "\\eb49" }
.codicon-save-as:before { content: "\\eb4a" }
.codicon-save:before { content: "\\eb4b" }
.codicon-screen-full:before { content: "\\eb4c" }
.codicon-screen-normal:before { content: "\\eb4d" }
.codicon-search-stop:before { content: "\\eb4e" }
.codicon-server:before { content: "\\eb50" }
.codicon-settings-gear:before { content: "\\eb51" }
.codicon-settings:before { content: "\\eb52" }
.codicon-shield:before { content: "\\eb53" }
.codicon-smiley:before { content: "\\eb54" }
.codicon-sort-precedence:before { content: "\\eb55" }
.codicon-split-horizontal:before { content: "\\eb56" }
.codicon-split-vertical:before { content: "\\eb57" }
.codicon-squirrel:before { content: "\\eb58" }
.codicon-star-full:before { content: "\\eb59" }
.codicon-star-half:before { content: "\\eb5a" }
.codicon-symbol-class:before { content: "\\eb5b" }
.codicon-symbol-color:before { content: "\\eb5c" }
.codicon-symbol-constant:before { content: "\\eb5d" }
.codicon-symbol-enum-member:before { content: "\\eb5e" }
.codicon-symbol-field:before { content: "\\eb5f" }
.codicon-symbol-file:before { content: "\\eb60" }
.codicon-symbol-interface:before { content: "\\eb61" }
.codicon-symbol-keyword:before { content: "\\eb62" }
.codicon-symbol-misc:before { content: "\\eb63" }
.codicon-symbol-operator:before { content: "\\eb64" }
.codicon-symbol-property:before { content: "\\eb65" }
.codicon-wrench:before { content: "\\eb65" }
.codicon-wrench-subaction:before { content: "\\eb65" }
.codicon-symbol-snippet:before { content: "\\eb66" }
.codicon-tasklist:before { content: "\\eb67" }
.codicon-telescope:before { content: "\\eb68" }
.codicon-text-size:before { content: "\\eb69" }
.codicon-three-bars:before { content: "\\eb6a" }
.codicon-thumbsdown:before { content: "\\eb6b" }
.codicon-thumbsup:before { content: "\\eb6c" }
.codicon-tools:before { content: "\\eb6d" }
.codicon-triangle-down:before { content: "\\eb6e" }
.codicon-triangle-left:before { content: "\\eb6f" }
.codicon-triangle-right:before { content: "\\eb70" }
.codicon-triangle-up:before { content: "\\eb71" }
.codicon-twitter:before { content: "\\eb72" }
.codicon-unfold:before { content: "\\eb73" }
.codicon-unlock:before { content: "\\eb74" }
.codicon-unmute:before { content: "\\eb75" }
.codicon-unverified:before { content: "\\eb76" }
.codicon-verified:before { content: "\\eb77" }
.codicon-versions:before { content: "\\eb78" }
.codicon-vm-active:before { content: "\\eb79" }
.codicon-vm-outline:before { content: "\\eb7a" }
.codicon-vm-running:before { content: "\\eb7b" }
.codicon-watch:before { content: "\\eb7c" }
.codicon-whitespace:before { content: "\\eb7d" }
.codicon-whole-word:before { content: "\\eb7e" }
.codicon-window:before { content: "\\eb7f" }
.codicon-word-wrap:before { content: "\\eb80" }
.codicon-zoom-in:before { content: "\\eb81" }
.codicon-zoom-out:before { content: "\\eb82" }
.codicon-list-filter:before { content: "\\eb83" }
.codicon-list-flat:before { content: "\\eb84" }
.codicon-list-selection:before { content: "\\eb85" }
.codicon-selection:before { content: "\\eb85" }
.codicon-list-tree:before { content: "\\eb86" }
.codicon-debug-breakpoint-function-unverified:before { content: "\\eb87" }
.codicon-debug-breakpoint-function:before { content: "\\eb88" }
.codicon-debug-breakpoint-function-disabled:before { content: "\\eb88" }
.codicon-debug-stackframe-active:before { content: "\\eb89" }
.codicon-circle-small-filled:before { content: "\\eb8a" }
.codicon-debug-stackframe-dot:before { content: "\\eb8a" }
.codicon-terminal-decoration-mark:before { content: "\\eb8a" }
.codicon-debug-stackframe:before { content: "\\eb8b" }
.codicon-debug-stackframe-focused:before { content: "\\eb8b" }
.codicon-debug-breakpoint-unsupported:before { content: "\\eb8c" }
.codicon-symbol-string:before { content: "\\eb8d" }
.codicon-debug-reverse-continue:before { content: "\\eb8e" }
.codicon-debug-step-back:before { content: "\\eb8f" }
.codicon-debug-restart-frame:before { content: "\\eb90" }
.codicon-debug-alt:before { content: "\\eb91" }
.codicon-call-incoming:before { content: "\\eb92" }
.codicon-call-outgoing:before { content: "\\eb93" }
.codicon-menu:before { content: "\\eb94" }
.codicon-expand-all:before { content: "\\eb95" }
.codicon-feedback:before { content: "\\eb96" }
.codicon-git-pull-request-reviewer:before { content: "\\eb96" }
.codicon-group-by-ref-type:before { content: "\\eb97" }
.codicon-ungroup-by-ref-type:before { content: "\\eb98" }
.codicon-account:before { content: "\\eb99" }
.codicon-git-pull-request-assignee:before { content: "\\eb99" }
.codicon-bell-dot:before { content: "\\eb9a" }
.codicon-debug-console:before { content: "\\eb9b" }
.codicon-library:before { content: "\\eb9c" }
.codicon-output:before { content: "\\eb9d" }
.codicon-run-all:before { content: "\\eb9e" }
.codicon-sync-ignored:before { content: "\\eb9f" }
.codicon-pinned:before { content: "\\eba0" }
.codicon-github-inverted:before { content: "\\eba1" }
.codicon-server-process:before { content: "\\eba2" }
.codicon-server-environment:before { content: "\\eba3" }
.codicon-pass:before { content: "\\eba4" }
.codicon-issue-closed:before { content: "\\eba4" }
.codicon-stop-circle:before { content: "\\eba5" }
.codicon-play-circle:before { content: "\\eba6" }
.codicon-record:before { content: "\\eba7" }
.codicon-debug-alt-small:before { content: "\\eba8" }
.codicon-vm-connect:before { content: "\\eba9" }
.codicon-cloud:before { content: "\\ebaa" }
.codicon-merge:before { content: "\\ebab" }
.codicon-export:before { content: "\\ebac" }
.codicon-graph-left:before { content: "\\ebad" }
.codicon-magnet:before { content: "\\ebae" }
.codicon-notebook:before { content: "\\ebaf" }
.codicon-redo:before { content: "\\ebb0" }
.codicon-check-all:before { content: "\\ebb1" }
.codicon-pinned-dirty:before { content: "\\ebb2" }
.codicon-pass-filled:before { content: "\\ebb3" }
.codicon-circle-large-filled:before { content: "\\ebb4" }
.codicon-circle-large:before { content: "\\ebb5" }
.codicon-circle-large-outline:before { content: "\\ebb5" }
.codicon-combine:before { content: "\\ebb6" }
.codicon-gather:before { content: "\\ebb6" }
.codicon-table:before { content: "\\ebb7" }
.codicon-variable-group:before { content: "\\ebb8" }
.codicon-type-hierarchy:before { content: "\\ebb9" }
.codicon-type-hierarchy-sub:before { content: "\\ebba" }
.codicon-type-hierarchy-super:before { content: "\\ebbb" }
.codicon-git-pull-request-create:before { content: "\\ebbc" }
.codicon-run-above:before { content: "\\ebbd" }
.codicon-run-below:before { content: "\\ebbe" }
.codicon-notebook-template:before { content: "\\ebbf" }
.codicon-debug-rerun:before { content: "\\ebc0" }
.codicon-workspace-trusted:before { content: "\\ebc1" }
.codicon-workspace-untrusted:before { content: "\\ebc2" }
.codicon-workspace-unknown:before { content: "\\ebc3" }
.codicon-terminal-cmd:before { content: "\\ebc4" }
.codicon-terminal-debian:before { content: "\\ebc5" }
.codicon-terminal-linux:before { content: "\\ebc6" }
.codicon-terminal-powershell:before { content: "\\ebc7" }
.codicon-terminal-tmux:before { content: "\\ebc8" }
.codicon-terminal-ubuntu:before { content: "\\ebc9" }
.codicon-terminal-bash:before { content: "\\ebca" }
.codicon-arrow-swap:before { content: "\\ebcb" }
.codicon-copy:before { content: "\\ebcc" }
.codicon-person-add:before { content: "\\ebcd" }
.codicon-filter-filled:before { content: "\\ebce" }
.codicon-wand:before { content: "\\ebcf" }
.codicon-debug-line-by-line:before { content: "\\ebd0" }
.codicon-inspect:before { content: "\\ebd1" }
.codicon-layers:before { content: "\\ebd2" }
.codicon-layers-dot:before { content: "\\ebd3" }
.codicon-layers-active:before { content: "\\ebd4" }
.codicon-compass:before { content: "\\ebd5" }
.codicon-compass-dot:before { content: "\\ebd6" }
.codicon-compass-active:before { content: "\\ebd7" }
.codicon-azure:before { content: "\\ebd8" }
.codicon-issue-draft:before { content: "\\ebd9" }
.codicon-git-pull-request-closed:before { content: "\\ebda" }
.codicon-git-pull-request-draft:before { content: "\\ebdb" }
.codicon-debug-all:before { content: "\\ebdc" }
.codicon-debug-coverage:before { content: "\\ebdd" }
.codicon-run-errors:before { content: "\\ebde" }
.codicon-folder-library:before { content: "\\ebdf" }
.codicon-debug-continue-small:before { content: "\\ebe0" }
.codicon-beaker-stop:before { content: "\\ebe1" }
.codicon-graph-line:before { content: "\\ebe2" }
.codicon-graph-scatter:before { content: "\\ebe3" }
.codicon-pie-chart:before { content: "\\ebe4" }
.codicon-bracket:before { content: "\\eb0f" }
.codicon-bracket-dot:before { content: "\\ebe5" }
.codicon-bracket-error:before { content: "\\ebe6" }
.codicon-lock-small:before { content: "\\ebe7" }
.codicon-azure-devops:before { content: "\\ebe8" }
.codicon-verified-filled:before { content: "\\ebe9" }
.codicon-newline:before { content: "\\ebea" }
.codicon-layout:before { content: "\\ebeb" }
.codicon-layout-activitybar-left:before { content: "\\ebec" }
.codicon-layout-activitybar-right:before { content: "\\ebed" }
.codicon-layout-panel-left:before { content: "\\ebee" }
.codicon-layout-panel-center:before { content: "\\ebef" }
.codicon-layout-panel-justify:before { content: "\\ebf0" }
.codicon-layout-panel-right:before { content: "\\ebf1" }
.codicon-layout-panel:before { content: "\\ebf2" }
.codicon-layout-sidebar-left:before { content: "\\ebf3" }
.codicon-layout-sidebar-right:before { content: "\\ebf4" }
.codicon-layout-statusbar:before { content: "\\ebf5" }
.codicon-layout-menubar:before { content: "\\ebf6" }
.codicon-layout-centered:before { content: "\\ebf7" }
.codicon-target:before { content: "\\ebf8" }
.codicon-indent:before { content: "\\ebf9" }
.codicon-record-small:before { content: "\\ebfa" }
.codicon-error-small:before { content: "\\ebfb" }
.codicon-terminal-decoration-error:before { content: "\\ebfb" }
.codicon-arrow-circle-down:before { content: "\\ebfc" }
.codicon-arrow-circle-left:before { content: "\\ebfd" }
.codicon-arrow-circle-right:before { content: "\\ebfe" }
.codicon-arrow-circle-up:before { content: "\\ebff" }
.codicon-layout-sidebar-right-off:before { content: "\\ec00" }
.codicon-layout-panel-off:before { content: "\\ec01" }
.codicon-layout-sidebar-left-off:before { content: "\\ec02" }
.codicon-blank:before { content: "\\ec03" }
.codicon-heart-filled:before { content: "\\ec04" }
.codicon-map:before { content: "\\ec05" }
.codicon-map-filled:before { content: "\\ec06" }
.codicon-circle-small:before { content: "\\ec07" }
.codicon-bell-slash:before { content: "\\ec08" }
.codicon-bell-slash-dot:before { content: "\\ec09" }
.codicon-comment-unresolved:before { content: "\\ec0a" }
.codicon-git-pull-request-go-to-changes:before { content: "\\ec0b" }
.codicon-git-pull-request-new-changes:before { content: "\\ec0c" }
.codicon-search-fuzzy:before { content: "\\ec0d" }
.codicon-comment-draft:before { content: "\\ec0e" }
.codicon-send:before { content: "\\ec0f" }
.codicon-sparkle:before { content: "\\ec10" }
.codicon-insert:before { content: "\\ec11" }
.codicon-mic:before { content: "\\ec12" }
.codicon-thumbsdown-filled:before { content: "\\ec13" }
.codicon-thumbsup-filled:before { content: "\\ec14" }
.codicon-coffee:before { content: "\\ec15" }
.codicon-snake:before { content: "\\ec16" }
.codicon-game:before { content: "\\ec17" }
.codicon-vr:before { content: "\\ec18" }
.codicon-chip:before { content: "\\ec19" }
.codicon-piano:before { content: "\\ec1a" }
.codicon-music:before { content: "\\ec1b" }
.codicon-mic-filled:before { content: "\\ec1c" }
.codicon-git-fetch:before { content: "\\ec1d" }
.codicon-copilot:before { content: "\\ec1e" }
`;

const Page: React.FC = () => {
    React.useEffect(() => {
        return () => {
            localStorage.clear();
        };
    }, []);
    return (
        <>
            <style type="text/css">{codiconsCss}</style>
            <style type="text/css">
                {`
                .codicons-stories-container {
                    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                    margin: 0;
                    padding: 40px 20px;
                    text-align: center;
                    background-color: #f8f8f8;
                }

                .search-container {
                    position: fixed;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .icons-container {
                    padding-top: 60px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .icon {
                    width: 100px;
                    display: inline-block;
                    margin: 8px;
                }

                .icon:hover {
                    cursor: pointer;
                }

                .icon:hover .inner {
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
                }

                .icon .inner {
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    background-color: white;
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
                    border-radius: 4px;
                    transition: all .3s ease-in-out;
                }

                .icon .inner i {
                    padding: 16px 0;
                    font-size: 48px;
                    color: #333;
                    overflow: hidden;
                }

                .icon .inner::before {
                    overflow: hidden;
                }

                .label {
                    margin-top: 8px;
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 4px;
                    font-size: 10px;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .search {
                    display: flex;
                    width: 100%;
                    font-size: 16px;
                    padding: 12px 16px;
                    margin: 0 auto;
                    max-width: 900px;
                    border: 1px solid rgba(0,0,0,.1);
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06);
                }

                .search:focus {
                    outline: none !important;
                    border-color: #18a0fb;
                }

                #notification {
                    position: fixed;
                    margin: auto;
                    bottom: 40px;
                    left: 50%;
                    width: auto;
                    transform: translateX(-50%);
                    color: white;
                    background-color: #212121;
                    padding: 8px 24px;
                    border-radius: 8px;
                    opacity: 0;
                    transition: opacity .3s ease-in-out;
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
                }

                #notification-id {
                    font-weight: bold;
                }

                #notification.show{
                    opacity: .9;
                }`}
            </style>

            <div className="codicons-stories-container">
                <div className="search-container">
                    <input
                        type="text"
                        className="search"
                        placeholder="Search for icon names"
                        onChange={(e) => {
                            const value = e.target.value;
                            const filter = value.toUpperCase();
                            const wrapper = document.querySelectorAll(".icons-container");
                            if (!wrapper) {
                                return;
                            }
                            const icons = wrapper[0].querySelectorAll<HTMLDivElement>(".icon");

                            for (let i = 0; i < icons.length; i++) {
                                const iconName = icons[i].getAttribute("data-name");
                                if (iconName && iconName.toUpperCase().includes(filter)) {
                                    icons[i].style.display = "";
                                } else {
                                    icons[i].style.display = "none";
                                }
                            }
                        }}
                    />
                </div>

                <div id="notification">
                    📋 Copied: <span id="notification-id"></span>
                </div>
                <div className="icons-container">
                    <IconButton iconId="codicon-add" label="add" />
                    <IconButton iconId="codicon-plus" label="plus" />
                    <IconButton iconId="codicon-gist-new" label="gist-new" />
                    <IconButton iconId="codicon-repo-create" label="repo-create" />
                    <IconButton iconId="codicon-lightbulb" label="lightbulb" />
                    <IconButton iconId="codicon-light-bulb" label="light-bulb" />
                    <IconButton iconId="codicon-repo" label="repo" />
                    <IconButton iconId="codicon-repo-delete" label="repo-delete" />
                    <IconButton iconId="codicon-gist-fork" label="gist-fork" />
                    <IconButton iconId="codicon-repo-forked" label="repo-forked" />
                    <IconButton iconId="codicon-git-pull-request" label="git-pull-request" />
                    <IconButton iconId="codicon-git-pull-request-abandoned" label="git-pull-request-abandoned" />
                    <IconButton iconId="codicon-record-keys" label="record-keys" />
                    <IconButton iconId="codicon-keyboard" label="keyboard" />
                    <IconButton iconId="codicon-tag" label="tag" />
                    <IconButton iconId="codicon-git-pull-request-label" label="git-pull-request-label" />
                    <IconButton iconId="codicon-tag-add" label="tag-add" />
                    <IconButton iconId="codicon-tag-remove" label="tag-remove" />
                    <IconButton iconId="codicon-person" label="person" />
                    <IconButton iconId="codicon-person-follow" label="person-follow" />
                    <IconButton iconId="codicon-person-outline" label="person-outline" />
                    <IconButton iconId="codicon-person-filled" label="person-filled" />
                    <IconButton iconId="codicon-git-branch" label="git-branch" />
                    <IconButton iconId="codicon-git-branch-create" label="git-branch-create" />
                    <IconButton iconId="codicon-git-branch-delete" label="git-branch-delete" />
                    <IconButton iconId="codicon-source-control" label="source-control" />
                    <IconButton iconId="codicon-mirror" label="mirror" />
                    <IconButton iconId="codicon-mirror-public" label="mirror-public" />
                    <IconButton iconId="codicon-star" label="star" />
                    <IconButton iconId="codicon-star-add" label="star-add" />
                    <IconButton iconId="codicon-star-delete" label="star-delete" />
                    <IconButton iconId="codicon-star-empty" label="star-empty" />
                    <IconButton iconId="codicon-comment" label="comment" />
                    <IconButton iconId="codicon-comment-add" label="comment-add" />
                    <IconButton iconId="codicon-alert" label="alert" />
                    <IconButton iconId="codicon-warning" label="warning" />
                    <IconButton iconId="codicon-search" label="search" />
                    <IconButton iconId="codicon-search-save" label="search-save" />
                    <IconButton iconId="codicon-log-out" label="log-out" />
                    <IconButton iconId="codicon-sign-out" label="sign-out" />
                    <IconButton iconId="codicon-log-in" label="log-in" />
                    <IconButton iconId="codicon-sign-in" label="sign-in" />
                    <IconButton iconId="codicon-eye" label="eye" />
                    <IconButton iconId="codicon-eye-unwatch" label="eye-unwatch" />
                    <IconButton iconId="codicon-eye-watch" label="eye-watch" />
                    <IconButton iconId="codicon-circle-filled" label="circle-filled" />
                    <IconButton iconId="codicon-primitive-dot" label="primitive-dot" />
                    <IconButton iconId="codicon-close-dirty" label="close-dirty" />
                    <IconButton iconId="codicon-debug-breakpoint" label="debug-breakpoint" />
                    <IconButton iconId="codicon-debug-breakpoint-disabled" label="debug-breakpoint-disabled" />
                    <IconButton iconId="codicon-debug-hint" label="debug-hint" />
                    <IconButton iconId="codicon-terminal-decoration-success" label="terminal-decoration-success" />
                    <IconButton iconId="codicon-primitive-square" label="primitive-square" />
                    <IconButton iconId="codicon-edit" label="edit" />
                    <IconButton iconId="codicon-pencil" label="pencil" />
                    <IconButton iconId="codicon-info" label="info" />
                    <IconButton iconId="codicon-issue-opened" label="issue-opened" />
                    <IconButton iconId="codicon-gist-private" label="gist-private" />
                    <IconButton iconId="codicon-git-fork-private" label="git-fork-private" />
                    <IconButton iconId="codicon-lock" label="lock" />
                    <IconButton iconId="codicon-mirror-private" label="mirror-private" />
                    <IconButton iconId="codicon-close" label="close" />
                    <IconButton iconId="codicon-remove-close" label="remove-close" />
                    <IconButton iconId="codicon-x" label="x" />
                    <IconButton iconId="codicon-repo-sync" label="repo-sync" />
                    <IconButton iconId="codicon-sync" label="sync" />
                    <IconButton iconId="codicon-clone" label="clone" />
                    <IconButton iconId="codicon-desktop-download" label="desktop-download" />
                    <IconButton iconId="codicon-beaker" label="beaker" />
                    <IconButton iconId="codicon-microscope" label="microscope" />
                    <IconButton iconId="codicon-vm" label="vm" />
                    <IconButton iconId="codicon-device-desktop" label="device-desktop" />
                    <IconButton iconId="codicon-file" label="file" />
                    <IconButton iconId="codicon-file-text" label="file-text" />
                    <IconButton iconId="codicon-more" label="more" />
                    <IconButton iconId="codicon-ellipsis" label="ellipsis" />
                    <IconButton iconId="codicon-kebab-horizontal" label="kebab-horizontal" />
                    <IconButton iconId="codicon-mail-reply" label="mail-reply" />
                    <IconButton iconId="codicon-reply" label="reply" />
                    <IconButton iconId="codicon-organization" label="organization" />
                    <IconButton iconId="codicon-organization-filled" label="organization-filled" />
                    <IconButton iconId="codicon-organization-outline" label="organization-outline" />
                    <IconButton iconId="codicon-new-file" label="new-file" />
                    <IconButton iconId="codicon-file-add" label="file-add" />
                    <IconButton iconId="codicon-new-folder" label="new-folder" />
                    <IconButton iconId="codicon-file-directory-create" label="file-directory-create" />
                    <IconButton iconId="codicon-trash" label="trash" />
                    <IconButton iconId="codicon-trashcan" label="trashcan" />
                    <IconButton iconId="codicon-history" label="history" />
                    <IconButton iconId="codicon-clock" label="clock" />
                    <IconButton iconId="codicon-folder" label="folder" />
                    <IconButton iconId="codicon-file-directory" label="file-directory" />
                    <IconButton iconId="codicon-symbol-folder" label="symbol-folder" />
                    <IconButton iconId="codicon-logo-github" label="logo-github" />
                    <IconButton iconId="codicon-mark-github" label="mark-github" />
                    <IconButton iconId="codicon-github" label="github" />
                    <IconButton iconId="codicon-terminal" label="terminal" />
                    <IconButton iconId="codicon-console" label="console" />
                    <IconButton iconId="codicon-repl" label="repl" />
                    <IconButton iconId="codicon-zap" label="zap" />
                    <IconButton iconId="codicon-symbol-event" label="symbol-event" />
                    <IconButton iconId="codicon-error" label="error" />
                    <IconButton iconId="codicon-stop" label="stop" />
                    <IconButton iconId="codicon-variable" label="variable" />
                    <IconButton iconId="codicon-symbol-variable" label="symbol-variable" />
                    <IconButton iconId="codicon-array" label="array" />
                    <IconButton iconId="codicon-symbol-array" label="symbol-array" />
                    <IconButton iconId="codicon-symbol-module" label="symbol-module" />
                    <IconButton iconId="codicon-symbol-package" label="symbol-package" />
                    <IconButton iconId="codicon-symbol-namespace" label="symbol-namespace" />
                    <IconButton iconId="codicon-symbol-object" label="symbol-object" />
                    <IconButton iconId="codicon-symbol-method" label="symbol-method" />
                    <IconButton iconId="codicon-symbol-function" label="symbol-function" />
                    <IconButton iconId="codicon-symbol-constructor" label="symbol-constructor" />
                    <IconButton iconId="codicon-symbol-boolean" label="symbol-boolean" />
                    <IconButton iconId="codicon-symbol-null" label="symbol-null" />
                    <IconButton iconId="codicon-symbol-numeric" label="symbol-numeric" />
                    <IconButton iconId="codicon-symbol-number" label="symbol-number" />
                    <IconButton iconId="codicon-symbol-structure" label="symbol-structure" />
                    <IconButton iconId="codicon-symbol-struct" label="symbol-struct" />
                    <IconButton iconId="codicon-symbol-parameter" label="symbol-parameter" />
                    <IconButton iconId="codicon-symbol-type-parameter" label="symbol-type-parameter" />
                    <IconButton iconId="codicon-symbol-key" label="symbol-key" />
                    <IconButton iconId="codicon-symbol-text" label="symbol-text" />
                    <IconButton iconId="codicon-symbol-reference" label="symbol-reference" />
                    <IconButton iconId="codicon-go-to-file" label="go-to-file" />
                    <IconButton iconId="codicon-symbol-enum" label="symbol-enum" />
                    <IconButton iconId="codicon-symbol-value" label="symbol-value" />
                    <IconButton iconId="codicon-symbol-ruler" label="symbol-ruler" />
                    <IconButton iconId="codicon-symbol-unit" label="symbol-unit" />
                    <IconButton iconId="codicon-activate-breakpoints" label="activate-breakpoints" />
                    <IconButton iconId="codicon-archive" label="archive" />
                    <IconButton iconId="codicon-arrow-both" label="arrow-both" />
                    <IconButton iconId="codicon-arrow-down" label="arrow-down" />
                    <IconButton iconId="codicon-arrow-left" label="arrow-left" />
                    <IconButton iconId="codicon-arrow-right" label="arrow-right" />
                    <IconButton iconId="codicon-arrow-small-down" label="arrow-small-down" />
                    <IconButton iconId="codicon-arrow-small-left" label="arrow-small-left" />
                    <IconButton iconId="codicon-arrow-small-right" label="arrow-small-right" />
                    <IconButton iconId="codicon-arrow-small-up" label="arrow-small-up" />
                    <IconButton iconId="codicon-arrow-up" label="arrow-up" />
                    <IconButton iconId="codicon-bell" label="bell" />
                    <IconButton iconId="codicon-bold" label="bold" />
                    <IconButton iconId="codicon-book" label="book" />
                    <IconButton iconId="codicon-bookmark" label="bookmark" />
                    <IconButton
                        iconId="codicon-debug-breakpoint-conditional-unverified"
                        label="debug-breakpoint-conditional-unverified"
                    />
                    <IconButton iconId="codicon-debug-breakpoint-conditional" label="debug-breakpoint-conditional" />
                    <IconButton
                        iconId="codicon-debug-breakpoint-conditional-disabled"
                        label="debug-breakpoint-conditional-disabled"
                    />
                    <IconButton
                        iconId="codicon-debug-breakpoint-data-unverified"
                        label="debug-breakpoint-data-unverified"
                    />
                    <IconButton iconId="codicon-debug-breakpoint-data" label="debug-breakpoint-data" />
                    <IconButton
                        iconId="codicon-debug-breakpoint-data-disabled"
                        label="debug-breakpoint-data-disabled"
                    />
                    <IconButton
                        iconId="codicon-debug-breakpoint-log-unverified"
                        label="debug-breakpoint-log-unverified"
                    />
                    <IconButton iconId="codicon-debug-breakpoint-log" label="debug-breakpoint-log" />
                    <IconButton iconId="codicon-debug-breakpoint-log-disabled" label="debug-breakpoint-log-disabled" />
                    <IconButton iconId="codicon-briefcase" label="briefcase" />
                    <IconButton iconId="codicon-broadcast" label="broadcast" />
                    <IconButton iconId="codicon-browser" label="browser" />
                    <IconButton iconId="codicon-bug" label="bug" />
                    <IconButton iconId="codicon-calendar" label="calendar" />
                    <IconButton iconId="codicon-case-sensitive" label="case-sensitive" />
                    <IconButton iconId="codicon-check" label="check" />
                    <IconButton iconId="codicon-checklist" label="checklist" />
                    <IconButton iconId="codicon-chevron-down" label="chevron-down" />
                    <IconButton iconId="codicon-chevron-left" label="chevron-left" />
                    <IconButton iconId="codicon-chevron-right" label="chevron-right" />
                    <IconButton iconId="codicon-chevron-up" label="chevron-up" />
                    <IconButton iconId="codicon-chrome-close" label="chrome-close" />
                    <IconButton iconId="codicon-chrome-maximize" label="chrome-maximize" />
                    <IconButton iconId="codicon-chrome-minimize" label="chrome-minimize" />
                    <IconButton iconId="codicon-chrome-restore" label="chrome-restore" />
                    <IconButton iconId="codicon-circle-outline" label="circle-outline" />
                    <IconButton iconId="codicon-circle" label="circle" />
                    <IconButton iconId="codicon-debug-breakpoint-unverified" label="debug-breakpoint-unverified" />
                    <IconButton
                        iconId="codicon-terminal-decoration-incomplete"
                        label="terminal-decoration-incomplete"
                    />
                    <IconButton iconId="codicon-circle-slash" label="circle-slash" />
                    <IconButton iconId="codicon-circuit-board" label="circuit-board" />
                    <IconButton iconId="codicon-clear-all" label="clear-all" />
                    <IconButton iconId="codicon-clippy" label="clippy" />
                    <IconButton iconId="codicon-close-all" label="close-all" />
                    <IconButton iconId="codicon-cloud-download" label="cloud-download" />
                    <IconButton iconId="codicon-cloud-upload" label="cloud-upload" />
                    <IconButton iconId="codicon-code" label="code" />
                    <IconButton iconId="codicon-collapse-all" label="collapse-all" />
                    <IconButton iconId="codicon-color-mode" label="color-mode" />
                    <IconButton iconId="codicon-comment-discussion" label="comment-discussion" />
                    <IconButton iconId="codicon-credit-card" label="credit-card" />
                    <IconButton iconId="codicon-dash" label="dash" />
                    <IconButton iconId="codicon-dashboard" label="dashboard" />
                    <IconButton iconId="codicon-database" label="database" />
                    <IconButton iconId="codicon-debug-continue" label="debug-continue" />
                    <IconButton iconId="codicon-debug-disconnect" label="debug-disconnect" />
                    <IconButton iconId="codicon-debug-pause" label="debug-pause" />
                    <IconButton iconId="codicon-debug-restart" label="debug-restart" />
                    <IconButton iconId="codicon-debug-start" label="debug-start" />
                    <IconButton iconId="codicon-debug-step-into" label="debug-step-into" />
                    <IconButton iconId="codicon-debug-step-out" label="debug-step-out" />
                    <IconButton iconId="codicon-debug-step-over" label="debug-step-over" />
                    <IconButton iconId="codicon-debug-stop" label="debug-stop" />
                    <IconButton iconId="codicon-debug" label="debug" />
                    <IconButton iconId="codicon-device-camera-video" label="device-camera-video" />
                    <IconButton iconId="codicon-device-camera" label="device-camera" />
                    <IconButton iconId="codicon-device-mobile" label="device-mobile" />
                    <IconButton iconId="codicon-diff-added" label="diff-added" />
                    <IconButton iconId="codicon-diff-ignored" label="diff-ignored" />
                    <IconButton iconId="codicon-diff-modified" label="diff-modified" />
                    <IconButton iconId="codicon-diff-removed" label="diff-removed" />
                    <IconButton iconId="codicon-diff-renamed" label="diff-renamed" />
                    <IconButton iconId="codicon-diff" label="diff" />
                    <IconButton iconId="codicon-discard" label="discard" />
                    <IconButton iconId="codicon-editor-layout" label="editor-layout" />
                    <IconButton iconId="codicon-empty-window" label="empty-window" />
                    <IconButton iconId="codicon-exclude" label="exclude" />
                    <IconButton iconId="codicon-extensions" label="extensions" />
                    <IconButton iconId="codicon-eye-closed" label="eye-closed" />
                    <IconButton iconId="codicon-file-binary" label="file-binary" />
                    <IconButton iconId="codicon-file-code" label="file-code" />
                    <IconButton iconId="codicon-file-media" label="file-media" />
                    <IconButton iconId="codicon-file-pdf" label="file-pdf" />
                    <IconButton iconId="codicon-file-submodule" label="file-submodule" />
                    <IconButton iconId="codicon-file-symlink-directory" label="file-symlink-directory" />
                    <IconButton iconId="codicon-file-symlink-file" label="file-symlink-file" />
                    <IconButton iconId="codicon-file-zip" label="file-zip" />
                    <IconButton iconId="codicon-files" label="files" />
                    <IconButton iconId="codicon-filter" label="filter" />
                    <IconButton iconId="codicon-flame" label="flame" />
                    <IconButton iconId="codicon-fold-down" label="fold-down" />
                    <IconButton iconId="codicon-fold-up" label="fold-up" />
                    <IconButton iconId="codicon-fold" label="fold" />
                    <IconButton iconId="codicon-folder-active" label="folder-active" />
                    <IconButton iconId="codicon-folder-opened" label="folder-opened" />
                    <IconButton iconId="codicon-gear" label="gear" />
                    <IconButton iconId="codicon-gift" label="gift" />
                    <IconButton iconId="codicon-gist-secret" label="gist-secret" />
                    <IconButton iconId="codicon-gist" label="gist" />
                    <IconButton iconId="codicon-git-commit" label="git-commit" />
                    <IconButton iconId="codicon-git-compare" label="git-compare" />
                    <IconButton iconId="codicon-compare-changes" label="compare-changes" />
                    <IconButton iconId="codicon-git-merge" label="git-merge" />
                    <IconButton iconId="codicon-github-action" label="github-action" />
                    <IconButton iconId="codicon-github-alt" label="github-alt" />
                    <IconButton iconId="codicon-globe" label="globe" />
                    <IconButton iconId="codicon-grabber" label="grabber" />
                    <IconButton iconId="codicon-graph" label="graph" />
                    <IconButton iconId="codicon-gripper" label="gripper" />
                    <IconButton iconId="codicon-heart" label="heart" />
                    <IconButton iconId="codicon-home" label="home" />
                    <IconButton iconId="codicon-horizontal-rule" label="horizontal-rule" />
                    <IconButton iconId="codicon-hubot" label="hubot" />
                    <IconButton iconId="codicon-inbox" label="inbox" />
                    <IconButton iconId="codicon-issue-reopened" label="issue-reopened" />
                    <IconButton iconId="codicon-issues" label="issues" />
                    <IconButton iconId="codicon-italic" label="italic" />
                    <IconButton iconId="codicon-jersey" label="jersey" />
                    <IconButton iconId="codicon-json" label="json" />
                    <IconButton iconId="codicon-kebab-vertical" label="kebab-vertical" />
                    <IconButton iconId="codicon-key" label="key" />
                    <IconButton iconId="codicon-law" label="law" />
                    <IconButton iconId="codicon-lightbulb-autofix" label="lightbulb-autofix" />
                    <IconButton iconId="codicon-link-external" label="link-external" />
                    <IconButton iconId="codicon-link" label="link" />
                    <IconButton iconId="codicon-list-ordered" label="list-ordered" />
                    <IconButton iconId="codicon-list-unordered" label="list-unordered" />
                    <IconButton iconId="codicon-live-share" label="live-share" />
                    <IconButton iconId="codicon-loading" label="loading" />
                    <IconButton iconId="codicon-location" label="location" />
                    <IconButton iconId="codicon-mail-read" label="mail-read" />
                    <IconButton iconId="codicon-mail" label="mail" />
                    <IconButton iconId="codicon-markdown" label="markdown" />
                    <IconButton iconId="codicon-megaphone" label="megaphone" />
                    <IconButton iconId="codicon-mention" label="mention" />
                    <IconButton iconId="codicon-milestone" label="milestone" />
                    <IconButton iconId="codicon-git-pull-request-milestone" label="git-pull-request-milestone" />
                    <IconButton iconId="codicon-mortar-board" label="mortar-board" />
                    <IconButton iconId="codicon-move" label="move" />
                    <IconButton iconId="codicon-multiple-windows" label="multiple-windows" />
                    <IconButton iconId="codicon-mute" label="mute" />
                    <IconButton iconId="codicon-no-newline" label="no-newline" />
                    <IconButton iconId="codicon-note" label="note" />
                    <IconButton iconId="codicon-octoface" label="octoface" />
                    <IconButton iconId="codicon-open-preview" label="open-preview" />
                    <IconButton iconId="codicon-package" label="package" />
                    <IconButton iconId="codicon-paintcan" label="paintcan" />
                    <IconButton iconId="codicon-pin" label="pin" />
                    <IconButton iconId="codicon-play" label="play" />
                    <IconButton iconId="codicon-run" label="run" />
                    <IconButton iconId="codicon-plug" label="plug" />
                    <IconButton iconId="codicon-preserve-case" label="preserve-case" />
                    <IconButton iconId="codicon-preview" label="preview" />
                    <IconButton iconId="codicon-project" label="project" />
                    <IconButton iconId="codicon-pulse" label="pulse" />
                    <IconButton iconId="codicon-question" label="question" />
                    <IconButton iconId="codicon-quote" label="quote" />
                    <IconButton iconId="codicon-radio-tower" label="radio-tower" />
                    <IconButton iconId="codicon-reactions" label="reactions" />
                    <IconButton iconId="codicon-references" label="references" />
                    <IconButton iconId="codicon-refresh" label="refresh" />
                    <IconButton iconId="codicon-regex" label="regex" />
                    <IconButton iconId="codicon-remote-explorer" label="remote-explorer" />
                    <IconButton iconId="codicon-remote" label="remote" />
                    <IconButton iconId="codicon-remove" label="remove" />
                    <IconButton iconId="codicon-replace-all" label="replace-all" />
                    <IconButton iconId="codicon-replace" label="replace" />
                    <IconButton iconId="codicon-repo-clone" label="repo-clone" />
                    <IconButton iconId="codicon-repo-force-push" label="repo-force-push" />
                    <IconButton iconId="codicon-repo-pull" label="repo-pull" />
                    <IconButton iconId="codicon-repo-push" label="repo-push" />
                    <IconButton iconId="codicon-report" label="report" />
                    <IconButton iconId="codicon-request-changes" label="request-changes" />
                    <IconButton iconId="codicon-rocket" label="rocket" />
                    <IconButton iconId="codicon-root-folder-opened" label="root-folder-opened" />
                    <IconButton iconId="codicon-root-folder" label="root-folder" />
                    <IconButton iconId="codicon-rss" label="rss" />
                    <IconButton iconId="codicon-ruby" label="ruby" />
                    <IconButton iconId="codicon-save-all" label="save-all" />
                    <IconButton iconId="codicon-save-as" label="save-as" />
                    <IconButton iconId="codicon-save" label="save" />
                    <IconButton iconId="codicon-screen-full" label="screen-full" />
                    <IconButton iconId="codicon-screen-normal" label="screen-normal" />
                    <IconButton iconId="codicon-search-stop" label="search-stop" />
                    <IconButton iconId="codicon-server" label="server" />
                    <IconButton iconId="codicon-settings-gear" label="settings-gear" />
                    <IconButton iconId="codicon-settings" label="settings" />
                    <IconButton iconId="codicon-shield" label="shield" />
                    <IconButton iconId="codicon-smiley" label="smiley" />
                    <IconButton iconId="codicon-sort-precedence" label="sort-precedence" />
                    <IconButton iconId="codicon-split-horizontal" label="split-horizontal" />
                    <IconButton iconId="codicon-split-vertical" label="split-vertical" />
                    <IconButton iconId="codicon-squirrel" label="squirrel" />
                    <IconButton iconId="codicon-star-full" label="star-full" />
                    <IconButton iconId="codicon-star-half" label="star-half" />
                    <IconButton iconId="codicon-symbol-class" label="symbol-class" />
                    <IconButton iconId="codicon-symbol-color" label="symbol-color" />
                    <IconButton iconId="codicon-symbol-constant" label="symbol-constant" />
                    <IconButton iconId="codicon-symbol-enum-member" label="symbol-enum-member" />
                    <IconButton iconId="codicon-symbol-field" label="symbol-field" />
                    <IconButton iconId="codicon-symbol-file" label="symbol-file" />
                    <IconButton iconId="codicon-symbol-interface" label="symbol-interface" />
                    <IconButton iconId="codicon-symbol-keyword" label="symbol-keyword" />
                    <IconButton iconId="codicon-symbol-misc" label="symbol-misc" />
                    <IconButton iconId="codicon-symbol-operator" label="symbol-operator" />
                    <IconButton iconId="codicon-symbol-property" label="symbol-property" />
                    <IconButton iconId="codicon-wrench" label="wrench" />
                    <IconButton iconId="codicon-wrench-subaction" label="wrench-subaction" />
                    <IconButton iconId="codicon-symbol-snippet" label="symbol-snippet" />
                    <IconButton iconId="codicon-tasklist" label="tasklist" />
                    <IconButton iconId="codicon-telescope" label="telescope" />
                    <IconButton iconId="codicon-text-size" label="text-size" />
                    <IconButton iconId="codicon-three-bars" label="three-bars" />
                    <IconButton iconId="codicon-thumbsdown" label="thumbsdown" />
                    <IconButton iconId="codicon-thumbsup" label="thumbsup" />
                    <IconButton iconId="codicon-tools" label="tools" />
                    <IconButton iconId="codicon-triangle-down" label="triangle-down" />
                    <IconButton iconId="codicon-triangle-left" label="triangle-left" />
                    <IconButton iconId="codicon-triangle-right" label="triangle-right" />
                    <IconButton iconId="codicon-triangle-up" label="triangle-up" />
                    <IconButton iconId="codicon-twitter" label="twitter" />
                    <IconButton iconId="codicon-unfold" label="unfold" />
                    <IconButton iconId="codicon-unlock" label="unlock" />
                    <IconButton iconId="codicon-unmute" label="unmute" />
                    <IconButton iconId="codicon-unverified" label="unverified" />
                    <IconButton iconId="codicon-verified" label="verified" />
                    <IconButton iconId="codicon-versions" label="versions" />
                    <IconButton iconId="codicon-vm-active" label="vm-active" />
                    <IconButton iconId="codicon-vm-outline" label="vm-outline" />
                    <IconButton iconId="codicon-vm-running" label="vm-running" />
                    <IconButton iconId="codicon-watch" label="watch" />
                    <IconButton iconId="codicon-whitespace" label="whitespace" />
                    <IconButton iconId="codicon-whole-word" label="whole-word" />
                    <IconButton iconId="codicon-window" label="window" />
                    <IconButton iconId="codicon-word-wrap" label="word-wrap" />
                    <IconButton iconId="codicon-zoom-in" label="zoom-in" />
                    <IconButton iconId="codicon-zoom-out" label="zoom-out" />
                    <IconButton iconId="codicon-list-filter" label="list-filter" />
                    <IconButton iconId="codicon-list-flat" label="list-flat" />
                    <IconButton iconId="codicon-list-selection" label="list-selection" />
                    <IconButton iconId="codicon-selection" label="selection" />
                    <IconButton iconId="codicon-list-tree" label="list-tree" />
                    <IconButton
                        iconId="codicon-debug-breakpoint-function-unverified"
                        label="debug-breakpoint-function-unverified"
                    />
                    <IconButton iconId="codicon-debug-breakpoint-function" label="debug-breakpoint-function" />
                    <IconButton
                        iconId="codicon-debug-breakpoint-function-disabled"
                        label="debug-breakpoint-function-disabled"
                    />
                    <IconButton iconId="codicon-debug-stackframe-active" label="debug-stackframe-active" />
                    <IconButton iconId="codicon-circle-small-filled" label="circle-small-filled" />
                    <IconButton iconId="codicon-debug-stackframe-dot" label="debug-stackframe-dot" />
                    <IconButton iconId="codicon-terminal-decoration-mark" label="terminal-decoration-mark" />
                    <IconButton iconId="codicon-debug-stackframe" label="debug-stackframe" />
                    <IconButton iconId="codicon-debug-stackframe-focused" label="debug-stackframe-focused" />
                    <IconButton iconId="codicon-debug-breakpoint-unsupported" label="debug-breakpoint-unsupported" />
                    <IconButton iconId="codicon-symbol-string" label="symbol-string" />
                    <IconButton iconId="codicon-debug-reverse-continue" label="debug-reverse-continue" />
                    <IconButton iconId="codicon-debug-step-back" label="debug-step-back" />
                    <IconButton iconId="codicon-debug-restart-frame" label="debug-restart-frame" />
                    <IconButton iconId="codicon-debug-alt" label="debug-alt" />
                    <IconButton iconId="codicon-call-incoming" label="call-incoming" />
                    <IconButton iconId="codicon-call-outgoing" label="call-outgoing" />
                    <IconButton iconId="codicon-menu" label="menu" />
                    <IconButton iconId="codicon-expand-all" label="expand-all" />
                    <IconButton iconId="codicon-feedback" label="feedback" />
                    <IconButton iconId="codicon-git-pull-request-reviewer" label="git-pull-request-reviewer" />
                    <IconButton iconId="codicon-group-by-ref-type" label="group-by-ref-type" />
                    <IconButton iconId="codicon-ungroup-by-ref-type" label="ungroup-by-ref-type" />
                    <IconButton iconId="codicon-account" label="account" />
                    <IconButton iconId="codicon-git-pull-request-assignee" label="git-pull-request-assignee" />
                    <IconButton iconId="codicon-bell-dot" label="bell-dot" />
                    <IconButton iconId="codicon-debug-console" label="debug-console" />
                    <IconButton iconId="codicon-library" label="library" />
                    <IconButton iconId="codicon-output" label="output" />
                    <IconButton iconId="codicon-run-all" label="run-all" />
                    <IconButton iconId="codicon-sync-ignored" label="sync-ignored" />
                    <IconButton iconId="codicon-pinned" label="pinned" />
                    <IconButton iconId="codicon-github-inverted" label="github-inverted" />
                    <IconButton iconId="codicon-server-process" label="server-process" />
                    <IconButton iconId="codicon-server-environment" label="server-environment" />
                    <IconButton iconId="codicon-pass" label="pass" />
                    <IconButton iconId="codicon-issue-closed" label="issue-closed" />
                    <IconButton iconId="codicon-stop-circle" label="stop-circle" />
                    <IconButton iconId="codicon-play-circle" label="play-circle" />
                    <IconButton iconId="codicon-record" label="record" />
                    <IconButton iconId="codicon-debug-alt-small" label="debug-alt-small" />
                    <IconButton iconId="codicon-vm-connect" label="vm-connect" />
                    <IconButton iconId="codicon-cloud" label="cloud" />
                    <IconButton iconId="codicon-merge" label="merge" />
                    <IconButton iconId="codicon-export" label="export" />
                    <IconButton iconId="codicon-graph-left" label="graph-left" />
                    <IconButton iconId="codicon-magnet" label="magnet" />
                    <IconButton iconId="codicon-notebook" label="notebook" />
                    <IconButton iconId="codicon-redo" label="redo" />
                    <IconButton iconId="codicon-check-all" label="check-all" />
                    <IconButton iconId="codicon-pinned-dirty" label="pinned-dirty" />
                    <IconButton iconId="codicon-pass-filled" label="pass-filled" />
                    <IconButton iconId="codicon-circle-large-filled" label="circle-large-filled" />
                    <IconButton iconId="codicon-circle-large" label="circle-large" />
                    <IconButton iconId="codicon-circle-large-outline" label="circle-large-outline" />
                    <IconButton iconId="codicon-combine" label="combine" />
                    <IconButton iconId="codicon-gather" label="gather" />
                    <IconButton iconId="codicon-table" label="table" />
                    <IconButton iconId="codicon-variable-group" label="variable-group" />
                    <IconButton iconId="codicon-type-hierarchy" label="type-hierarchy" />
                    <IconButton iconId="codicon-type-hierarchy-sub" label="type-hierarchy-sub" />
                    <IconButton iconId="codicon-type-hierarchy-super" label="type-hierarchy-super" />
                    <IconButton iconId="codicon-git-pull-request-create" label="git-pull-request-create" />
                    <IconButton iconId="codicon-run-above" label="run-above" />
                    <IconButton iconId="codicon-run-below" label="run-below" />
                    <IconButton iconId="codicon-notebook-template" label="notebook-template" />
                    <IconButton iconId="codicon-debug-rerun" label="debug-rerun" />
                    <IconButton iconId="codicon-workspace-trusted" label="workspace-trusted" />
                    <IconButton iconId="codicon-workspace-untrusted" label="workspace-untrusted" />
                    <IconButton iconId="codicon-workspace-unknown" label="workspace-unknown" />
                    <IconButton iconId="codicon-terminal-cmd" label="terminal-cmd" />
                    <IconButton iconId="codicon-terminal-debian" label="terminal-debian" />
                    <IconButton iconId="codicon-terminal-linux" label="terminal-linux" />
                    <IconButton iconId="codicon-terminal-powershell" label="terminal-powershell" />
                    <IconButton iconId="codicon-terminal-tmux" label="terminal-tmux" />
                    <IconButton iconId="codicon-terminal-ubuntu" label="terminal-ubuntu" />
                    <IconButton iconId="codicon-terminal-bash" label="terminal-bash" />
                    <IconButton iconId="codicon-arrow-swap" label="arrow-swap" />
                    <IconButton iconId="codicon-copy" label="copy" />
                    <IconButton iconId="codicon-person-add" label="person-add" />
                    <IconButton iconId="codicon-filter-filled" label="filter-filled" />
                    <IconButton iconId="codicon-wand" label="wand" />
                    <IconButton iconId="codicon-debug-line-by-line" label="debug-line-by-line" />
                    <IconButton iconId="codicon-inspect" label="inspect" />
                    <IconButton iconId="codicon-layers" label="layers" />
                    <IconButton iconId="codicon-layers-dot" label="layers-dot" />
                    <IconButton iconId="codicon-layers-active" label="layers-active" />
                    <IconButton iconId="codicon-compass" label="compass" />
                    <IconButton iconId="codicon-compass-dot" label="compass-dot" />
                    <IconButton iconId="codicon-compass-active" label="compass-active" />
                    <IconButton iconId="codicon-azure" label="azure" />
                    <IconButton iconId="codicon-issue-draft" label="issue-draft" />
                    <IconButton iconId="codicon-git-pull-request-closed" label="git-pull-request-closed" />
                    <IconButton iconId="codicon-git-pull-request-draft" label="git-pull-request-draft" />
                    <IconButton iconId="codicon-debug-all" label="debug-all" />
                    <IconButton iconId="codicon-debug-coverage" label="debug-coverage" />
                    <IconButton iconId="codicon-run-errors" label="run-errors" />
                    <IconButton iconId="codicon-folder-library" label="folder-library" />
                    <IconButton iconId="codicon-debug-continue-small" label="debug-continue-small" />
                    <IconButton iconId="codicon-beaker-stop" label="beaker-stop" />
                    <IconButton iconId="codicon-graph-line" label="graph-line" />
                    <IconButton iconId="codicon-graph-scatter" label="graph-scatter" />
                    <IconButton iconId="codicon-pie-chart" label="pie-chart" />
                    <IconButton iconId="codicon-bracket" label="bracket" />
                    <IconButton iconId="codicon-bracket-dot" label="bracket-dot" />
                    <IconButton iconId="codicon-bracket-error" label="bracket-error" />
                    <IconButton iconId="codicon-lock-small" label="lock-small" />
                    <IconButton iconId="codicon-azure-devops" label="azure-devops" />
                    <IconButton iconId="codicon-verified-filled" label="verified-filled" />
                    <IconButton iconId="codicon-newline" label="newline" />
                    <IconButton iconId="codicon-layout" label="layout" />
                    <IconButton iconId="codicon-layout-activitybar-left" label="layout-activitybar-left" />
                    <IconButton iconId="codicon-layout-activitybar-right" label="layout-activitybar-right" />
                    <IconButton iconId="codicon-layout-panel-left" label="layout-panel-left" />
                    <IconButton iconId="codicon-layout-panel-center" label="layout-panel-center" />
                    <IconButton iconId="codicon-layout-panel-justify" label="layout-panel-justify" />
                    <IconButton iconId="codicon-layout-panel-right" label="layout-panel-right" />
                    <IconButton iconId="codicon-layout-panel" label="layout-panel" />
                    <IconButton iconId="codicon-layout-sidebar-left" label="layout-sidebar-left" />
                    <IconButton iconId="codicon-layout-sidebar-right" label="layout-sidebar-right" />
                    <IconButton iconId="codicon-layout-statusbar" label="layout-statusbar" />
                    <IconButton iconId="codicon-layout-menubar" label="layout-menubar" />
                    <IconButton iconId="codicon-layout-centered" label="layout-centered" />
                    <IconButton iconId="codicon-target" label="target" />
                    <IconButton iconId="codicon-indent" label="indent" />
                    <IconButton iconId="codicon-record-small" label="record-small" />
                    <IconButton iconId="codicon-error-small" label="error-small" />
                    <IconButton iconId="codicon-terminal-decoration-error" label="terminal-decoration-error" />
                    <IconButton iconId="codicon-arrow-circle-down" label="arrow-circle-down" />
                    <IconButton iconId="codicon-arrow-circle-left" label="arrow-circle-left" />
                    <IconButton iconId="codicon-arrow-circle-right" label="arrow-circle-right" />
                    <IconButton iconId="codicon-arrow-circle-up" label="arrow-circle-up" />
                    <IconButton iconId="codicon-layout-sidebar-right-off" label="layout-sidebar-right-off" />
                    <IconButton iconId="codicon-layout-panel-off" label="layout-panel-off" />
                    <IconButton iconId="codicon-layout-sidebar-left-off" label="layout-sidebar-left-off" />
                    <IconButton iconId="codicon-blank" label="blank" />
                    <IconButton iconId="codicon-heart-filled" label="heart-filled" />
                    <IconButton iconId="codicon-map" label="map" />
                    <IconButton iconId="codicon-map-filled" label="map-filled" />
                    <IconButton iconId="codicon-circle-small" label="circle-small" />
                    <IconButton iconId="codicon-bell-slash" label="bell-slash" />
                    <IconButton iconId="codicon-bell-slash-dot" label="bell-slash-dot" />
                    <IconButton iconId="codicon-comment-unresolved" label="comment-unresolved" />
                    <IconButton
                        iconId="codicon-git-pull-request-go-to-changes"
                        label="git-pull-request-go-to-changes"
                    />
                    <IconButton iconId="codicon-git-pull-request-new-changes" label="git-pull-request-new-changes" />
                    <IconButton iconId="codicon-search-fuzzy" label="search-fuzzy" />
                    <IconButton iconId="codicon-comment-draft" label="comment-draft" />
                    <IconButton iconId="codicon-send" label="send" />
                    <IconButton iconId="codicon-sparkle" label="sparkle" />
                    <IconButton iconId="codicon-insert" label="insert" />
                    <IconButton iconId="codicon-mic" label="mic" />
                    <IconButton iconId="codicon-thumbsdown-filled" label="thumbsdown-filled" />
                    <IconButton iconId="codicon-thumbsup-filled" label="thumbsup-filled" />
                    <IconButton iconId="codicon-coffee" label="coffee" />
                    <IconButton iconId="codicon-snake" label="snake" />
                    <IconButton iconId="codicon-game" label="game" />
                    <IconButton iconId="codicon-vr" label="vr" />
                    <IconButton iconId="codicon-chip" label="chip" />
                    <IconButton iconId="codicon-piano" label="piano" />
                    <IconButton iconId="codicon-music" label="music" />
                    <IconButton iconId="codicon-mic-filled" label="mic-filled" />
                    <IconButton iconId="codicon-git-fetch" label="git-fetch" />
                    <IconButton iconId="codicon-copilot" label="copilot" />
                </div>
            </div>
        </>
    );
};

const meta: Meta = {
    title: "@mas/icons/CodIcons",
};

export default meta;

type Story = StoryObj;

export const AllCodIcons: Story = {
    render: () => <Page />,
};

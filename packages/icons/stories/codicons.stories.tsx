/*
 * File: @mas/icons/stories/codicons.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/10/2023 04:00 pm
 *
 * Last Modified: 11/23/2023 06:00 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import "@mas/icons/codicons";

import IconButton from "./icon-button";
import IconsPage from "./icons-page";

type CodIconButtonProps = {
    iconId: string;
    label: string;
};

const CodIconButton: React.FC<CodIconButtonProps> = ({ iconId, label }) => {
    return <IconButton familyClassName="codicon" iconId={iconId} label={label} />;
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
    return (
        <>
            <style type="text/css">{codiconsCss}</style>
            <IconsPage>
                <CodIconButton iconId="codicon-add" label="add" />
                <CodIconButton iconId="codicon-plus" label="plus" />
                <CodIconButton iconId="codicon-gist-new" label="gist-new" />
                <CodIconButton iconId="codicon-repo-create" label="repo-create" />
                <CodIconButton iconId="codicon-lightbulb" label="lightbulb" />
                <CodIconButton iconId="codicon-light-bulb" label="light-bulb" />
                <CodIconButton iconId="codicon-repo" label="repo" />
                <CodIconButton iconId="codicon-repo-delete" label="repo-delete" />
                <CodIconButton iconId="codicon-gist-fork" label="gist-fork" />
                <CodIconButton iconId="codicon-repo-forked" label="repo-forked" />
                <CodIconButton iconId="codicon-git-pull-request" label="git-pull-request" />
                <CodIconButton iconId="codicon-git-pull-request-abandoned" label="git-pull-request-abandoned" />
                <CodIconButton iconId="codicon-record-keys" label="record-keys" />
                <CodIconButton iconId="codicon-keyboard" label="keyboard" />
                <CodIconButton iconId="codicon-tag" label="tag" />
                <CodIconButton iconId="codicon-git-pull-request-label" label="git-pull-request-label" />
                <CodIconButton iconId="codicon-tag-add" label="tag-add" />
                <CodIconButton iconId="codicon-tag-remove" label="tag-remove" />
                <CodIconButton iconId="codicon-person" label="person" />
                <CodIconButton iconId="codicon-person-follow" label="person-follow" />
                <CodIconButton iconId="codicon-person-outline" label="person-outline" />
                <CodIconButton iconId="codicon-person-filled" label="person-filled" />
                <CodIconButton iconId="codicon-git-branch" label="git-branch" />
                <CodIconButton iconId="codicon-git-branch-create" label="git-branch-create" />
                <CodIconButton iconId="codicon-git-branch-delete" label="git-branch-delete" />
                <CodIconButton iconId="codicon-source-control" label="source-control" />
                <CodIconButton iconId="codicon-mirror" label="mirror" />
                <CodIconButton iconId="codicon-mirror-public" label="mirror-public" />
                <CodIconButton iconId="codicon-star" label="star" />
                <CodIconButton iconId="codicon-star-add" label="star-add" />
                <CodIconButton iconId="codicon-star-delete" label="star-delete" />
                <CodIconButton iconId="codicon-star-empty" label="star-empty" />
                <CodIconButton iconId="codicon-comment" label="comment" />
                <CodIconButton iconId="codicon-comment-add" label="comment-add" />
                <CodIconButton iconId="codicon-alert" label="alert" />
                <CodIconButton iconId="codicon-warning" label="warning" />
                <CodIconButton iconId="codicon-search" label="search" />
                <CodIconButton iconId="codicon-search-save" label="search-save" />
                <CodIconButton iconId="codicon-log-out" label="log-out" />
                <CodIconButton iconId="codicon-sign-out" label="sign-out" />
                <CodIconButton iconId="codicon-log-in" label="log-in" />
                <CodIconButton iconId="codicon-sign-in" label="sign-in" />
                <CodIconButton iconId="codicon-eye" label="eye" />
                <CodIconButton iconId="codicon-eye-unwatch" label="eye-unwatch" />
                <CodIconButton iconId="codicon-eye-watch" label="eye-watch" />
                <CodIconButton iconId="codicon-circle-filled" label="circle-filled" />
                <CodIconButton iconId="codicon-primitive-dot" label="primitive-dot" />
                <CodIconButton iconId="codicon-close-dirty" label="close-dirty" />
                <CodIconButton iconId="codicon-debug-breakpoint" label="debug-breakpoint" />
                <CodIconButton iconId="codicon-debug-breakpoint-disabled" label="debug-breakpoint-disabled" />
                <CodIconButton iconId="codicon-debug-hint" label="debug-hint" />
                <CodIconButton iconId="codicon-terminal-decoration-success" label="terminal-decoration-success" />
                <CodIconButton iconId="codicon-primitive-square" label="primitive-square" />
                <CodIconButton iconId="codicon-edit" label="edit" />
                <CodIconButton iconId="codicon-pencil" label="pencil" />
                <CodIconButton iconId="codicon-info" label="info" />
                <CodIconButton iconId="codicon-issue-opened" label="issue-opened" />
                <CodIconButton iconId="codicon-gist-private" label="gist-private" />
                <CodIconButton iconId="codicon-git-fork-private" label="git-fork-private" />
                <CodIconButton iconId="codicon-lock" label="lock" />
                <CodIconButton iconId="codicon-mirror-private" label="mirror-private" />
                <CodIconButton iconId="codicon-close" label="close" />
                <CodIconButton iconId="codicon-remove-close" label="remove-close" />
                <CodIconButton iconId="codicon-x" label="x" />
                <CodIconButton iconId="codicon-repo-sync" label="repo-sync" />
                <CodIconButton iconId="codicon-sync" label="sync" />
                <CodIconButton iconId="codicon-clone" label="clone" />
                <CodIconButton iconId="codicon-desktop-download" label="desktop-download" />
                <CodIconButton iconId="codicon-beaker" label="beaker" />
                <CodIconButton iconId="codicon-microscope" label="microscope" />
                <CodIconButton iconId="codicon-vm" label="vm" />
                <CodIconButton iconId="codicon-device-desktop" label="device-desktop" />
                <CodIconButton iconId="codicon-file" label="file" />
                <CodIconButton iconId="codicon-file-text" label="file-text" />
                <CodIconButton iconId="codicon-more" label="more" />
                <CodIconButton iconId="codicon-ellipsis" label="ellipsis" />
                <CodIconButton iconId="codicon-kebab-horizontal" label="kebab-horizontal" />
                <CodIconButton iconId="codicon-mail-reply" label="mail-reply" />
                <CodIconButton iconId="codicon-reply" label="reply" />
                <CodIconButton iconId="codicon-organization" label="organization" />
                <CodIconButton iconId="codicon-organization-filled" label="organization-filled" />
                <CodIconButton iconId="codicon-organization-outline" label="organization-outline" />
                <CodIconButton iconId="codicon-new-file" label="new-file" />
                <CodIconButton iconId="codicon-file-add" label="file-add" />
                <CodIconButton iconId="codicon-new-folder" label="new-folder" />
                <CodIconButton iconId="codicon-file-directory-create" label="file-directory-create" />
                <CodIconButton iconId="codicon-trash" label="trash" />
                <CodIconButton iconId="codicon-trashcan" label="trashcan" />
                <CodIconButton iconId="codicon-history" label="history" />
                <CodIconButton iconId="codicon-clock" label="clock" />
                <CodIconButton iconId="codicon-folder" label="folder" />
                <CodIconButton iconId="codicon-file-directory" label="file-directory" />
                <CodIconButton iconId="codicon-symbol-folder" label="symbol-folder" />
                <CodIconButton iconId="codicon-logo-github" label="logo-github" />
                <CodIconButton iconId="codicon-mark-github" label="mark-github" />
                <CodIconButton iconId="codicon-github" label="github" />
                <CodIconButton iconId="codicon-terminal" label="terminal" />
                <CodIconButton iconId="codicon-console" label="console" />
                <CodIconButton iconId="codicon-repl" label="repl" />
                <CodIconButton iconId="codicon-zap" label="zap" />
                <CodIconButton iconId="codicon-symbol-event" label="symbol-event" />
                <CodIconButton iconId="codicon-error" label="error" />
                <CodIconButton iconId="codicon-stop" label="stop" />
                <CodIconButton iconId="codicon-variable" label="variable" />
                <CodIconButton iconId="codicon-symbol-variable" label="symbol-variable" />
                <CodIconButton iconId="codicon-array" label="array" />
                <CodIconButton iconId="codicon-symbol-array" label="symbol-array" />
                <CodIconButton iconId="codicon-symbol-module" label="symbol-module" />
                <CodIconButton iconId="codicon-symbol-package" label="symbol-package" />
                <CodIconButton iconId="codicon-symbol-namespace" label="symbol-namespace" />
                <CodIconButton iconId="codicon-symbol-object" label="symbol-object" />
                <CodIconButton iconId="codicon-symbol-method" label="symbol-method" />
                <CodIconButton iconId="codicon-symbol-function" label="symbol-function" />
                <CodIconButton iconId="codicon-symbol-constructor" label="symbol-constructor" />
                <CodIconButton iconId="codicon-symbol-boolean" label="symbol-boolean" />
                <CodIconButton iconId="codicon-symbol-null" label="symbol-null" />
                <CodIconButton iconId="codicon-symbol-numeric" label="symbol-numeric" />
                <CodIconButton iconId="codicon-symbol-number" label="symbol-number" />
                <CodIconButton iconId="codicon-symbol-structure" label="symbol-structure" />
                <CodIconButton iconId="codicon-symbol-struct" label="symbol-struct" />
                <CodIconButton iconId="codicon-symbol-parameter" label="symbol-parameter" />
                <CodIconButton iconId="codicon-symbol-type-parameter" label="symbol-type-parameter" />
                <CodIconButton iconId="codicon-symbol-key" label="symbol-key" />
                <CodIconButton iconId="codicon-symbol-text" label="symbol-text" />
                <CodIconButton iconId="codicon-symbol-reference" label="symbol-reference" />
                <CodIconButton iconId="codicon-go-to-file" label="go-to-file" />
                <CodIconButton iconId="codicon-symbol-enum" label="symbol-enum" />
                <CodIconButton iconId="codicon-symbol-value" label="symbol-value" />
                <CodIconButton iconId="codicon-symbol-ruler" label="symbol-ruler" />
                <CodIconButton iconId="codicon-symbol-unit" label="symbol-unit" />
                <CodIconButton iconId="codicon-activate-breakpoints" label="activate-breakpoints" />
                <CodIconButton iconId="codicon-archive" label="archive" />
                <CodIconButton iconId="codicon-arrow-both" label="arrow-both" />
                <CodIconButton iconId="codicon-arrow-down" label="arrow-down" />
                <CodIconButton iconId="codicon-arrow-left" label="arrow-left" />
                <CodIconButton iconId="codicon-arrow-right" label="arrow-right" />
                <CodIconButton iconId="codicon-arrow-small-down" label="arrow-small-down" />
                <CodIconButton iconId="codicon-arrow-small-left" label="arrow-small-left" />
                <CodIconButton iconId="codicon-arrow-small-right" label="arrow-small-right" />
                <CodIconButton iconId="codicon-arrow-small-up" label="arrow-small-up" />
                <CodIconButton iconId="codicon-arrow-up" label="arrow-up" />
                <CodIconButton iconId="codicon-bell" label="bell" />
                <CodIconButton iconId="codicon-bold" label="bold" />
                <CodIconButton iconId="codicon-book" label="book" />
                <CodIconButton iconId="codicon-bookmark" label="bookmark" />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-conditional-unverified"
                    label="debug-breakpoint-conditional-unverified"
                />
                <CodIconButton iconId="codicon-debug-breakpoint-conditional" label="debug-breakpoint-conditional" />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-conditional-disabled"
                    label="debug-breakpoint-conditional-disabled"
                />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-data-unverified"
                    label="debug-breakpoint-data-unverified"
                />
                <CodIconButton iconId="codicon-debug-breakpoint-data" label="debug-breakpoint-data" />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-data-disabled"
                    label="debug-breakpoint-data-disabled"
                />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-log-unverified"
                    label="debug-breakpoint-log-unverified"
                />
                <CodIconButton iconId="codicon-debug-breakpoint-log" label="debug-breakpoint-log" />
                <CodIconButton iconId="codicon-debug-breakpoint-log-disabled" label="debug-breakpoint-log-disabled" />
                <CodIconButton iconId="codicon-briefcase" label="briefcase" />
                <CodIconButton iconId="codicon-broadcast" label="broadcast" />
                <CodIconButton iconId="codicon-browser" label="browser" />
                <CodIconButton iconId="codicon-bug" label="bug" />
                <CodIconButton iconId="codicon-calendar" label="calendar" />
                <CodIconButton iconId="codicon-case-sensitive" label="case-sensitive" />
                <CodIconButton iconId="codicon-check" label="check" />
                <CodIconButton iconId="codicon-checklist" label="checklist" />
                <CodIconButton iconId="codicon-chevron-down" label="chevron-down" />
                <CodIconButton iconId="codicon-chevron-left" label="chevron-left" />
                <CodIconButton iconId="codicon-chevron-right" label="chevron-right" />
                <CodIconButton iconId="codicon-chevron-up" label="chevron-up" />
                <CodIconButton iconId="codicon-chrome-close" label="chrome-close" />
                <CodIconButton iconId="codicon-chrome-maximize" label="chrome-maximize" />
                <CodIconButton iconId="codicon-chrome-minimize" label="chrome-minimize" />
                <CodIconButton iconId="codicon-chrome-restore" label="chrome-restore" />
                <CodIconButton iconId="codicon-circle-outline" label="circle-outline" />
                <CodIconButton iconId="codicon-circle" label="circle" />
                <CodIconButton iconId="codicon-debug-breakpoint-unverified" label="debug-breakpoint-unverified" />
                <CodIconButton
                    iconId="codicon-terminal-decoration-incomplete"
                    label="terminal-decoration-incomplete"
                />
                <CodIconButton iconId="codicon-circle-slash" label="circle-slash" />
                <CodIconButton iconId="codicon-circuit-board" label="circuit-board" />
                <CodIconButton iconId="codicon-clear-all" label="clear-all" />
                <CodIconButton iconId="codicon-clippy" label="clippy" />
                <CodIconButton iconId="codicon-close-all" label="close-all" />
                <CodIconButton iconId="codicon-cloud-download" label="cloud-download" />
                <CodIconButton iconId="codicon-cloud-upload" label="cloud-upload" />
                <CodIconButton iconId="codicon-code" label="code" />
                <CodIconButton iconId="codicon-collapse-all" label="collapse-all" />
                <CodIconButton iconId="codicon-color-mode" label="color-mode" />
                <CodIconButton iconId="codicon-comment-discussion" label="comment-discussion" />
                <CodIconButton iconId="codicon-credit-card" label="credit-card" />
                <CodIconButton iconId="codicon-dash" label="dash" />
                <CodIconButton iconId="codicon-dashboard" label="dashboard" />
                <CodIconButton iconId="codicon-database" label="database" />
                <CodIconButton iconId="codicon-debug-continue" label="debug-continue" />
                <CodIconButton iconId="codicon-debug-disconnect" label="debug-disconnect" />
                <CodIconButton iconId="codicon-debug-pause" label="debug-pause" />
                <CodIconButton iconId="codicon-debug-restart" label="debug-restart" />
                <CodIconButton iconId="codicon-debug-start" label="debug-start" />
                <CodIconButton iconId="codicon-debug-step-into" label="debug-step-into" />
                <CodIconButton iconId="codicon-debug-step-out" label="debug-step-out" />
                <CodIconButton iconId="codicon-debug-step-over" label="debug-step-over" />
                <CodIconButton iconId="codicon-debug-stop" label="debug-stop" />
                <CodIconButton iconId="codicon-debug" label="debug" />
                <CodIconButton iconId="codicon-device-camera-video" label="device-camera-video" />
                <CodIconButton iconId="codicon-device-camera" label="device-camera" />
                <CodIconButton iconId="codicon-device-mobile" label="device-mobile" />
                <CodIconButton iconId="codicon-diff-added" label="diff-added" />
                <CodIconButton iconId="codicon-diff-ignored" label="diff-ignored" />
                <CodIconButton iconId="codicon-diff-modified" label="diff-modified" />
                <CodIconButton iconId="codicon-diff-removed" label="diff-removed" />
                <CodIconButton iconId="codicon-diff-renamed" label="diff-renamed" />
                <CodIconButton iconId="codicon-diff" label="diff" />
                <CodIconButton iconId="codicon-discard" label="discard" />
                <CodIconButton iconId="codicon-editor-layout" label="editor-layout" />
                <CodIconButton iconId="codicon-empty-window" label="empty-window" />
                <CodIconButton iconId="codicon-exclude" label="exclude" />
                <CodIconButton iconId="codicon-extensions" label="extensions" />
                <CodIconButton iconId="codicon-eye-closed" label="eye-closed" />
                <CodIconButton iconId="codicon-file-binary" label="file-binary" />
                <CodIconButton iconId="codicon-file-code" label="file-code" />
                <CodIconButton iconId="codicon-file-media" label="file-media" />
                <CodIconButton iconId="codicon-file-pdf" label="file-pdf" />
                <CodIconButton iconId="codicon-file-submodule" label="file-submodule" />
                <CodIconButton iconId="codicon-file-symlink-directory" label="file-symlink-directory" />
                <CodIconButton iconId="codicon-file-symlink-file" label="file-symlink-file" />
                <CodIconButton iconId="codicon-file-zip" label="file-zip" />
                <CodIconButton iconId="codicon-files" label="files" />
                <CodIconButton iconId="codicon-filter" label="filter" />
                <CodIconButton iconId="codicon-flame" label="flame" />
                <CodIconButton iconId="codicon-fold-down" label="fold-down" />
                <CodIconButton iconId="codicon-fold-up" label="fold-up" />
                <CodIconButton iconId="codicon-fold" label="fold" />
                <CodIconButton iconId="codicon-folder-active" label="folder-active" />
                <CodIconButton iconId="codicon-folder-opened" label="folder-opened" />
                <CodIconButton iconId="codicon-gear" label="gear" />
                <CodIconButton iconId="codicon-gift" label="gift" />
                <CodIconButton iconId="codicon-gist-secret" label="gist-secret" />
                <CodIconButton iconId="codicon-gist" label="gist" />
                <CodIconButton iconId="codicon-git-commit" label="git-commit" />
                <CodIconButton iconId="codicon-git-compare" label="git-compare" />
                <CodIconButton iconId="codicon-compare-changes" label="compare-changes" />
                <CodIconButton iconId="codicon-git-merge" label="git-merge" />
                <CodIconButton iconId="codicon-github-action" label="github-action" />
                <CodIconButton iconId="codicon-github-alt" label="github-alt" />
                <CodIconButton iconId="codicon-globe" label="globe" />
                <CodIconButton iconId="codicon-grabber" label="grabber" />
                <CodIconButton iconId="codicon-graph" label="graph" />
                <CodIconButton iconId="codicon-gripper" label="gripper" />
                <CodIconButton iconId="codicon-heart" label="heart" />
                <CodIconButton iconId="codicon-home" label="home" />
                <CodIconButton iconId="codicon-horizontal-rule" label="horizontal-rule" />
                <CodIconButton iconId="codicon-hubot" label="hubot" />
                <CodIconButton iconId="codicon-inbox" label="inbox" />
                <CodIconButton iconId="codicon-issue-reopened" label="issue-reopened" />
                <CodIconButton iconId="codicon-issues" label="issues" />
                <CodIconButton iconId="codicon-italic" label="italic" />
                <CodIconButton iconId="codicon-jersey" label="jersey" />
                <CodIconButton iconId="codicon-json" label="json" />
                <CodIconButton iconId="codicon-kebab-vertical" label="kebab-vertical" />
                <CodIconButton iconId="codicon-key" label="key" />
                <CodIconButton iconId="codicon-law" label="law" />
                <CodIconButton iconId="codicon-lightbulb-autofix" label="lightbulb-autofix" />
                <CodIconButton iconId="codicon-link-external" label="link-external" />
                <CodIconButton iconId="codicon-link" label="link" />
                <CodIconButton iconId="codicon-list-ordered" label="list-ordered" />
                <CodIconButton iconId="codicon-list-unordered" label="list-unordered" />
                <CodIconButton iconId="codicon-live-share" label="live-share" />
                <CodIconButton iconId="codicon-loading" label="loading" />
                <CodIconButton iconId="codicon-location" label="location" />
                <CodIconButton iconId="codicon-mail-read" label="mail-read" />
                <CodIconButton iconId="codicon-mail" label="mail" />
                <CodIconButton iconId="codicon-markdown" label="markdown" />
                <CodIconButton iconId="codicon-megaphone" label="megaphone" />
                <CodIconButton iconId="codicon-mention" label="mention" />
                <CodIconButton iconId="codicon-milestone" label="milestone" />
                <CodIconButton iconId="codicon-git-pull-request-milestone" label="git-pull-request-milestone" />
                <CodIconButton iconId="codicon-mortar-board" label="mortar-board" />
                <CodIconButton iconId="codicon-move" label="move" />
                <CodIconButton iconId="codicon-multiple-windows" label="multiple-windows" />
                <CodIconButton iconId="codicon-mute" label="mute" />
                <CodIconButton iconId="codicon-no-newline" label="no-newline" />
                <CodIconButton iconId="codicon-note" label="note" />
                <CodIconButton iconId="codicon-octoface" label="octoface" />
                <CodIconButton iconId="codicon-open-preview" label="open-preview" />
                <CodIconButton iconId="codicon-package" label="package" />
                <CodIconButton iconId="codicon-paintcan" label="paintcan" />
                <CodIconButton iconId="codicon-pin" label="pin" />
                <CodIconButton iconId="codicon-play" label="play" />
                <CodIconButton iconId="codicon-run" label="run" />
                <CodIconButton iconId="codicon-plug" label="plug" />
                <CodIconButton iconId="codicon-preserve-case" label="preserve-case" />
                <CodIconButton iconId="codicon-preview" label="preview" />
                <CodIconButton iconId="codicon-project" label="project" />
                <CodIconButton iconId="codicon-pulse" label="pulse" />
                <CodIconButton iconId="codicon-question" label="question" />
                <CodIconButton iconId="codicon-quote" label="quote" />
                <CodIconButton iconId="codicon-radio-tower" label="radio-tower" />
                <CodIconButton iconId="codicon-reactions" label="reactions" />
                <CodIconButton iconId="codicon-references" label="references" />
                <CodIconButton iconId="codicon-refresh" label="refresh" />
                <CodIconButton iconId="codicon-regex" label="regex" />
                <CodIconButton iconId="codicon-remote-explorer" label="remote-explorer" />
                <CodIconButton iconId="codicon-remote" label="remote" />
                <CodIconButton iconId="codicon-remove" label="remove" />
                <CodIconButton iconId="codicon-replace-all" label="replace-all" />
                <CodIconButton iconId="codicon-replace" label="replace" />
                <CodIconButton iconId="codicon-repo-clone" label="repo-clone" />
                <CodIconButton iconId="codicon-repo-force-push" label="repo-force-push" />
                <CodIconButton iconId="codicon-repo-pull" label="repo-pull" />
                <CodIconButton iconId="codicon-repo-push" label="repo-push" />
                <CodIconButton iconId="codicon-report" label="report" />
                <CodIconButton iconId="codicon-request-changes" label="request-changes" />
                <CodIconButton iconId="codicon-rocket" label="rocket" />
                <CodIconButton iconId="codicon-root-folder-opened" label="root-folder-opened" />
                <CodIconButton iconId="codicon-root-folder" label="root-folder" />
                <CodIconButton iconId="codicon-rss" label="rss" />
                <CodIconButton iconId="codicon-ruby" label="ruby" />
                <CodIconButton iconId="codicon-save-all" label="save-all" />
                <CodIconButton iconId="codicon-save-as" label="save-as" />
                <CodIconButton iconId="codicon-save" label="save" />
                <CodIconButton iconId="codicon-screen-full" label="screen-full" />
                <CodIconButton iconId="codicon-screen-normal" label="screen-normal" />
                <CodIconButton iconId="codicon-search-stop" label="search-stop" />
                <CodIconButton iconId="codicon-server" label="server" />
                <CodIconButton iconId="codicon-settings-gear" label="settings-gear" />
                <CodIconButton iconId="codicon-settings" label="settings" />
                <CodIconButton iconId="codicon-shield" label="shield" />
                <CodIconButton iconId="codicon-smiley" label="smiley" />
                <CodIconButton iconId="codicon-sort-precedence" label="sort-precedence" />
                <CodIconButton iconId="codicon-split-horizontal" label="split-horizontal" />
                <CodIconButton iconId="codicon-split-vertical" label="split-vertical" />
                <CodIconButton iconId="codicon-squirrel" label="squirrel" />
                <CodIconButton iconId="codicon-star-full" label="star-full" />
                <CodIconButton iconId="codicon-star-half" label="star-half" />
                <CodIconButton iconId="codicon-symbol-class" label="symbol-class" />
                <CodIconButton iconId="codicon-symbol-color" label="symbol-color" />
                <CodIconButton iconId="codicon-symbol-constant" label="symbol-constant" />
                <CodIconButton iconId="codicon-symbol-enum-member" label="symbol-enum-member" />
                <CodIconButton iconId="codicon-symbol-field" label="symbol-field" />
                <CodIconButton iconId="codicon-symbol-file" label="symbol-file" />
                <CodIconButton iconId="codicon-symbol-interface" label="symbol-interface" />
                <CodIconButton iconId="codicon-symbol-keyword" label="symbol-keyword" />
                <CodIconButton iconId="codicon-symbol-misc" label="symbol-misc" />
                <CodIconButton iconId="codicon-symbol-operator" label="symbol-operator" />
                <CodIconButton iconId="codicon-symbol-property" label="symbol-property" />
                <CodIconButton iconId="codicon-wrench" label="wrench" />
                <CodIconButton iconId="codicon-wrench-subaction" label="wrench-subaction" />
                <CodIconButton iconId="codicon-symbol-snippet" label="symbol-snippet" />
                <CodIconButton iconId="codicon-tasklist" label="tasklist" />
                <CodIconButton iconId="codicon-telescope" label="telescope" />
                <CodIconButton iconId="codicon-text-size" label="text-size" />
                <CodIconButton iconId="codicon-three-bars" label="three-bars" />
                <CodIconButton iconId="codicon-thumbsdown" label="thumbsdown" />
                <CodIconButton iconId="codicon-thumbsup" label="thumbsup" />
                <CodIconButton iconId="codicon-tools" label="tools" />
                <CodIconButton iconId="codicon-triangle-down" label="triangle-down" />
                <CodIconButton iconId="codicon-triangle-left" label="triangle-left" />
                <CodIconButton iconId="codicon-triangle-right" label="triangle-right" />
                <CodIconButton iconId="codicon-triangle-up" label="triangle-up" />
                <CodIconButton iconId="codicon-twitter" label="twitter" />
                <CodIconButton iconId="codicon-unfold" label="unfold" />
                <CodIconButton iconId="codicon-unlock" label="unlock" />
                <CodIconButton iconId="codicon-unmute" label="unmute" />
                <CodIconButton iconId="codicon-unverified" label="unverified" />
                <CodIconButton iconId="codicon-verified" label="verified" />
                <CodIconButton iconId="codicon-versions" label="versions" />
                <CodIconButton iconId="codicon-vm-active" label="vm-active" />
                <CodIconButton iconId="codicon-vm-outline" label="vm-outline" />
                <CodIconButton iconId="codicon-vm-running" label="vm-running" />
                <CodIconButton iconId="codicon-watch" label="watch" />
                <CodIconButton iconId="codicon-whitespace" label="whitespace" />
                <CodIconButton iconId="codicon-whole-word" label="whole-word" />
                <CodIconButton iconId="codicon-window" label="window" />
                <CodIconButton iconId="codicon-word-wrap" label="word-wrap" />
                <CodIconButton iconId="codicon-zoom-in" label="zoom-in" />
                <CodIconButton iconId="codicon-zoom-out" label="zoom-out" />
                <CodIconButton iconId="codicon-list-filter" label="list-filter" />
                <CodIconButton iconId="codicon-list-flat" label="list-flat" />
                <CodIconButton iconId="codicon-list-selection" label="list-selection" />
                <CodIconButton iconId="codicon-selection" label="selection" />
                <CodIconButton iconId="codicon-list-tree" label="list-tree" />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-function-unverified"
                    label="debug-breakpoint-function-unverified"
                />
                <CodIconButton iconId="codicon-debug-breakpoint-function" label="debug-breakpoint-function" />
                <CodIconButton
                    iconId="codicon-debug-breakpoint-function-disabled"
                    label="debug-breakpoint-function-disabled"
                />
                <CodIconButton iconId="codicon-debug-stackframe-active" label="debug-stackframe-active" />
                <CodIconButton iconId="codicon-circle-small-filled" label="circle-small-filled" />
                <CodIconButton iconId="codicon-debug-stackframe-dot" label="debug-stackframe-dot" />
                <CodIconButton iconId="codicon-terminal-decoration-mark" label="terminal-decoration-mark" />
                <CodIconButton iconId="codicon-debug-stackframe" label="debug-stackframe" />
                <CodIconButton iconId="codicon-debug-stackframe-focused" label="debug-stackframe-focused" />
                <CodIconButton iconId="codicon-debug-breakpoint-unsupported" label="debug-breakpoint-unsupported" />
                <CodIconButton iconId="codicon-symbol-string" label="symbol-string" />
                <CodIconButton iconId="codicon-debug-reverse-continue" label="debug-reverse-continue" />
                <CodIconButton iconId="codicon-debug-step-back" label="debug-step-back" />
                <CodIconButton iconId="codicon-debug-restart-frame" label="debug-restart-frame" />
                <CodIconButton iconId="codicon-debug-alt" label="debug-alt" />
                <CodIconButton iconId="codicon-call-incoming" label="call-incoming" />
                <CodIconButton iconId="codicon-call-outgoing" label="call-outgoing" />
                <CodIconButton iconId="codicon-menu" label="menu" />
                <CodIconButton iconId="codicon-expand-all" label="expand-all" />
                <CodIconButton iconId="codicon-feedback" label="feedback" />
                <CodIconButton iconId="codicon-git-pull-request-reviewer" label="git-pull-request-reviewer" />
                <CodIconButton iconId="codicon-group-by-ref-type" label="group-by-ref-type" />
                <CodIconButton iconId="codicon-ungroup-by-ref-type" label="ungroup-by-ref-type" />
                <CodIconButton iconId="codicon-account" label="account" />
                <CodIconButton iconId="codicon-git-pull-request-assignee" label="git-pull-request-assignee" />
                <CodIconButton iconId="codicon-bell-dot" label="bell-dot" />
                <CodIconButton iconId="codicon-debug-console" label="debug-console" />
                <CodIconButton iconId="codicon-library" label="library" />
                <CodIconButton iconId="codicon-output" label="output" />
                <CodIconButton iconId="codicon-run-all" label="run-all" />
                <CodIconButton iconId="codicon-sync-ignored" label="sync-ignored" />
                <CodIconButton iconId="codicon-pinned" label="pinned" />
                <CodIconButton iconId="codicon-github-inverted" label="github-inverted" />
                <CodIconButton iconId="codicon-server-process" label="server-process" />
                <CodIconButton iconId="codicon-server-environment" label="server-environment" />
                <CodIconButton iconId="codicon-pass" label="pass" />
                <CodIconButton iconId="codicon-issue-closed" label="issue-closed" />
                <CodIconButton iconId="codicon-stop-circle" label="stop-circle" />
                <CodIconButton iconId="codicon-play-circle" label="play-circle" />
                <CodIconButton iconId="codicon-record" label="record" />
                <CodIconButton iconId="codicon-debug-alt-small" label="debug-alt-small" />
                <CodIconButton iconId="codicon-vm-connect" label="vm-connect" />
                <CodIconButton iconId="codicon-cloud" label="cloud" />
                <CodIconButton iconId="codicon-merge" label="merge" />
                <CodIconButton iconId="codicon-export" label="export" />
                <CodIconButton iconId="codicon-graph-left" label="graph-left" />
                <CodIconButton iconId="codicon-magnet" label="magnet" />
                <CodIconButton iconId="codicon-notebook" label="notebook" />
                <CodIconButton iconId="codicon-redo" label="redo" />
                <CodIconButton iconId="codicon-check-all" label="check-all" />
                <CodIconButton iconId="codicon-pinned-dirty" label="pinned-dirty" />
                <CodIconButton iconId="codicon-pass-filled" label="pass-filled" />
                <CodIconButton iconId="codicon-circle-large-filled" label="circle-large-filled" />
                <CodIconButton iconId="codicon-circle-large" label="circle-large" />
                <CodIconButton iconId="codicon-circle-large-outline" label="circle-large-outline" />
                <CodIconButton iconId="codicon-combine" label="combine" />
                <CodIconButton iconId="codicon-gather" label="gather" />
                <CodIconButton iconId="codicon-table" label="table" />
                <CodIconButton iconId="codicon-variable-group" label="variable-group" />
                <CodIconButton iconId="codicon-type-hierarchy" label="type-hierarchy" />
                <CodIconButton iconId="codicon-type-hierarchy-sub" label="type-hierarchy-sub" />
                <CodIconButton iconId="codicon-type-hierarchy-super" label="type-hierarchy-super" />
                <CodIconButton iconId="codicon-git-pull-request-create" label="git-pull-request-create" />
                <CodIconButton iconId="codicon-run-above" label="run-above" />
                <CodIconButton iconId="codicon-run-below" label="run-below" />
                <CodIconButton iconId="codicon-notebook-template" label="notebook-template" />
                <CodIconButton iconId="codicon-debug-rerun" label="debug-rerun" />
                <CodIconButton iconId="codicon-workspace-trusted" label="workspace-trusted" />
                <CodIconButton iconId="codicon-workspace-untrusted" label="workspace-untrusted" />
                <CodIconButton iconId="codicon-workspace-unknown" label="workspace-unknown" />
                <CodIconButton iconId="codicon-terminal-cmd" label="terminal-cmd" />
                <CodIconButton iconId="codicon-terminal-debian" label="terminal-debian" />
                <CodIconButton iconId="codicon-terminal-linux" label="terminal-linux" />
                <CodIconButton iconId="codicon-terminal-powershell" label="terminal-powershell" />
                <CodIconButton iconId="codicon-terminal-tmux" label="terminal-tmux" />
                <CodIconButton iconId="codicon-terminal-ubuntu" label="terminal-ubuntu" />
                <CodIconButton iconId="codicon-terminal-bash" label="terminal-bash" />
                <CodIconButton iconId="codicon-arrow-swap" label="arrow-swap" />
                <CodIconButton iconId="codicon-copy" label="copy" />
                <CodIconButton iconId="codicon-person-add" label="person-add" />
                <CodIconButton iconId="codicon-filter-filled" label="filter-filled" />
                <CodIconButton iconId="codicon-wand" label="wand" />
                <CodIconButton iconId="codicon-debug-line-by-line" label="debug-line-by-line" />
                <CodIconButton iconId="codicon-inspect" label="inspect" />
                <CodIconButton iconId="codicon-layers" label="layers" />
                <CodIconButton iconId="codicon-layers-dot" label="layers-dot" />
                <CodIconButton iconId="codicon-layers-active" label="layers-active" />
                <CodIconButton iconId="codicon-compass" label="compass" />
                <CodIconButton iconId="codicon-compass-dot" label="compass-dot" />
                <CodIconButton iconId="codicon-compass-active" label="compass-active" />
                <CodIconButton iconId="codicon-azure" label="azure" />
                <CodIconButton iconId="codicon-issue-draft" label="issue-draft" />
                <CodIconButton iconId="codicon-git-pull-request-closed" label="git-pull-request-closed" />
                <CodIconButton iconId="codicon-git-pull-request-draft" label="git-pull-request-draft" />
                <CodIconButton iconId="codicon-debug-all" label="debug-all" />
                <CodIconButton iconId="codicon-debug-coverage" label="debug-coverage" />
                <CodIconButton iconId="codicon-run-errors" label="run-errors" />
                <CodIconButton iconId="codicon-folder-library" label="folder-library" />
                <CodIconButton iconId="codicon-debug-continue-small" label="debug-continue-small" />
                <CodIconButton iconId="codicon-beaker-stop" label="beaker-stop" />
                <CodIconButton iconId="codicon-graph-line" label="graph-line" />
                <CodIconButton iconId="codicon-graph-scatter" label="graph-scatter" />
                <CodIconButton iconId="codicon-pie-chart" label="pie-chart" />
                <CodIconButton iconId="codicon-bracket" label="bracket" />
                <CodIconButton iconId="codicon-bracket-dot" label="bracket-dot" />
                <CodIconButton iconId="codicon-bracket-error" label="bracket-error" />
                <CodIconButton iconId="codicon-lock-small" label="lock-small" />
                <CodIconButton iconId="codicon-azure-devops" label="azure-devops" />
                <CodIconButton iconId="codicon-verified-filled" label="verified-filled" />
                <CodIconButton iconId="codicon-newline" label="newline" />
                <CodIconButton iconId="codicon-layout" label="layout" />
                <CodIconButton iconId="codicon-layout-activitybar-left" label="layout-activitybar-left" />
                <CodIconButton iconId="codicon-layout-activitybar-right" label="layout-activitybar-right" />
                <CodIconButton iconId="codicon-layout-panel-left" label="layout-panel-left" />
                <CodIconButton iconId="codicon-layout-panel-center" label="layout-panel-center" />
                <CodIconButton iconId="codicon-layout-panel-justify" label="layout-panel-justify" />
                <CodIconButton iconId="codicon-layout-panel-right" label="layout-panel-right" />
                <CodIconButton iconId="codicon-layout-panel" label="layout-panel" />
                <CodIconButton iconId="codicon-layout-sidebar-left" label="layout-sidebar-left" />
                <CodIconButton iconId="codicon-layout-sidebar-right" label="layout-sidebar-right" />
                <CodIconButton iconId="codicon-layout-statusbar" label="layout-statusbar" />
                <CodIconButton iconId="codicon-layout-menubar" label="layout-menubar" />
                <CodIconButton iconId="codicon-layout-centered" label="layout-centered" />
                <CodIconButton iconId="codicon-target" label="target" />
                <CodIconButton iconId="codicon-indent" label="indent" />
                <CodIconButton iconId="codicon-record-small" label="record-small" />
                <CodIconButton iconId="codicon-error-small" label="error-small" />
                <CodIconButton iconId="codicon-terminal-decoration-error" label="terminal-decoration-error" />
                <CodIconButton iconId="codicon-arrow-circle-down" label="arrow-circle-down" />
                <CodIconButton iconId="codicon-arrow-circle-left" label="arrow-circle-left" />
                <CodIconButton iconId="codicon-arrow-circle-right" label="arrow-circle-right" />
                <CodIconButton iconId="codicon-arrow-circle-up" label="arrow-circle-up" />
                <CodIconButton iconId="codicon-layout-sidebar-right-off" label="layout-sidebar-right-off" />
                <CodIconButton iconId="codicon-layout-panel-off" label="layout-panel-off" />
                <CodIconButton iconId="codicon-layout-sidebar-left-off" label="layout-sidebar-left-off" />
                <CodIconButton iconId="codicon-blank" label="blank" />
                <CodIconButton iconId="codicon-heart-filled" label="heart-filled" />
                <CodIconButton iconId="codicon-map" label="map" />
                <CodIconButton iconId="codicon-map-filled" label="map-filled" />
                <CodIconButton iconId="codicon-circle-small" label="circle-small" />
                <CodIconButton iconId="codicon-bell-slash" label="bell-slash" />
                <CodIconButton iconId="codicon-bell-slash-dot" label="bell-slash-dot" />
                <CodIconButton iconId="codicon-comment-unresolved" label="comment-unresolved" />
                <CodIconButton
                    iconId="codicon-git-pull-request-go-to-changes"
                    label="git-pull-request-go-to-changes"
                />
                <CodIconButton iconId="codicon-git-pull-request-new-changes" label="git-pull-request-new-changes" />
                <CodIconButton iconId="codicon-search-fuzzy" label="search-fuzzy" />
                <CodIconButton iconId="codicon-comment-draft" label="comment-draft" />
                <CodIconButton iconId="codicon-send" label="send" />
                <CodIconButton iconId="codicon-sparkle" label="sparkle" />
                <CodIconButton iconId="codicon-insert" label="insert" />
                <CodIconButton iconId="codicon-mic" label="mic" />
                <CodIconButton iconId="codicon-thumbsdown-filled" label="thumbsdown-filled" />
                <CodIconButton iconId="codicon-thumbsup-filled" label="thumbsup-filled" />
                <CodIconButton iconId="codicon-coffee" label="coffee" />
                <CodIconButton iconId="codicon-snake" label="snake" />
                <CodIconButton iconId="codicon-game" label="game" />
                <CodIconButton iconId="codicon-vr" label="vr" />
                <CodIconButton iconId="codicon-chip" label="chip" />
                <CodIconButton iconId="codicon-piano" label="piano" />
                <CodIconButton iconId="codicon-music" label="music" />
                <CodIconButton iconId="codicon-mic-filled" label="mic-filled" />
                <CodIconButton iconId="codicon-git-fetch" label="git-fetch" />
                <CodIconButton iconId="codicon-copilot" label="copilot" />
            </IconsPage>
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

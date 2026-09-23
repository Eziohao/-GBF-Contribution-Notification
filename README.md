# -GBF-Contribution-Notification
Notify when your contribution in the current GBF raid reaches a configurable target.
# GBF Contribution Notification

A lightweight Tampermonkey userscript for **Granblue Fantasy** that sends a desktop notification when your contribution in the currently open raid reaches a configurable target.

## Features

* Monitors your contribution in the current multiplayer battle
* Lets you set the contribution target from the Tampermonkey menu
* Saves the configured target between browser sessions
* Sends only one notification per raid
* Automatically resets when entering a new raid
* Includes a notification test command
* Does not make additional network requests
* Minimal console logging

## Requirements

* Chrome or another Chromium-based browser
* [Tampermonkey](https://www.tampermonkey.net/)
* Granblue Fantasy

Supported URLs:

```text
https://game.granbluefantasy.jp/*
https://gbf.game.mbga.jp/*
```

## Installation

1. Install Tampermonkey.
2. Create a new userscript.
3. Replace the default contents with the script below.
4. Save the script.
5. Reload Granblue Fantasy.

## Userscript

```javascript
// ==UserScript==
// @name         GBF Contribution Notification
// @namespace    gbf-contribution-notification
// @version      1.0.1
// @description  Notify when your contribution in the current GBF raid reaches a configurable target.
// @match        https://game.granbluefantasy.jp/*
// @match        https://gbf.game.mbga.jp/*
// @grant        unsafeWindow
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript
```

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

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Click **[Install GBF Contribution Notification](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/gbf-contribution-notification.user.js)**
3. Click **Install** in Tampermonkey


## Usage

Open Granblue Fantasy and enter a multiplayer raid.

Click the **Tampermonkey** extension icon and select:

```text
Set contribution target (...)
```

Enter the amount of contribution you want to reach.

For example:

```text
2000000
```

or:

```text
2,000,000
```

Both formats are accepted.

Once your contribution reaches or exceeds the target, you will receive a desktop notification.

Example:

```text
GBF Contribution Target Reached

2,083,421 contribution
Target: 2,000,000
```

The notification is only sent once for each raid.

Starting a new raid automatically resets the notification state.

## Menu Commands

### Set contribution target

Changes and saves the contribution target.

The value persists after refreshing GBF or restarting the browser.

### Show current contribution target

Displays the currently configured contribution target.

### Test notification

Immediately sends a test notification.

Use this to verify that Chrome and your operating system allow Tampermonkey notifications.

## How It Works

Granblue Fantasy keeps information about the current raid participants in its page-side JavaScript state.

The script reads:

```javascript
unsafeWindow.stage?.pJsnData?.multi_raid_member_info
```

A raid member entry contains data similar to:

```javascript
{
    user_id: "...",
    nickname: "...",
    point: "...",
    rank: ...
}
```

The script identifies the current player's entry and reads:

```javascript
member.point
```

The contribution value is checked once per second.

The script does **not** send additional API requests or calculate contribution from damage.

## Console Output

Console logging is intentionally minimal.

When the script loads:

```text
[GBF Contribution] Loaded. Target: 1,000,000
```

When the target is changed:

```text
[GBF Contribution] Target set to 2,000,000
```

When the target is reached:

```text
[GBF Contribution] Target reached: 2,083,421
```

## Notes

* The GBF battle page must remain open.
* The tab does not need to remain focused.
* Desktop notifications must be allowed by your browser and operating system.
* The script relies on internal Granblue Fantasy page data rather than an official public API.
* Future GBF updates may change the internal battle data structure and require adjustments to the script.

## Disclaimer

This is an unofficial userscript and is not affiliated with Cygames or Granblue Fantasy.

Use it at your own discretion.

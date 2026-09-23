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
// ==/UserScript==

(function () {
    'use strict';

    const CHECK_INTERVAL = 1000;
    const DEFAULT_THRESHOLD = 1_000_000;

    let threshold = Number(
        GM_getValue('contributionThreshold', DEFAULT_THRESHOLD)
    );

    let currentRaidId = null;
    let notified = false;

    function formatNumber(value) {
        return Number(value).toLocaleString('en-US');
    }

    function setThreshold() {
        const input = prompt(
            'Enter contribution target:',
            String(threshold)
        );

        if (input === null)
            return;

        const value = Number(
            input.replace(/,/g, '').trim()
        );

        if (!Number.isFinite(value) || value <= 0) {
            alert('Please enter a valid number greater than 0.');
            return;
        }

        threshold = Math.floor(value);

        GM_setValue(
            'contributionThreshold',
            threshold
        );

        // Allow the newly selected threshold
        // to trigger in the current raid.
        notified = false;

        console.log(
            `[GBF Contribution] Target set to ${formatNumber(threshold)}`
        );

        alert(
            `Contribution target set to ${formatNumber(threshold)}`
        );
    }

    GM_registerMenuCommand(
        `Set contribution target (${formatNumber(threshold)})`,
        setThreshold
    );

    GM_registerMenuCommand(
        'Show current contribution target',
        () => {
            alert(
                `Current contribution target: ${formatNumber(threshold)}`
            );
        }
    );

    GM_registerMenuCommand(
        'Test notification',
        () => {
            GM_notification({
                title: 'GBF Contribution',
                text: 'Notification test successful.',
                timeout: 8000,
            });
        }
    );

    function getBattleData() {
        return unsafeWindow.stage?.pJsnData;
    }

    function getRaidId(data) {
        const id =
            data?.raid_id ??
            data?.raidId ??
            data?.battle_id;

        if (id !== undefined && id !== null)
            return String(id);

        return location.href;
    }

    function getMyUserId(data) {
        const id =
            data?.user_id ??
            data?.userId ??
            data?.player?.user_id ??
            data?.player?.userId;

        return id != null
            ? String(id)
            : null;
    }

    function findMyMember(data, members) {
        const myUserId = getMyUserId(data);

        if (myUserId) {
            const member = members.find(
                x => String(x.user_id) === myUserId
            );

            if (member)
                return member;
        }

        // Solo raid fallback.
        if (members.length === 1)
            return members[0];

        return null;
    }

    function notifyContribution(point) {
        GM_notification({
            title: 'GBF Contribution Target Reached',
            text:
                `${formatNumber(point)} contribution\n` +
                `Target: ${formatNumber(threshold)}`,
            timeout: 10000,
            tag: `gbf-contribution-${currentRaidId}`,
        });

        console.log(
            `[GBF Contribution] Target reached: ${formatNumber(point)}`
        );
    }

    function checkContribution() {
        const data = getBattleData();

        if (!data)
            return;

        const members =
            data.multi_raid_member_info;

        if (!Array.isArray(members) || members.length === 0)
            return;

        const raidId = getRaidId(data);

        // New raid -> allow notification again.
        if (raidId !== currentRaidId) {
            currentRaidId = raidId;
            notified = false;
        }

        const me = findMyMember(data, members);

        if (!me)
            return;

        const point = Number(me.point);

        if (!Number.isFinite(point))
            return;

        if (!notified && point >= threshold) {
            notified = true;
            notifyContribution(point);
        }
    }

    console.log(
        `[GBF Contribution] Loaded. Target: ${formatNumber(threshold)}`
    );

    setInterval(
        checkContribution,
        CHECK_INTERVAL
    );

})();

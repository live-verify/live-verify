// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: Apache-2.0

const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723,

    specs: [
        './tests/**/*.spec.js'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 15 Pro',
        'appium:platformVersion': process.env.IOS_VERSION || '17.0',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.APP_PATH || path.resolve(__dirname, '../build/LiveVerify.app'),
        'appium:autoAcceptAlerts': false,
        'appium:noReset': false,
        'appium:newCommandTimeout': 300,
    }],

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    // Hooks
    beforeSession: function (config, capabilities, specs) {
        console.log('Starting Appium test session...');
    },

    afterSession: function (config, capabilities, specs) {
        console.log('Appium test session complete.');
    },

    onPrepare: function (config, capabilities) {
        console.log('Preparing test environment...');
        console.log('Make sure Appium server is running: npx appium');
    }
};

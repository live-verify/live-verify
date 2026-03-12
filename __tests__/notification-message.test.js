/*
    Copyright (C) 2025-2026, Paul Hammant

    Tests for buildNotificationMessage() — the plain-text message builder
    used by OS notifications in the browser extension.
*/

const { buildNotificationMessage } = require('../apps/browser-extension/shared/notification-message.js');

describe('buildNotificationMessage', () => {

    // --- Self-verified (no authority chain) ---

    test('self-verified claim shows self-verified message', () => {
        const result = {
            success: true,
            domain: 'paulhammant.com',
            authorization: null
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Verified');
        expect(message).toContain('Verified by paulhammant.com');
        expect(message).toContain('Self-verified (no authority chain)');
    });

    test('self-verified with undefined authorization', () => {
        const result = {
            success: true,
            domain: 'example.com'
            // authorization not present at all
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Verified');
        expect(message).toContain('Self-verified (no authority chain)');
    });

    // --- Confirmed authority chain ---

    test('single authorizer with description', () => {
        const result = {
            success: true,
            domain: 'ofsi.hm-treasury.gov.uk',
            authorization: {
                authorizer: 'gov.uk',
                confirmed: true,
                checked: true,
                description: 'Oversees all official verification chains in the United Kingdom',
                chain: [
                    { authorizer: 'gov.uk', confirmed: true, description: 'Oversees all official verification chains in the United Kingdom' }
                ]
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Verified');
        expect(message).toContain('Verified by ofsi.hm-treasury.gov.uk');
        expect(message).toContain('Authorized by gov.uk (Oversees all official verification chains in the United Kingdom)');
    });

    test('multi-level authority chain with descriptions', () => {
        const result = {
            success: true,
            domain: 'meridian-national.bank.us',
            authorization: {
                authorizer: 'fdic.gov',
                confirmed: true,
                checked: true,
                description: 'Federal deposit insurance',
                chain: [
                    { authorizer: 'fdic.gov', confirmed: true, description: 'Federal deposit insurance' },
                    { authorizer: 'treasury.gov', confirmed: true, description: 'Root authority' }
                ]
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Verified');
        expect(message).toContain('Verified by meridian-national.bank.us');
        expect(message).toContain('Authorized by fdic.gov (Federal deposit insurance)');
        expect(message).toContain('← treasury.gov (Root authority)');
    });

    test('confirmed authorizer without description', () => {
        const result = {
            success: true,
            domain: 'example.com',
            authorization: {
                authorizer: 'parent.org',
                confirmed: true,
                checked: true,
                description: null,
                chain: [
                    { authorizer: 'parent.org', confirmed: true }
                ]
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(message).toContain('Authorized by parent.org');
        expect(message).not.toContain('(');
    });

    test('three-level chain', () => {
        const result = {
            success: true,
            domain: 'dept.example.gov',
            authorization: {
                authorizer: 'agency.gov',
                confirmed: true,
                checked: true,
                description: 'Agency oversight',
                chain: [
                    { authorizer: 'agency.gov', confirmed: true, description: 'Agency oversight' },
                    { authorizer: 'cabinet.gov', confirmed: true, description: 'Cabinet level' },
                    { authorizer: 'gov', confirmed: true, description: 'Root' }
                ]
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(message).toContain('Authorized by agency.gov (Agency oversight)');
        expect(message).toContain('← cabinet.gov (Cabinet level)');
        expect(message).toContain('← gov (Root)');
    });

    // --- Expired authorization ---

    test('expired authorization', () => {
        const result = {
            success: true,
            domain: 'old.example.com',
            authorization: {
                authorizer: 'parent.org',
                confirmed: false,
                checked: true,
                expired: true,
                description: null
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(message).toContain('Authorization by parent.org — expired');
    });

    test('expired authorization with successor', () => {
        const result = {
            success: true,
            domain: 'old.example.com',
            authorization: {
                authorizer: 'parent.org',
                confirmed: false,
                checked: true,
                expired: true,
                successor: 'new-parent.org'
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(message).toContain('Authorization by parent.org — expired');
        expect(message).toContain('Successor: new-parent.org');
    });

    // --- Authorization not confirmed / missing ---

    test('authorization checked but not confirmed', () => {
        const result = {
            success: false,
            status: 'NOT VERIFIED',
            domain: 'dodgy.example.com',
            authorization: {
                authorizer: 'parent.org',
                confirmed: false,
                checked: true,
                expired: false
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Not Verified');
        expect(message).toContain('Authorization by parent.org — not confirmed');
    });

    test('authorization not checked (missing)', () => {
        const result = {
            success: false,
            status: 'NOT VERIFIED',
            domain: 'sketchy.example.com',
            authorization: {
                authorizer: 'parent.org',
                confirmed: false,
                checked: false,
                expired: false
            }
        };
        const { title, message } = buildNotificationMessage(result);
        expect(message).toContain('Claims authorization by parent.org — missing');
    });

    // --- Failure cases (no authorization) ---

    test('failed verification with error', () => {
        const result = {
            success: false,
            error: 'Network timeout',
            domain: null,
            authorization: null
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Not Verified');
        expect(message).toBe('Network timeout');
    });

    test('failed verification with status', () => {
        const result = {
            success: false,
            status: 'NOT_FOUND',
            domain: 'example.com',
            authorization: null
        };
        const { title, message } = buildNotificationMessage(result);
        expect(title).toBe('Not Verified');
        expect(message).toBe('NOT_FOUND (example.com)');
    });

    test('failed verification does not show self-verified', () => {
        const result = {
            success: false,
            status: 'NOT_FOUND',
            domain: 'example.com',
            authorization: null
        };
        const { message } = buildNotificationMessage(result);
        expect(message).not.toContain('Self-verified');
    });
});

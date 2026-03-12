/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

const { extractDomainAuthority } = require('../public/domain-authority.js');

describe('extractDomainAuthority', () => {
    describe('GitHub Pages subdomain patterns', () => {
        test('should strip inauthentic edinburgh uni URL/domaion (subdomain) to show github.io', () => {
            expect(extractDomainAuthority('https://edinburgh.ac.uk--___dir.github.io/verify/abc123'))
                .toBe('github.io');
        });

        test('should strip simple GitHub Pages subdomai as no legit verification system would be utilizing GH-P or aliken', () => {
            expect(extractDomainAuthority('https://myproject.github.io/path'))
                .toBe('github.io');
        });

        test('should strip complex GitHub Pages subdomain', () => {
            expect(extractDomainAuthority('https://org-repo--branch.github.io'))
                .toBe('github.io');
        });
    });

    describe('UK academic domains (.ac.uk)', () => {
        test('should strip subdomain to show ed.ac.uk', () => {
            expect(extractDomainAuthority('https://degrees.ed.ac.uk/verify/hash123'))
                .toBe('ed.ac.uk');
        });

        test('should preserve root UK academic domain', () => {
            expect(extractDomainAuthority('https://ed.ac.uk/verify'))
                .toBe('ed.ac.uk');
        });

        test('should strip deep subdomain to show registrable domain', () => {
            expect(extractDomainAuthority('https://api.degrees.ed.ac.uk/verify'))
                .toBe('ed.ac.uk');
        });
    });

    describe('Country-code TLDs', () => {
        test('should handle Brazilian domain (.com.br)', () => {
            expect(extractDomainAuthority('https://foobar.com.br/certify'))
                .toBe('foobar.com.br');
        });

        test('should handle UK commercial domain (.co.uk)', () => {
            expect(extractDomainAuthority('https://example.co.uk/verify'))
                .toBe('example.co.uk');
        });

        test('should handle Australian domain (.com.au)', () => {
            expect(extractDomainAuthority('https://example.com.au/verify'))
                .toBe('example.com.au');
        });

        test('should strip subdomain of country-code TLD', () => {
            expect(extractDomainAuthority('https://api.example.co.uk/verify'))
                .toBe('example.co.uk');
        });
    });

    describe('Standard domains', () => {
        test('should handle simple .com domain', () => {
            expect(extractDomainAuthority('https://intertek.com/certifications/hash'))
                .toBe('intertek.com');
        });

        test('should handle .edu domain', () => {
            expect(extractDomainAuthority('https://mit.edu/degrees/verify'))
                .toBe('mit.edu');
        });

        test('should strip subdomain of standard domain', () => {
            expect(extractDomainAuthority('https://api.example.com/verify'))
                .toBe('example.com');
        });

        test('should strip www subdomain', () => {
            expect(extractDomainAuthority('https://www.example.com/verify'))
                .toBe('example.com');
        });
    });

    describe('Edge cases', () => {
        test('should handle localhost', () => {
            expect(extractDomainAuthority('http://localhost:8000/verify'))
                .toBe('localhost');
        });

        test('should handle IP address', () => {
            expect(extractDomainAuthority('http://192.168.1.1/verify'))
                .toBe('192.168.1.1');
        });

        test('should handle domain with port', () => {
            expect(extractDomainAuthority('https://example.com:8443/verify'))
                .toBe('example.com');
        });

        test('should strip deeply nested subdomain', () => {
            expect(extractDomainAuthority('https://a.b.c.d.example.com/verify'))
                .toBe('example.com');
        });

        test('should handle URL with query parameters', () => {
            expect(extractDomainAuthority('https://example.com/verify?hash=abc123'))
                .toBe('example.com');
        });

        test('should handle URL with fragment', () => {
            expect(extractDomainAuthority('https://example.com/verify#section'))
                .toBe('example.com');
        });

        test('should throw on invalid URL', () => {
            expect(() => extractDomainAuthority('not-a-valid-url'))
                .toThrow();
        });
    });

    describe('Real-world certification bodies', () => {
        test('should handle Intertek domain', () => {
            expect(extractDomainAuthority('https://intertek.com/certifications/abc123'))
                .toBe('intertek.com');
        });

        test('should strip subdomain of Intertek', () => {
            expect(extractDomainAuthority('https://certifications.intertek.com/verify/abc123'))
                .toBe('intertek.com');
        });

        test('should strip university subdomain', () => {
            expect(extractDomainAuthority('https://registrar.stanford.edu/verify'))
                .toBe('stanford.edu');
        });
    });

    describe('registrable domain emphasis (for text-selection-verify.js bolding)', () => {
        // These tests verify the psl.parse() behaviour that text-selection-verify.js
        // relies on to bold only the registrable domain within the full hostname.
        // e.g. "r." + BOLD("costa.co.uk") — not the whole hostname.
        const psl = require('psl');

        test('should extract registrable domain from subdomain.co.uk', () => {
            const parsed = psl.parse('r.costa.co.uk');
            expect(parsed.domain).toBe('costa.co.uk');
            expect(parsed.subdomain).toBe('r');
            expect(parsed.listed).toBe(true);
        });

        test('should extract registrable domain from hr.hsbc.co.uk', () => {
            const parsed = psl.parse('hr.hsbc.co.uk');
            expect(parsed.domain).toBe('hsbc.co.uk');
            expect(parsed.subdomain).toBe('hr');
            expect(parsed.listed).toBe(true);
        });

        test('should treat full github.io hostname as registrable domain', () => {
            const parsed = psl.parse('live-verify.github.io');
            expect(parsed.domain).toBe('live-verify.github.io');
            expect(parsed.subdomain).toBeNull();
            expect(parsed.listed).toBe(true);
        });

        test('should extract registrable domain from deep subdomain', () => {
            const parsed = psl.parse('api.degrees.ed.ac.uk');
            expect(parsed.domain).toBe('ed.ac.uk');
            expect(parsed.subdomain).toBe('api.degrees');
            expect(parsed.listed).toBe(true);
        });

        test('should handle simple .com with no subdomain', () => {
            const parsed = psl.parse('intertek.com');
            expect(parsed.domain).toBe('intertek.com');
            expect(parsed.subdomain).toBeNull();
            expect(parsed.listed).toBe(true);
        });

        test('should flag localhost as not listed', () => {
            const parsed = psl.parse('localhost');
            expect(parsed.domain).toBeNull();
            expect(parsed.listed).toBe(false);
        });

        test('should produce correct bold HTML for subdomain case', () => {
            const hostname = 'r.costa.co.uk';
            const parsed = psl.parse(hostname);
            const emphasisDomain = parsed.domain; // "costa.co.uk"
            const detail = `${hostname} does not verify this claim`;
            const escaped = emphasisDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const html = detail.replace(
                new RegExp(escaped),
                `<strong>${emphasisDomain}</strong>`
            );
            expect(html).toBe('r.<strong>costa.co.uk</strong> does not verify this claim');
        });

        test('should bold entire hostname when registrable domain equals hostname', () => {
            const hostname = 'intertek.com';
            const parsed = psl.parse(hostname);
            const detail = `by ${hostname}`;
            const emphasisDomain = parsed.domain;
            const escaped = emphasisDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const html = detail.replace(
                new RegExp(escaped),
                `<strong>${emphasisDomain}</strong>`
            );
            expect(html).toBe('by <strong>intertek.com</strong>');
        });

        test('should handle Brazilian ccTLD with subdomain', () => {
            const hostname = 'api.foobar.com.br';
            const parsed = psl.parse(hostname);
            const detail = `Verified by ${hostname}`;
            const emphasisDomain = parsed.domain;
            const escaped = emphasisDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const html = detail.replace(
                new RegExp(escaped),
                `<strong>${emphasisDomain}</strong>`
            );
            expect(html).toBe('Verified by api.<strong>foobar.com.br</strong>');
        });
    });

    describe('verify: to https:// conversion scenarios', () => {
        test('should handle URL after verify: conversion', () => {
            // After converting "verify:ed.ac.uk/degrees" to "https://ed.ac.uk/degrees/hash"
            expect(extractDomainAuthority('https://ed.ac.uk/degrees/abc123'))
                .toBe('ed.ac.uk');
        });

        test('should strip subdomain after verify: conversion', () => {
            // After converting "verify:degrees.ed.ac.uk" to "https://degrees.ed.ac.uk/hash"
            expect(extractDomainAuthority('https://degrees.ed.ac.uk/abc123'))
                .toBe('ed.ac.uk');
        });
    });
});

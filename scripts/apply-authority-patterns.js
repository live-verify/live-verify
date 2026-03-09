const fs = require('fs');
const path = require('path');

const USE_CASES_DIR = path.join(__dirname, '../public/use-cases');

function getPatterns(text) {
    const lowerText = text.toLowerCase();
    const patterns = new Set();

    // Check for specific strong indicators first, handling common plurals
    if (/\b(?:police|courts?|hmrc|irs|uscis|fbi|immigration|registrars?|passports?|ministr(?:y|ies)|governments?|national|statutory|law enforcement)\b/.test(lowerText)) {
        patterns.add('Sovereign');
    }

    if (/\b(?:banks?|banking|insurances?|insurers?|universit(?:y|ies)|hospitals?|doctors?|medical|notar(?:y|ies)|accredited|regulated|fca|occ|fdic|licensed|brokerages?|schools?|healthcare)\b/.test(lowerText)) {
        patterns.add('Regulated');
    }

    if (/\b(?:platforms?|firms?|compan(?:y|ies)|manufacturers?|providers?|utilit(?:y|ies)|carriers?|operators?|business(?:es)?|corporations?|hris|softwares?|logistics|retailers?|workday)\b/.test(lowerText)) {
        patterns.add('Commercial');
    }

    if (/\b(?:individuals?|peers?|personal|volunteers?|freelancers?|coach(?:es)?|referees?|recommendations?|attestations?)\b/.test(lowerText)) {
        patterns.add('Personal');
    }

    // Refinement Logic: Prioritize more specific patterns
    if (patterns.has('Regulated') && patterns.has('Commercial')) {
        // If it contains keywords that definitely imply Regulated over just Commercial
        if (/\b(?:banks?|universit|insur|hospit|doctor|school|healthcare|notar|licensed|accredited|regulated)\b/.test(lowerText)) {
            patterns.delete('Commercial');
        }
    }

    if (patterns.has('Sovereign') && patterns.has('Commercial')) {
        if (/\b(?:police|court|tax|immigration|registrar|ministr|government|statutory)\b/.test(lowerText)) {
            patterns.delete('Commercial');
        }
    }

    if (patterns.size === 0) patterns.add('Commercial');

    return Array.from(patterns).sort();
}

function getExampleTable(pattern) {
    if (pattern === 'Sovereign') {
        return `
| Field | Value |
|---|---|
| Issuer domain | \`gov.uk/verify\` |
| \`authorizedBy\` | *(self-authorized)* |
| \`authorityBasis\` | National statutory authority |
`;
    } else if (pattern === 'Regulated') {
        return `
| Field | Value |
|---|---|
| Issuer domain | \`example-bank.com/v\` |
| \`authorizedBy\` | \`fca.org.uk/register\` |
| \`authorityBasis\` | FCA-authorised deposit taker, FRN 123456 |
`;
    } else if (pattern === 'Commercial') {
        return `
| Field | Value |
|---|---|
| Issuer domain | \`checkr.com/verify\` |
| \`authorizedBy\` | \`napbs.org/accreditation\` |
| \`authorityBasis\` | NAPBS-accredited background screening provider |
`;
    } else if (pattern === 'Personal') {
        return `
| Field | Value |
|---|---|
| Issuer domain | \`personal-domain.com/refs\` |
| \`authorizedBy\` | \`refs.peerreferrals.com/v1\` |
| \`authorityBasis\` | Individual's personal peer references |
`;
    }
    return '';
}

function processFile(filename) {
    const filepath = path.join(USE_CASES_DIR, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Remove existing Authority Chain section
    const existingMatch = content.match(/\n## Authority Chain[\s\S]*?(?=\n##|$)/);
    if (existingMatch) {
        content = content.replace(existingMatch[0], '');
    }

    // Capture the text between "Issuer Types" and the next header
    let issuerText = '';
    const issuerTypesPos = content.indexOf('Issuer Types');
    if (issuerTypesPos !== -1) {
        const nextHeaderPos = content.indexOf('\n##', issuerTypesPos);
        issuerText = content.substring(issuerTypesPos, nextHeaderPos !== -1 ? nextHeaderPos : undefined);
    } else {
        // Fallback to Verification Architecture section
        const archPos = content.indexOf('## Verification Architecture');
        if (archPos !== -1) {
            const nextHeaderPos = content.indexOf('\n##', archPos + 20);
            issuerText = content.substring(archPos, nextHeaderPos !== -1 ? nextHeaderPos : undefined);
        }
    }

    const patterns = getPatterns(issuerText);

    let authorityChainSection = `\n## Authority Chain\n\n**Pattern${patterns.length > 1 ? 's' : ''}:** ${patterns.join(', ')}\n\n`;

    patterns.forEach(pattern => {
        if (pattern === 'Sovereign') {
            authorityChainSection += `Sovereign issuers are government bodies or statutory authorities. The chain typically terminates at the government root.\n\n**Primary issuer example:**\n${getExampleTable('Sovereign')}\n`;
        } else if (pattern === 'Regulated') {
            authorityChainSection += `Regulated issuers are institutions like banks or universities that operate under a government-issued license.\n\n**Primary issuer example:**\n${getExampleTable('Regulated')}\n`;
        } else if (pattern === 'Commercial') {
            authorityChainSection += `Commercial issuers are private businesses or platforms that may be self-authorized or accredited by an industry body.\n\n**Primary issuer example:**\n${getExampleTable('Commercial')}\n`;
        } else if (pattern === 'Personal') {
            authorityChainSection += `Personal issuers are individuals making personal attestations, often via a peer-referral platform.\n\n**Primary issuer example:**\n${getExampleTable('Personal')}\n`;
        }
    });

    // Insertion point: after Verification Architecture, or after Third-Party Use
    let insertionPoint = content.indexOf('## Verification Architecture');
    if (insertionPoint !== -1) {
        const nextHeader = content.indexOf('\n##', insertionPoint + 1);
        insertionPoint = (nextHeader !== -1) ? nextHeader : content.length;
    } else {
        insertionPoint = content.indexOf('## Third-Party Use');
        if (insertionPoint !== -1) {
            const nextHeader = content.indexOf('\n##', insertionPoint + 1);
            insertionPoint = (nextHeader !== -1) ? nextHeader : content.length;
        } else {
            insertionPoint = content.length;
        }
    }

    const newContent = content.slice(0, insertionPoint) + authorityChainSection + content.slice(insertionPoint);
    fs.writeFileSync(filepath, newContent, 'utf8');
}

const files = fs.readdirSync(USE_CASES_DIR).filter(f => f.endsWith('.md') && f !== 'criteria-template.md');
files.forEach(processFile);
console.log(`Processed ${files.length} files.`);

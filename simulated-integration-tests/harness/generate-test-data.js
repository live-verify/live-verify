const { normalizeText, sha256 } = require('../../public/normalize.js');
const fs = require('fs');
const path = require('path');

async function run() {
    const govMeta = {
        role: "root-authority",
        issuer: "HM Government",
        description: "Oversees all official verification chains in the United Kingdom",
        hidePathInDisplay: true
    };

    const hmicfrsMeta = {
        role: "endorser",
        issuer: "HMICFRS",
        description: "Oversees standards for all police forces in England and Wales",
        authorizedBy: "127.0.0.1:8002/authorized",
        hidePathInDisplay: true
    };

    const midsomerMeta = {
        issuer: "Midsomer Constabulary",
        description: "Police force for the county of Midsomer",
        claimType: "PoliceWarrant",
        authorizedBy: "127.0.0.1:8002/auth"
    };

    // Canonicalize
    const govMetaStr = JSON.stringify(govMeta);
    const hmicfrsMetaStr = JSON.stringify(hmicfrsMeta);
    const midsomerMetaStr = JSON.stringify(midsomerMeta);

    // Compute meta hashes
    const govMetaHash = sha256(govMetaStr);
    const hmicfrsMetaHash = sha256(hmicfrsMetaStr);
    const midsomerMetaHash = sha256(midsomerMetaStr);

    console.log(`govMetaHash: ${govMetaHash}`);
    console.log(`hmicfrsMetaHash: ${hmicfrsMetaHash}`);
    console.log(`midsomerMetaHash: ${midsomerMetaHash}`);

    // Gina's claim
    const claimLines = [
        "MIDSOMER CONSTABULARY",
        "POLICE OFFICER",
        "DETECTIVE GINA COULBY",
        "Salt: 7k3m9x2p"
    ];
    const claimText = claimLines.join('\n');
    const normalizedClaim = normalizeText(claimText);
    const claimHash = sha256(normalizedClaim);

    console.log(`claimHash: ${claimHash}`);

    // Read headshot for response payload
    const headshotBase64 = fs.readFileSync('simulated-integration-tests/fixtures/gina-headshot-small.jpg').toString('base64');
    const responsePayload = JSON.stringify({
        status: "verified",
        message: "Active Detective, Midsomer Constabulary",
        headshot: `data:image/jpeg;base64,${headshotBase64}`
    });

    // Create a seed script
    const seed = {
        [govMetaHash]: '{"status":"verified"}',
        [hmicfrsMetaHash]: '{"status":"verified"}',
        [midsomerMetaHash]: '{"status":"verified"}',
        [claimHash]: responsePayload
    };

    const data = {
        govMeta,
        hmicfrsMeta,
        midsomerMeta,
        govMetaHash,
        hmicfrsMetaHash,
        midsomerMetaHash,
        claimHash,
        claimText,
        normalizedClaim,
        seed
    };

    fs.writeFileSync('simulated-integration-tests/harness/test-data.json', JSON.stringify(data, null, 2));
}

run();
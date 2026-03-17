const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './scripts/generate-hash-entry.js',
    output: {
        filename: 'generate-hash.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false  // Keep readable for recipients
    }
};

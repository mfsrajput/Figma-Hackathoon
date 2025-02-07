const {
    withSentryConfig
} = require('@sentry/nextjs');

const moduleExports = {
    // Your existing next.js config here.
};
const sentryWebpackPluginOptions = {
    
    silent: true, // Suppresses all logs
    
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
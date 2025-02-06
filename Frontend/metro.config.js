const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname,{ server: {
    port: process.env.RN_PORT || 8081
  }
});

module.exports = withNativeWind(config, { input: './global.css' })
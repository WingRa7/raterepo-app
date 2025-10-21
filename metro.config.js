const { getDefaultConfig } = require("expo/metro-config");

// Extend the default config to include additional asset extensions if needed
module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Ensure that common image formats are included in the asset extensions
  config.resolver.assetExts.push("png", "jpg", "jpeg");

  return config;
})();

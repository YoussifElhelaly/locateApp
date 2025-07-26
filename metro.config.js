const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
    resolver: {
        assetExts: ["png", "jpg", "jpeg"],
        sourceExts: ["js", "jsx", "json", "ts", "tsx", "svg"]
    }
});
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

module.exports = withNativeWind(config, { input: "./global.css" }, wrapWithReanimatedMetroConfig,);
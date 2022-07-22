const { mergeConfig } = require('vite');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: '@storybook/web-components',
  base: './',
  core: {
    builder: "@storybook/builder-vite"
  },
  async viteFinal(config) {
    config.optimizeDeps.include = [...(config.optimizeDeps?.include ?? []), '@storybook/web-components'];
    config.optimizeDeps.exclude = [...(config.optimizeDeps?.exclude ?? []), 'lit', 'lit-html'];
    return config;
  },
};

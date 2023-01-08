'use strict';
const path = require('path');
const fs = require('fs');
const cracoPluginSvgSprite = require("craco-plugin-svg-sprite");
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    external: {
      ePub: "ePub",
    }
  },
  plugins: [
    {
      plugin: cracoPluginSvgSprite,
      options: {
        include: "src",                 // required
        compress: true,                 // option
        svgoConfig: {                   // option

        },
        spriteLoaderConfig: {           // option

        },
        svgPrefixName: ""           // option
      },
    }
  ]
};

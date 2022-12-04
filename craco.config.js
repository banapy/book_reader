'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    external:{
      ePub:"ePub",
    }
  },
};

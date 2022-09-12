const StyleDictionary = require('style-dictionary').extend({
    source: ['tokens.json'],
    platforms: {
      scss: {
        transformGroup: 'scss',
        buildPath: 'build/',
        files: [{
          destination: 'variables.scss',
          format: 'scss/variables'
        }]
      }
    }
  });
  
  StyleDictionary.buildAllPlatforms();
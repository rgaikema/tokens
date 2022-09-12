// const StyleDictionary = require('style-dictionary').extend({
//     source: ['tokens.json'],
//     platforms: {
//       scss: {
//         transformGroup: 'scss',
//         buildPath: 'build/',
//         files: [{
//           destination: 'variables.scss',
//           format: 'scss/variables',
//           options: {
//             outputReferences: true, // new setting, if true will use variable references
//           }
//         }]
//       }
//     }
//   });
  
//   StyleDictionary.buildAllPlatforms();

const StyleDictionaryPackage = require('style-dictionary');
const {createArray} = require('./fns');
const transformedFile = "tokens/transformed/output.json";
const outputFolder = "output/"

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}\n}`
  }
});

StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function(prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
    },
    transformer: function(prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'px';
    }
    });

function getStyleDictionaryConfig() {
  return {
    "source": [`${transformedFile}`,
    ],
    "format": {
      createArray
    },
    "platforms": {
      "web": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/`,
        "files": [{
          "destination": "output.json",
          "format": "createArray"
        }, {
          "destination": "output.css",
          "format": "css/variables",
          "selector": ":root"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

// ['global', 'dark', 'light'].map(function (theme) {
// ['output'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [output.json]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig());

    StyleDictionary.buildPlatform('web');

    console.log('\nEnd processing');
// })

console.log('\n==============================================');
console.log('\nBuild completed!');
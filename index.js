/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const { projects } = require('./angular.json');
const [projectName] = Object.keys(projects);
const {
  architect: {
    build: {
      options: { outputPath },
    },
  },
} = projects[projectName];
const builtHtmlPath = join(__dirname, outputPath);

module.exports.builtHtmlPath = builtHtmlPath;

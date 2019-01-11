const play = require('./play');
const fs = require('fs');

async function playCode() {
    let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    let configKeys = Object.keys(config);

    play.createAppFolder(config.appName);
    play.createPackageJson(config.appName);
    play.createServerjs(config.appName,config.mongoURL,configKeys);
    play.createApiFolder(config.appName);
    play.createControllers(config.appName,configKeys);
    play.createRoutes(config.appName,configKeys);
    play.createModel(config.appName,configKeys,config);
    console.log('Done!!!');
    process.exit(0);
}

playCode();
const play = require('./play');
const fs = require('fs');
const DIR_NAME = process.cwd() + '/';

async function playCode() {
    if(fs.existsSync('config.json', 'utf8')){
        let config = await JSON.parse(fs.readFileSync('config.json', 'utf8'));
        let configKeys = await Object.keys(config);
        if(fs.existsSync(DIR_NAME + config.appName)){
            console.log('The folder ' + config.appName + ' exists!');
            return 0;
        }
        play.createAppFolder(config.appName);
        play.createPackageJson(config.appName);
        play.createServerjs(config.appName, config.mongoURL, configKeys, config.port, config.authenticate);
        play.createApiFolder(config.appName);
        if (config.authenticate) {
            play.createAuthentication(config.appName);
        }
        play.createControllers(config.appName, configKeys);
        play.createRoutes(config.appName, configKeys, config);
        play.createModel(config.appName, configKeys, config);
        console.log('Done!!!');
        process.exit(0);
        return 1;
    } else {
        console.log('Not exists config.json file, add config.json file... Please...');
        return 0;
    }
    
}

module.exports = {
    playCode
}
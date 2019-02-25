const play = require('./play');
const fs = require('fs');
const DIR_NAME = process.cwd() + '/';

const playCode = async (destinationFolder, config) => {
    destinationFolder = DIR_NAME;
    if (fs.existsSync('config.json', 'utf8')) {
        config = await JSON.parse(fs.readFileSync('config.json', 'utf8'));
        let configKeys = await Object.keys(config);
        if (fs.existsSync(destinationFolder + config.appName)) {
            console.log('The folder ' + config.appName + ' exists!');
            return 0;
        }
        play.createAppFolder(destinationFolder, config.appName);
        play.createPackageJson(destinationFolder, config.appName);
        play.createServerjs(destinationFolder, config.appName, config.mongoURL, configKeys, config.port, config.authenticate);
        play.createApiFolder(destinationFolder, config.appName);
        if (config.authenticate) {
            play.createAuthentication(destinationFolder, config.appName);
        }
        play.createControllers(destinationFolder, config.appName, configKeys);
        play.createRoutes(destinationFolder, config.appName, configKeys, config);
        play.createModel(destinationFolder, config.appName, configKeys, config);
        play.installDependencies(destinationFolder, config.appName, function () {
            console.log(`\n\n${config.appName} REST API CREATED !`);
            console.log(`\nNext Steps: \n1. Define api in ${config.appName}/api folder.\n2. Run 'npm start' is start api\n`);
            console.log('Happy Coding... :)))');
            process.exit(0);
        });
        return 1;
    } else {
        console.log('Not exists config.json file, add config.json file... Please...');
        process.exit(0);
        return 0;
    }

}

module.exports = {
    playCode
}
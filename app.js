const os = require('os');
const fs = require('fs');
const templates = require('./templates');
const play = require('./play');

async function playCode() {
    let config = {
        "appName":"Demo",
        "mongoURL":'mongodb://Test123:Test123@ds145299.mlab.com:45299/dbtest123',
        "posts":[ "title", "author"],
        "comments":[ "body", "postId"],
    }
    var configKeys = Object.keys(config);

    play.createAppFolder(config.appName);
    play.createPackageJson(config.appName);
    play.createServerjs(config.appName,config.mongoURL,configKeys);
    play.createApiFolder(config.appName);
    play.createControllers(config.appName,configKeys);
    play.createRoutes(config.appName,configKeys);
    play.createModel(config.appName,configKeys,config);
    process.exit(0);
}

playCode();
const fs = require('fs');
const template = require('./templates');
const util = require('./util');

const createAppFolder = (destinationFolder, appName) => {
  try {
    fs.mkdirSync(destinationFolder + appName);
    console.log("Create Folder: " + appName);
  } catch (err) {
    throw new Error(err);
  }
}

const createPackageJson = (destinationFolder, appName) => {
  try {
    fs.writeFileSync(destinationFolder + appName + '/package.json',
      template.packageTemplate(appName));
    console.log('Writing package.json');
  } catch (err) {
    throw new Error(err);
  }
}

const createServerjs = (destinationFolder, appName, mongoURL, models, port, authenticate) => {
  try {
    fs.writeFileSync(destinationFolder + appName + '/server.js',
      template.serverjsTemplate(mongoURL, models, port, authenticate));
    console.log('Writing server.js');
  } catch (err) {
    throw new Error(err);
  }
}

const createApiFolder = (destinationFolder, appName) => {
  try {
    fs.mkdirSync(destinationFolder + appName + '/api');
    console.log("Create Folder: api");
    fs.mkdirSync(destinationFolder + appName + '/api/routes');
    console.log("Create Folder: routes");
    fs.mkdirSync(destinationFolder + appName + '/api/controllers');
    console.log("Create Folder: controllers");
    fs.mkdirSync(destinationFolder + appName + '/api/models');
    console.log("Create Folder: models");
  } catch (err) {
    throw new Error(err);
  }
}

const createControllers = (destinationFolder, appName, models) => {
  try {
    for (var i = 4; i < models.length; i++) {
      fs.writeFileSync(`${destinationFolder + appName + '/'}api/controllers/${models[i]}Controller.js`,
        template.controllerTemplate(models[i]));
      console.log(`Writing ${models[i]}Controller.js`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

const createRoutes = (destinationFolder, appName, models, config) => {
  try {
    fs.writeFileSync(`${destinationFolder}${appName}/api/routes/homeRoute.js`,
      template.homeRouteTemplate());
    console.log(`Writing homeRoute.js`);
    for (var i = 4; i < models.length; i++) {
      attributes = Object.keys(config[models[i]]);
      types = Object.values(config[models[i]]);
      fs.writeFileSync(`${destinationFolder + appName + '/'}api/routes/${models[i]}Route.js`,
        template.routesTemplate(models[i], attributes, types));
      console.log(`Writing ${models[i]}Route.js`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

const createModel = (destinationFolder, appName, models, config) => {
  try {
    for (var i = 4; i < models.length; i++) {
      attributes = Object.keys(config[models[i]]);
      types = Object.values(config[models[i]]);
      fs.writeFileSync(`${destinationFolder + appName + '/'}api/models/${models[i]}Model.js`,
        template.modelsTemplate(models[i], attributes, types));
      console.log(`Writing ${models[i]}Model.js`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

const createAuthentication = (destinationFolder, appName) => {
  try {
    fs.writeFileSync(`${destinationFolder}${appName}/api/routes/usersRoute.js`,
      template.userRouteTemplate());
    console.log(`Writing homeRoute.js`);
    fs.writeFileSync(`${destinationFolder}${appName}/api/models/usersModel.js`,
      template.userModelTemplate());
    console.log(`Writing homeRoute.js`);
  } catch (err) {
    throw new Error(err);
  }
}

const installDependencies = (destinationFolder, appName, callback) => {
  let command = 'npm install'
  console.log('INSTALLING DEPENDENCIES...\n');
  util.execCmd(command, destinationFolder + appName, callback);
}

module.exports = {
  createAppFolder,
  createPackageJson,
  createServerjs,
  createApiFolder,
  createControllers,
  createRoutes,
  createModel,
  createAuthentication,
  installDependencies
}
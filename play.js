const fs = require('fs');
const template = require('./templates');
const DIR_NAME = process.cwd() + '/';

const createAppFolder = (appName) => {
  try {
    fs.mkdirSync(DIR_NAME + appName);
    console.log("Create Folder: " + appName);
  } catch (err) {
    throw new Error(err);
  }
}

const createPackageJson = (appName) => {
  try{
    fs.writeFileSync(DIR_NAME+appName+'/package.json', 
      template.packageTemplate(appName));
    console.log('Writing package.json');
  }catch(err){
    throw new Error(err);
  }
}

const createServerjs = (appName,mongoURL, models) => {
  try{
    fs.writeFileSync(DIR_NAME+appName+'/server.js', 
      template.serverjsTemplate(mongoURL, models));
    console.log('Writing server.js');
  }catch(err){
    throw new Error(err);
  }
}

const createApiFolder= (appName) => {
  try{
    fs.mkdirSync(DIR_NAME+appName+'/api');
    console.log("Create Folder: api");
    fs.mkdirSync(DIR_NAME+appName+'/api/routes');
    console.log("Create Folder: routes");
    fs.mkdirSync(DIR_NAME+appName+'/api/controllers');
    console.log("Create Folder: controllers");
    fs.mkdirSync(DIR_NAME+appName+'/api/models');
    console.log("Create Folder: models");
  }catch(err){
    throw new Error(err);
  }
}

const createControllers = (appName, models) => {
  try{
    for(var i=2; i<models.length;i++){
      fs.writeFileSync(`${DIR_NAME+appName+'/'}api/controllers/${models[i]}Controller.js`,
        template.controllerTemplate(models[i]));
      console.log(`Writing ${models[i]}Controller.js`);
    }
  }catch(err){
    throw new Error(err);
  }
}

const createRoutes = (appName, models) => {
  try{
    fs.writeFileSync(`${DIR_NAME}${appName}/api/routes/homeRoute.js`,
        template.homeRouteTemplate());
    console.log(`Writing homeRoute.js`);
    for(var i=2; i<models.length;i++){
      fs.writeFileSync(`${DIR_NAME+appName+'/'}api/routes/${models[i]}Route.js`,
        template.routesTemplate(models[i]));
      console.log(`Writing ${models[i]}Route.js`);
    }
  }catch(err){
    throw new Error(err);
  }
}

const createModel = (appName, models, config) => {
  try{
    for(var i=2; i<models.length;i++){
      attributes = Object.keys(config[models[i]][0]);
      types = Object.values(config[models[i]][0]);
      fs.writeFileSync(`${DIR_NAME+appName+'/'}api/models/${models[i]}Model.js`,
        template.modelsTemplate(models[i], attributes, types));
      console.log(`Writing ${models[i]}Model.js`);
    }
  }catch(err){
    throw new Error(err);
  }
}

module.exports = {
  createAppFolder,
  createPackageJson,
  createServerjs,
  createApiFolder,
  createControllers,
  createRoutes,
  createModel
}
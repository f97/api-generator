#!/usr/bin/env node

const rapi = require('commander');
const { playCode } = require('./app');

rapi
    .version('0.0.6')
    .description('RESTful API generator using NodeJS, Express and Mongoose.')

rapi
    .command('new')
    .description('Creates A New Node.js And Express.js REST API')
    .action(() => playCode());

rapi
    .command('version')
    .description('0.0.6')

rapi.parse(process.argv);
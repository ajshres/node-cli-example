const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();
const GeneratorNPM = require('./src/generator')

const done = (...args) =>  {};

env.registerStub(GeneratorNPM, 'npm:app');

env.run('npm:app', done);
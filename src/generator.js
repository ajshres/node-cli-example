const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const fs = require('fs');
const figlet = require('figlet');
const shell = require('shelljs');
// const ansiEscapes = require('ansi-escapes');


module.exports  = class extends Generator {
    async figletPrint(text) {
        const self = this;
        return new Promise((resolve)=>{
            figlet(text,(err, data)=>{
                if(!err) {
                    self.log(chalk.hex('#39ff14')(data));
                }
                resolve();
            });
        })
    }
    async prompting() {
        const self = this;
        await this.figletPrint("BOILERPLATE");
        this.log(yosay(chalk.red('Fusemachines Boilerplate Generation Program')));
        self.answers = await self.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: 'my-app', // Default to solution folder name
        }, {
            type: 'list',
            name: 'license',
            message: 'What license should be used?',
            choices: ['UNLICENSED', 'MIT'],
            default: 'MIT',
        }, {
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to generate the project?',
            default: true,
        }
        ]);
    }
    writing() {
        const self = this;
        const answers = {
            name: "my-app",
            version: "0.0.1",
            description:"",
            author:"Fusemachines Incs"
        }
        const {name, version, description, author} = {...answers,...self.answers};
        const dir = this.destinationPath()+`/${name}`;

        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
        this.destinationRoot(dir);
        
        self.fs.copyTpl(
            `${this.templatePath()}/reactjs/**/*`,
            this.destinationPath(),
            this.answers,
        );
        self.fs.copyTpl(
            self.templatePath('_package.json'),
            self.destinationPath('package.json'),
            {name, version, description, author}
        );
        this.extendPackageJSON();
        
    }
    extendPackageJSON() {
        const pkgJson = {
            devDependencies: {
              eslint: '^3.15.0'
            }
        };
      
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    install() {
        this.yarnInstall();
    }
    end() {
        shell.exec('clear', () => {
            shell.echo('Installation is completed...')
        });
        // process.stdout.write(ansiEscapes.cursorUp(40) + ansiEscapes.cursorLeft);
        shell.echo('Installation is completed...')
    }
}
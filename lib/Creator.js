const chalk = require('chalk')
const execa = require('execa')
const inquirer = require('inquirer')
// const cloneDeep = require('lodash.clonedeep')
const getVersion = require('./utils/getLatestVersion')
const clearConsole = require('./utils/clearConsole')

const { error } = require('./utils/logger')
const { logWithSpinner, stopSpinner } = require('./utils/spinner')


module.exports = class Creator {
  
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  
  async create(cliOptions = {}) {
    const { name, context } = this
    
    await clearConsole()
    
    logWithSpinner(`✨`, `Creating project in ${chalk.yellow(context)}.`)
    await execa.shell(`git clone https://github.com/TheaZhu/template-react-webpack.git ${name}`)
    await execa.shell(`rm -rf ${name}/.git/`)
    stopSpinner()
    
    // get latest CLI version
    /*const { latest } = await getVersion()
    // generate package.json with plugin dependencies
    const pkg = {
      name,
      version: '0.1.0',
      private: true,
      devDependencies: {}
    }
    const deps = Object.keys(preset.plugins)
    deps.forEach(dep => {
      pkg.devDependencies[dep] = `^${latest}`
    })*/
    
    // intilaize git repository
    // logWithSpinner(`🗃`, `Initializing project...`)
    // write package.json
    /*await writeFileTree(context, {
      'package.json': JSON.stringify(pkg, null, 2)
    })*/
    
    // install plugins
    
    // install additional deps (injected by generators)
    logWithSpinner('📦', 'Installing dependencies...')
    execa.shell('npm install')
    stopSpinner()
    
    console.log()
    console.log(`🎉  Successfully created project ${chalk.yellow(name)}.`)
    console.log(
      `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`) +
      chalk.cyan(` ${chalk.gray('$')} npm start`)
    )
    console.log()
  }
}

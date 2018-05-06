#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const packageInfo = require('../package.json')

const requiredVersion = packageInfo.engines.node
// 检查node版本
if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `You are using Node ${process.version}, but this version of vue-cli ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  ))
  process.exit(1)
}

const program = require('commander')
const minimist = require('minimist')

program
  .version(packageInfo.version)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new web project powered by web-cli')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('m', 'Use multi-project template when is set')
  .action((name, cmd) => {
    require('../lib/create')(name, minimist(process.argv.slice(3)))
  })
  
  // .option('-p, --preset <presetName>', 'Skip prompts and use saved preset')
  // .option('-d, --default', 'Skip prompts and use default preset')
  // .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')
  // .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')
  // .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`web <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

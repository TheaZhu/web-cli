const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const rimraf = require('rimraf')
const inquirer = require('inquirer')
const Creator = require('./Creator')
const clearConsole = require('./utils/clearConsole')
const { stopSpinner } = require('./utils/spinner')

async function create(projectName, options) {
  const targetDir = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(targetDir)) {
    // 如果存在目标目录
    if (options.f || options.force) {
      rimraf.sync(targetDir)
    } else {
      await clearConsole()
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        rimraf.sync(targetDir)
      }
    }
  }
  
  const creator = new Creator(projectName, targetDir)
  await creator.create(options)
}

module.exports = (...args) => {
  create(...args).catch(err => {
    stopSpinner(false)
    console.error(chalk.red(err))
    process.exit(1)
  })
}

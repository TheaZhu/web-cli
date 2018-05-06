const chalk = require('chalk')
const semver = require('semver')
const version = require('../../package.json').version

module.exports = async function clearConsoleWithTitle(checkUpdate) {
  let title = chalk.bold.blue(`Web CLI v${version}`)
  const latest = version
  
  if (checkUpdate && semver.gt(latest, version)) {
    title += chalk.green(`
┌─────────────────────────${`─`.repeat(latest.length)}─┐
│ ✨  Update available: ${latest} ✨  │
└─────────────────────────${`─`.repeat(latest.length)}─┘`)
  }
  
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    if (title) {
      console.log(title)
    }
  }
}

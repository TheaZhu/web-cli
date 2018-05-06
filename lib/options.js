const fs = require('fs')
const os = require('os')
const path = require('path')
const { error } = require('./utils/logger')

const rcPath = exports.rcPath = (
  process.env.WEB_CLI_CONFIG_PATH ||
  path.join(os.homedir(), '.webrc')
)

exports.defaults = {
  packageManager: undefined,
  useTaobaoRegistry: undefined,
  presets: {
    'default': {
      router: false,
      vuex: false,
      useConfigFiles: false,
      cssPreprocessor: undefined,
      plugins: {}
    }
  }
}

let cachedOptions

exports.loadOptions = () => {
  if (cachedOptions) {
    return cachedOptions
  }
  if (fs.existsSync(rcPath)) {
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
    } catch (e) {
      error(
        `Error loading saved preferences: ` +
        `~/.webrc may be corrupted or have syntax errors. ` +
        `Please fix/delete it and re-run web-cli in manual mode.\n` +
        `(${e.message})`
      )
      process.exit(1)
    }
    return cachedOptions
  } else {
    return {}
  }
}

exports.saveOptions = (toSave) => {
  const options = Object.assign(cloneDeep(loadOptions()), toSave)
  for (const key in options) {
    if (!(key in exports.defaults)) {
      delete options[key]
    }
  }
  cachedOptions = options
  try {
    fs.writeFileSync(rcPath, JSON.stringify(options, null, 2))
  } catch (e) {
    error(
      `Error saving preferences: ` +
      `make sure you have write access to ${rcPath}.\n` +
      `(${e.message})`
    )
  }
}

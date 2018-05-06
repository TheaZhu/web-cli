module.exports = async function getLatestVersion () {
  let latest
  if (process.env.WEB_CLI_LATEST_VERSION) {
    // cached value
    latest = process.env.WEB_CLI_LATEST_VERSION
  } else {
    const axios = require('axios')
    const options = require('../options').loadOptions()
    const registry = options.useTaobaoRegistry
      ? `https://registry.npm.taobao.org`
      : `https://registry.npmjs.org`

    const res = await axios.get(`${registry}/web-cli-version-marker/latest`)
    if (res.status === 200) {
      latest = process.env.VUE_CLI_LATEST_VERSION = res.data.version
    } else {
      // fallback to local version
      latest = process.env.VUE_CLI_LATEST_VERSION = current
    }
  }
  return {
    latest
  }
}

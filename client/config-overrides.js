const path = require('path')
const srcDir = path.resolve(__dirname, 'src')

module.exports = function override(config) {
  // config sass/scss/css modules to transform to camelcase
  config.module.rules.forEach(data => {
    if (data.oneOf) {
      data.oneOf.forEach(configs => {
        if (
          configs.use &&
          configs.use[1].options &&
          configs.use[1].options.getLocalIdent
        ) {
          configs.use[1].options.camelCase = true
        }
      })
    }
  })

  config.resolve = {
    ...config.resolve,
    alias: {
      '@src': srcDir,
      '@components': srcDir + '/components',
      '@epics': srcDir + '/epics',
      '@reducer': srcDir + '/reducer'
    }
  }

  return config
}

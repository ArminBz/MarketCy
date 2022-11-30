// console.log('Config.REACT_APP_HOST_URL', Config.REACT_APP_HOST_URL)
// console.log('Config.TEST', Config.TEST)

import { Platform } from 'react-native'

import Config from 'react-native-config'

console.log('Config:', Config)

let disableLog = () => {
  // console.log('stuff in disableLog')

  console = {}
  console.log = () => {}
  console.error = () => {}
  console.info = () => {}
  console.dir = () => {}
  console.assert = () => {}
  console.clear = () => {}
  console.count = () => {}
  console.debug = () => {}
  console.dirxml = () => {}
  console.exception = () => {}
  console.warn = () => {}
  console.trace = () => {}
  console.groupCollapsed = () => {}
  console.timeEnd = () => {}
  console.time = () => {}
  console.msIsIndependentlyComposed = () => {}
  console.profile = () => {}
  console.profileEnd = () => {}
  console.select = () => {}
  console.table = () => {}
  console.timestamp = () => {}
  // console.disableYellowBox = () => {}

}
console.log('Config.ENV',Config.ENV)

const getHostURL = () => {
  let hostURL
  switch(Config.ENV){
    case 'local' :
      hostURL = (Platform.OS === 'ios') ? '' : ''
      break
    case 'cont' :
      hostURL = ''
      break
    case 'genymotion' :
      hostURL = ''
      break
    case 'cont_logs' :
      hostURL = ''
      break
    case 'staging' :
      // getCase(Config.ENV)
      disableLog()
      hostURL = ''
      break
    case 'staging_logs' :
      // getCase(Config.ENV)
      // disableLog()
      hostURL = ''
      break

    /**
     * LEAVE DEFAULT BE, unless necessary
     */
    default : // FOR ACTUAL APP BUILD
      // getCase(Config.ENV)
      // git test push - delete this line
      disableLog() // DONT CHANGE THIS!!!
      // hostURL = 'https://staging-api.woshapp.se'

      hostURL = ''
  }
  return hostURL
}


//const HOST_URL = 'https://v1-api-cont.woshapp.se' // continuous server
// const HOST_URL = process.env['REACT_APP_HOST_URL'] || (Platform.OS === 'ios') ? 'http://127.0.0.1:5000' : 'http://10.0.2.2:5000'
const HOST_URL = getHostURL()
console.log('\nHOST_URL:\n', HOST_URL)
let config = {
  host: HOST_URL,
  device: Platform.OS
}


module.exports = config

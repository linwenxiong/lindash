import cacheproxy from './utils/cacheProxy'
import Print from './utils/print'
var cacheModel = new cacheproxy()
var printModel = new Print()
export default {
    printModel,
    cacheModel
}
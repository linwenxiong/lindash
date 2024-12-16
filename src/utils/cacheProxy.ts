

class ProxyMult {
  cacheData: Record<string, []> = {};
  constructor() {
    this.cacheData = {}
  }
  cache(fn: Function, parms: Object) {
      // var args = Array.prototype.join.call(arguments, ',')
      var args = fn.name + JSON.stringify(parms)
      if (args in this.cacheData) {
          return this.cacheData[args]
      }
      return this.cacheData[args] = fn.apply(this, [parms])
  }
  getCache() {
    return this.cacheData
  }
}
export default ProxyMult
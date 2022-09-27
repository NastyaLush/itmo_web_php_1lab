import getKey from '../util/utili18'

export class Result{
  result;
  constructor (x,y,r) {
    this.result = this.getResult(x,y,r);
  }
  between (arg, downArg, highArg) {
    return arg >= downArg && arg <= highArg
  }

  isInSquare (x, y, r) {
    return this.between(x, -r, 0) && this.between(y, -r, 0)
  }

  isInTriangle (x, y, r) {
    return this.between(x, 0, r) && this.between(y, -(r - x), 0)
  }

  isInSector (x, y, r) {
    if (this.between(x, -r, 0)) {
      if (this.between(y, 0, Math.sqrt(r ** 2 - x ** 2))) {
        return true
      }
    }
    return false
  }

  isInShape (x, y, r) {
    return this.isInSector(x, y, r) || this.isInSquare(x, y, r) || this.isInTriangle(x, y, r)
  }

  getResult (x, y, r) {
    if (this.isInShape(x, y, r)) return getKey('reach', 'constant')
    return getKey('miss', 'constant')
  }
}

import getKey from '../util/utili18'
import { addData } from '../connection/firebase'
import { Result } from './result'

export class ValidationFromGraph {
  constructor (canvas, event) {
    this.time = new Date().toUTCString()
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    this.r = document.getElementById(getKey('r', 'constant')).value
    this.x = this.getX(x, this.r)
    this.y = this.getY(y, this.r);
    const res = new Result(this.x, this.y, this.r);
    this.result = res.result
    addData(this);

  }

  getX (x, r) {
    return( r / 130 * (x - 200)).toLocaleString(3);
  }

  getY (y, r) {
    return (r / 130 * (200 - y)).toLocaleString(3);
  }

}
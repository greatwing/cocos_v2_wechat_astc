// import HTMLCanvasElement from './HTMLCanvasElement'
import { innerWidth, innerHeight } from './WindowProperties'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

let firstCanvas = true;
export default function Canvas() {
  const canvas = firstCanvas && wx.__first__canvas ? wx.__first__canvas:wx.createCanvas();
  firstCanvas = false;

  canvas.type = 'canvas'

  // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

  const _getContext = canvas.getContext

  canvas.getBoundingClientRect = () => {
    const ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    return ret
  }

  canvas.style = {
    top: '0px',
    left: '0px',
    width: innerWidth + 'px',
    height: innerHeight + 'px',
  }

  canvas.addEventListener = function (type, listener, options = {}) {
    // console.log('canvas.addEventListener', type);
    document.addEventListener(type, listener, options);
  }

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document.removeEventListener(type, listener);
  }

  canvas.dispatchEvent = function (event = {}) {
    console.log('canvas.dispatchEvent' , event.type, event);
    // nothing to do
  }

  Object.defineProperty(canvas, 'clientWidth', {
    enumerable: true,
    get: function get() {
      return innerWidth
    }
  })

  Object.defineProperty(canvas, 'clientHeight', {
    enumerable: true,
    get: function get() {
      return innerHeight
    }
  })

  return canvas
}

;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-comment" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M870.4 770.944l-76.032 0-112.128 163.136L577.28 770.944l-423.68 0c-49.408 0-89.536-40.128-89.536-89.6L64.064 179.52c0-49.408 40.128-89.536 89.536-89.536l716.8 0c49.472 0 89.6 40.128 89.6 89.536l0 501.824C960 730.816 919.872 770.944 870.4 770.944zM257.472 358.72c-45.504 0-82.432 36.864-82.432 82.368 0 45.568 36.928 82.432 82.432 82.432s82.432-36.864 82.432-82.432C339.968 395.648 302.976 358.72 257.472 358.72zM508.352 358.72c-45.504 0-82.432 36.864-82.432 82.368 0 45.568 36.928 82.432 82.432 82.432s82.496-36.864 82.496-82.432C590.848 395.648 553.856 358.72 508.352 358.72zM759.232 358.72c-45.504 0-82.432 36.864-82.432 82.368 0 45.568 36.928 82.432 82.432 82.432s82.432-36.864 82.432-82.432C841.664 395.648 804.736 358.72 759.232 358.72z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-like" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M918.197302 217.312374C873.682459 147.758252 806.910707 106.025779 729.009476 100.461039c-108.505249-5.564739-175.277002 41.732473-214.227106 94.594425 0 0 0-2.78237-2.78237-2.78237 0 0 0 2.78237-2.78237 2.78237-38.950104-52.860928-105.72288-100.158141-214.227106-94.594425-75.118861 2.78237-144.672984 47.297212-189.187827 116.851335C41.812291 320.252885 55.723116 464.925868 141.970432 581.777203c25.039279 33.386388 52.860928 69.554122 83.464947 102.94051 75.118861 83.464947 166.930917 161.366178 264.306688 225.356584l19.475564 13.910824 2.78237 0 2.78237 0 19.475564-13.910824c97.375771-63.990407 189.187827-141.890614 264.306688-225.356584 30.604018-33.386388 58.425667-72.336492 83.464947-102.94051C968.276884 464.925868 982.187709 320.252885 918.197302 217.312374"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-fire" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 422.4c-48.64 51.2-128 110.08-128 184.32 0 74.24 56.32 135.68 128 135.68s128-61.44 128-135.68C640 532.48 560.64 476.16 512 422.4zM512 102.4C386.56 227.84 179.2 404.48 179.2 588.8s148.48 332.8 332.8 332.8 332.8-148.48 332.8-332.8S642.56 232.96 512 102.4zM512 793.6c-99.84 0-179.2-79.36-179.2-176.64 0-97.28 112.64-192 179.2-258.56 69.12 69.12 179.2 161.28 179.2 258.56C691.2 714.24 611.84 793.6 512 793.6z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-label" viewBox="0 0 1244 1024">'+
      ''+
      '<path d="M1014.4256 604.40576c0-23.10144-7.70048-42.9056-24.19712-60.50816L518.28736 73.0624c-16.49664-16.50688-39.60832-30.80192-67.11296-42.9056-28.60032-12.09344-53.90336-17.60256-77.0048-17.60256L99.15392 12.55424c-23.10144 0-42.89536 8.8064-59.40224 25.30304C23.2448 54.36416 14.44864 74.16832 14.44864 97.26976l0 273.92c0 23.10144 5.49888 49.50016 17.60256 77.0048 12.10368 28.60032 25.30304 50.60608 42.9056 67.11296L546.88768 987.2384c16.49664 16.50688 36.3008 24.19712 59.40224 24.19712 23.10144 0 42.9056-7.70048 60.50816-24.19712l323.42016-323.42016C1005.62944 647.31136 1014.4256 627.5072 1014.4256 604.40576L1014.4256 604.40576 1014.4256 604.40576zM285.06112 284.28288c-16.49664 16.50688-36.3008 24.19712-59.40224 24.19712-23.10144 0-42.9056-7.70048-59.40224-24.19712-16.50688-16.49664-24.20736-36.3008-24.20736-59.40224 0-23.10144 7.70048-42.89536 24.20736-59.40224 16.49664-16.50688 36.3008-24.20736 59.40224-24.20736 23.10144 0 42.9056 7.70048 59.40224 24.20736 16.50688 16.49664 24.19712 36.3008 24.19712 59.40224C310.36416 247.98208 301.568 267.78624 285.06112 284.28288L285.06112 284.28288 285.06112 284.28288zM1243.24864 543.90784"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)

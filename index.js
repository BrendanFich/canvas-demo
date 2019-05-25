var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')




/*自动将canvas的大小设置成窗口大小*/
autoSetCanvasSize()
function autoSetCanvasSize() {
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  setCanvasSize()
  window.onresize = setCanvasSize
}


/*初始化画板底色,必须写在autoSetCanvasSize()之后*/
context.fillStyle = 'white'
context.fillRect(0,0,canvas.width,canvas.height)


/*初始化画笔颜色，线宽，编辑状态*/
var penColor = '#4c4c4c'
var penWidth = 5
var eraserEnabled = false

/*特性检测，pc端绑touch事件，移动端绑mouse事件*/
if ('ontouchstart' in document.body) {
  listenerTouch()
} else {
  listenerMouse()
}

/*绑定画笔、橡皮按钮点击事件*/
var eraser = document.querySelector('#eraser')
var brush = document.querySelector('#brush')

eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}

function drawPoint(x,y,color,width){
  context.beginPath()
  context.fillStyle = color
  context.arc(x, y, width/2, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}
/*绘画*/
function draw(lastX, lastY, x, y, color, width) {
  if (!color) { color = penColor }
  if (!width) { width = penWidth }
  /*画点*/
  drawPoint(x,y,color,width)
  /*连线*/
  context.beginPath()
  context.strokeStyle = color
  context.moveTo(lastX, lastY)
  context.lineWidth = width
  context.lineTo(x, y)
  context.stroke()
  context.closePath()
}
/*擦除*/
function erase(lastX, lastY, x, y, width) {
  if (!width) { width = 10 }
  draw(lastX, lastY, x, y, 'white', width)
}


/*绑定鼠标事件*/
function listenerMouse() {
  var using = false
  var lastPoint = { x: undefined, y: undefined }
  /*按下鼠标*/
  canvas.onmousedown = function (e) {
    using = true
    var x = e.clientX
    var y = e.clientY
    lastPoint = { x: x, y: y }
    if (!eraserEnabled){
      drawPoint(x,y,penColor,penWidth)
    }
  }
  /*移动鼠标*/
  canvas.onmousemove = function (e) {
    var x = e.clientX
    var y = e.clientY
    var newPoint = { x: x, y: y }
    if (using) {
      if (eraserEnabled) {
        erase(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      } else {
        draw(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      }
    }
  }
  /*松开鼠标*/
  canvas.onmouseup = function (e) {
    using = false
    lastPoint = { x: undefined, y: undefined }
  }
}

/*绑定触摸事件*/
function listenerTouch() {
  var using = false
  var lastPoint = { x: undefined, y: undefined }
  /*按下手指*/
  canvas.ontouchstart = function (e) {
    using = true
    var x = e.touches[0].clientX
    var y = e.touches[0].clientY
    lastPoint = { x: x, y: y }
    if (!eraserEnabled){
      drawPoint(x,y,penColor,penWidth)
    }
  }
  /*移动手指*/
  canvas.ontouchmove = function (e) {
    var x = e.touches[0].clientX
    var y = e.touches[0].clientY
    var newPoint = { x: x, y: y }
    if (using) {
      if (eraserEnabled) {
        erase(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      } else {
        draw(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      }
    }
  }
  /*松开手指*/
  canvas.ontouchend = function (e) {
    using = false
    lastPoint = { x: undefined, y: undefined }
  }
}

/*取色模块*/
var black = document.querySelector('.black')
var red = document.querySelector('.red')
var green = document.querySelector('.green')
var blue = document.querySelector('.blue')

/*绑定取色按钮点击事件*/
black.onclick = function () {
  changeColor('#4c4c4c', black)
}
red.onclick = function () {
  changeColor('red', red)
}
green.onclick = function () {
  changeColor('green', green)
}
blue.onclick = function () {
  changeColor('blue', blue)
}

function changeColor(color, colorButton) {
  /*改变取色按钮选定状态*/
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  colorButton.classList.add('active')
  colorButton.classList.add('active')

  /*进入绘画状态，改变画笔颜色，改变画笔按钮颜色样式和大小样式*/
  eraserEnabled = false
  penColor = color
  brush.style.color = penColor
  actions.className = 'actions'

  min.style.background = penColor
  mid.style.background = penColor
  max.style.background = penColor
}

/*线宽选择模块*/
var ul = document.querySelector('.penWidth')
var min = document.querySelector('.min')
var mid = document.querySelector('.mid')
var max = document.querySelector('.max')

min.onclick = function(){
  changeWidth(5,min)
}
mid.onclick = function(){
  changeWidth(9,mid)
}
max.onclick = function(){
  changeWidth(12,max)
}

function changeWidth(width,widthButton){
  /*改变取色按钮选定状态*/
  min.classList.remove('active')
  mid.classList.remove('active')
  max.classList.remove('active')
  widthButton.classList.add('active')

  penWidth = width
}

/*全屏清除*/
var clear = document.querySelector('#clear')
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}

/*下载canvas,该方法仅PC端有效*/
var download = document.querySelector('#download')
download.onclick = function(){
  /*拿到图片的url*/
  var url = canvas.toDataURL("image/png")
  /*写一个a链接*/
  var a = document.createElement('a')
  /*传入图片的url和下载图片文件名*/
  a.href = url
  a.download = '我的作品'
  document.body.appendChild(a)
  /*主动触发*/
  a.click()
  /*触发后销除*/
  document.body.removeChild(a)
}
var mo=function(e){e.preventDefault();}

/***禁止滑动***/

function stop(){
  document.addEventListener("touchmove",mo,false);//禁止页面滑动

}
stop()

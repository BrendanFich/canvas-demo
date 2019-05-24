var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize()

/*特性检测*/
if('ontouchstart' in document.body){
  listenerTouch()
}else{
  listenerMouse()
}


var eraserEnabled = false
var eraser = document.querySelector('#eraser')
var brush = document.querySelector('#brush')

eraser.onclick = function(){
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
}


function autoSetCanvasSize(){
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  setCanvasSize()
  window.onresize = setCanvasSize
}


function draw(lastX, lastY, x, y, color,width){
  if(!color){color="black"}
  if(!width){width=2}
  context.beginPath()
  context.fillStyle = color
  context.arc(x,y,width,0,2*Math.PI)
  context.fill()
  context.closePath()

  context.beginPath()
  context.strokeStyle = color
  context.moveTo(lastX, lastY)
  context.lineWidth = width*2
  context.lineTo(x, y)
  context.stroke()
  context.closePath()
}

function erase(lastX, lastY, x, y,width){
  if(!width){width=10}
  draw(lastX, lastY, x, y, 'white',width)
}


/*绑定鼠标事件：按下鼠标，移动鼠标，松开鼠标*/
function listenerMouse(){
  
  var using = false
  var lastPoint = {x: undefined, y: undefined}

  canvas.onmousedown = function(e){
    using = true
    var x = e.clientX
    var y = e.clientY
    lastPoint = {x:x, y:y}
  }
  
  canvas.onmousemove = function(e){
    var x = e.clientX
    var y = e.clientY
    var newPoint = {x:x, y:y}
    if(using){
      if(eraserEnabled){
        erase(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      }else{
        draw(lastPoint.x,lastPoint.y, x, y)
        lastPoint = newPoint
      }
    }
  }
  
  canvas.onmouseup = function(e){
    using = false
    lastPoint = {x: undefined, y: undefined}
  }
}

/*绑定触摸事件：按下手指，移动手指，松开手指*/
function listenerTouch(){
  
  var using = false
  var lastPoint = {x: undefined, y: undefined}

  canvas.ontouchstart = function(e){
    using = true
    var x = e.touches[0].clientX
    var y = e.touches[0].clientY
    lastPoint = {x:x, y:y}
  }
  
  canvas.ontouchmove = function(e){
    var x = e.touches[0].clientX
    var y = e.touches[0].clientY
    var newPoint = {x:x, y:y}
    if(using){
      if(eraserEnabled){
        erase(lastPoint.x, lastPoint.y, x, y)
        lastPoint = newPoint
      }else{
        draw(lastPoint.x,lastPoint.y,x,y)
        lastPoint = newPoint
      }
    }
  }
  
  canvas.ontouchend = function(e){
    using = false
    lastPoint = {x: undefined, y: undefined}
  }
}

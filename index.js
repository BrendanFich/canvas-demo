var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize()
listenerMouse()

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


function drawCircle(x, y){
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x,y,2,0,2*Math.PI)
  context.fill()
  context.closePath()

}

function drawLine(lastX, lastY, nextX, nextY){
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(lastX, lastY)
  context.lineWidth = 5
  context.lineTo(nextX, nextY)
  context.stroke()
  context.closePath()
}

function listenerMouse(){
  
  var using = false
  var lastPoint = {x: undefined, y: undefined}

  canvas.onmousedown = function(e){
    using = true
    var x = e.clientX
    var y = e.clientY
    lastPoint = {x:x, y:y}
    if(eraserEnabled){
      context.clearRect(x-5,y-5,10,10)
    }else{
      drawCircle(x,y)
    }
  }
  
  canvas.onmousemove = function(e){
    var x = e.clientX
    var y = e.clientY
    var newPoint = {x:x, y:y}
    if(using){
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
      }else{
        drawCircle(x,y)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  
  canvas.onmouseup = function(e){
    using = false
    lastPoint = {x: undefined, y: undefined}
  }
}
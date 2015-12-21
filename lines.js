$(function () {
  
  var canvasHeight = parseInt($("#canvas1").attr("height"));
  var canvasWidth = parseInt($("#canvas1").attr("width"));
  var miniSquare = 6;
  var bigSquare = miniSquare*5;
  var second = bigSquare*5;
  var ecgColor = "#000"
  var baseLine = 240;
  var baseLineWidth = 2;
  
  function paintBackground(color){
    var ctx = $("#canvas1")[0].getContext("2d");
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  function curve(amplitude, duration){
    var ctx = $("#canvas1")[0].getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = baseLineWidth;
    ctx.moveTo(50, baseLine);
    ctx.quadraticCurveTo(50+(duration/2), baseLine-amplitude, 50+duration, baseLine);
    ctx.stroke();
  }
  
  
  
  function line(x, y, xx, yy, width, plus, color){
    var ctx = $("#canvas1")[0].getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(Number(x+plus), Number(y+plus));
    ctx.lineTo(Number(xx+plus), Number(yy+plus));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }
  
  function drawQuadricula(width, interval, plus, color) {
    var yPosition = 0;
    var xPosition = 0;
    while (yPosition <= canvasHeight) {
      new line(0, yPosition, canvasWidth, yPosition, width, plus, color);
      yPosition += interval;
    }
    while (xPosition <= canvasWidth) {
      new line(xPosition, 0, xPosition, canvasHeight, width, plus, color);
      xPosition += interval;
    }
  }
    
  
  function drawBaseLine(x, xx, y) {
    new line(x, y, xx, y, baseLineWidth, "", ecgColor);
  }
  
  function drawQRS(base, qrsDuration, rAmplitude, sAmplitude, freq, pDuration, pAmplitude, PR) {
    freq = (300/freq)*bigSquare;
    qrsDuration = qrsDuration - baseLineWidth;
    rAmplitude = rAmplitude - baseLineWidth;
    sAmplitude = sAmplitude - baseLineWidth;
    var xPosition = freq; 
    var ctx = $("#canvas1")[0].getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, base);
    while (xPosition < canvasWidth+freq) {
      if (xPosition == freq) {
        xPosition = freq/2
      }
      ctx.lineTo(xPosition, base);
      ctx.quadraticCurveTo(xPosition+(pDuration/2), baseLine-pAmplitude, xPosition+pDuration, baseLine);
      ctx.lineTo(xPosition+PR, base);
      xPosition += PR;
      ctx.lineTo(xPosition+(qrsDuration/3), base-rAmplitude);
      ctx.lineTo(xPosition+((qrsDuration/3)*2), base+sAmplitude);
      ctx.lineTo(xPosition+qrsDuration, base);
      xPosition += freq - PR;
    }
    ctx.strokeStyle = ecgColor;
    ctx.lineWidth = baseLineWidth;
    ctx.stroke();
    ctx.closePath()
  }
  
  function init() {
    paintBackground("#fff");
    drawQuadricula(1, miniSquare, ".5", "#3f3f3f");
    drawQuadricula(1, bigSquare, "", "#3f3f3f");
    drawQRS(baseLine, second*0.10, bigSquare, miniSquare*4, 70, miniSquare*2, miniSquare, miniSquare*3);
    //new curve(miniSquare, miniSquare*2);
    
  }
  
  init();
  
})

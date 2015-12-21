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
    
  
  function drawECG(base, qrsDuration, rAmplitude, sAmplitude, freq, pDuration, pAmplitude, PR, ST) {
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
      //p
      ctx.quadraticCurveTo(xPosition+(pDuration/2), baseLine-pAmplitude, xPosition+pDuration, baseLine);
      ctx.lineTo(xPosition+PR, base);
      xPosition += PR;
      //qrs
      ctx.lineTo(xPosition+(qrsDuration/3), base-rAmplitude);
      ctx.lineTo(xPosition+((qrsDuration/3)*2), base+sAmplitude);
      ctx.lineTo(xPosition+qrsDuration, base);
      xPosition = xPosition + ST + qrsDuration;
      ctx.lineTo(xPosition, base);
      //t
      ctx.quadraticCurveTo(xPosition+miniSquare*2, base - miniSquare*3, xPosition+miniSquare*4, base  )
      xPosition += freq - PR - ST - qrsDuration;
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
    drawECG(baseLine, second*0.10, bigSquare, miniSquare*4, 75, miniSquare*2, 
            miniSquare, miniSquare*3, miniSquare*3);
    
  }
  
  init();
  
})

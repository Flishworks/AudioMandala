var t=1; //for timing
//var beat=false;
var multiplyer=0;
var Beat=new beat();
var rotateFlag=0; //for rotate effect
var pauseFlag=0; //for pause effect
var audio;
var amplitude=0;
var drawMode=false;
var spectrum;
var amplitude;
var sound;
var quickZoomFlag=0;
var slowZoomFlag=false;
var zoomDirection;
var beatEffectorFlag=true; //toggle beatEffector

function preload(){
  sound = loadSound('soundMandala/songs/aaronguitarkick3.mp3');
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");
  background(0);
  
  fill(255,0,0);
  rect(width/2-25,height/2-25,50,50);
  noFill();
  frameRate(60);
  
  sound.loop();
  sound.amp(1);

  fft = new p5.FFT(); //fft = new FFT(in.bufferSize(), in.sampleRate());

  amplitude = new p5.Amplitude();
  Beat= new beat();
  colorScheme()//establish colors
}

function draw() {
    t++; //for timing
    
    if (beatEffectorFlag){
      beatEffector(); //switch up visuals on the beat
    }
    
    if (t>pauseFlag){ //needed for pause effect, nothjing will be drawn while paused 
     if(t%5<1){ //for performance
        colorScheme();//set colors
     }
     if((drawMode&&mouseIsPressed)||!drawMode){
      background(bgRed,bgGreen,bgBlue,bgAlpha);
     }
     spectrum = fft.analyze();
     genPattern();
    }
    
     //println("Framerate: "+frameRate());
     //println("BPM: "+Beat.BPM);
     //println("Confidence: "+Beat.timingConfidence);
     //println("Pattern: "+pattern);
     //println(rotateFlag-t);
     
    
    if (quickZoomFlag>millis()){
      quickZoom();
    }
    if (slowZoomFlag&&t%5<1){
      slowZoom();
    }
}


//********controls*********
// E - change draw mode (music-driven, random, smooth, manual)
// B - trigger a random effect
// C - change color scheme
// R - toggle reflection/rotation mode
// L - toggle line number
// P - trigger pause effect
// X - clear background
// Q/W - decrease/increase line width
// Space - turn on/off beat-triggered effects
// S - trigger slow zoom effect
// D - 
// F - fullscreen
// O - trigger circle effect
// Z - trigger Quick Zoom effect
// use the mouse at any time to take control and draw
function keyPressed() {
   if (key == 'e' || key == 'E') {
     pattern++;
   }
   if (key == 'b' || key == 'B') { //simulate beat
    beatOverride=true;
    beatEffector();
    beatOverride=false;
   }
   if (key == 'c' || key == 'C') {
     scheme=Math.floor(scheme+1);
   }
   if (key == 'r' || key == 'R') {
     reflection=!reflection;
     rotation=!rotation;
   }
   if (key == 'l' || key == 'L') {
     numLines=(numLines+1)%13;
   }
   if (key == 'p' || key == 'P') {
     pauseFlag=t+int(frameRate()*60.0/Beat.BPM);//
   }
   if (key == 'x' || key == 'X') {
      background(0);
   }
   if (key == 'w'||key == 'W') {
      midWidth++;
   }
   if (key == 'q'||key == 'Q')  {
      midWidth--;
   }
   if (key == ' '||key == ' ')  {//toggle auto-effects
      beatEffectorFlag=!beatEffectorFlag;
   }
   if (key == 's'||key == 'S')  {//toggle slowzoom
      slowZoomFlag==!slowZoomFlag;
   }
   if (key == 'd'||key == 'D')  {//small mode
      zoom=-.5;
   }
   if (key == 'f'||key == 'F')  {
    var fs = fullscreen();
    fullscreen(!fs);
   }
   if (key == 'o'||key == 'O')  {
    rotateFlag=t+int(2*frameRate()*60.0/Beat.BPM);//
   }
   if (key == 'z'||key == 'Z')  {
      quickZoomFlag=millis()+int(200*60.0/Beat.BPM);//
      zoomDirection=random(-1,1);
      if (zoomDirection<0){zoomDirection=-1;}else{zoomDirection=1;}
   } 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function slowZoom(){
    var zoomSpeed=1000; //higher number is slower
    rotate(1/zoomSpeed*PI);
    image(get(width/zoomSpeed, height/zoomSpeed,(zoomSpeed-2)*width/zoomSpeed, (zoomSpeed-2)*height/zoomSpeed),-width/2,-height/2-.5,width,height); 
}

function quickZoom(){
    var zoomSpeed=50; //higher number is slower
    //translate(width/2, height/2);
    rotate(zoomDirection*.5/zoomSpeed*PI);
    image(get(width/zoomSpeed, height/zoomSpeed,(zoomSpeed-2)*width/zoomSpeed, (zoomSpeed-2)*height/zoomSpeed),-width/2-(1/zoomSpeed)*width,-height/2-(1/zoomSpeed)*height,(1+2/zoomSpeed)*width,(1+2/zoomSpeed)*height); 
}

function loading(percent){
  console.log(percent)
  }
var scheme=0;

var lineGreen=0;
var lineBlue=0;
var lineRed=0;
var bgRed=0; //background red
var bgGreen=0; //background green
var bgBlue=0; //background blue
var bgAlpha=0;
var nucleusRed=255,nucleusGreen=0,nucleusBlue=0;
var glow=false;
var outline=false;
var tieDye=false;
function  colorScheme(){
   //if (t%2<1){ //delay for performance
      switch (scheme){
        case 0:
          numLines=4;
          midWidth=5;
          scheme+=.5;
        case .5: //aqua on grey
          glow=false;
          outline=true;
          tieDye=false;
          threeD=false;
          machine=false;
          nucleusFlag=false;
          lineWidth=wave(.8*midWidth,20,0,midWidth);
          lineRed=wave(100,5,0,155);//127*sin((millis()+666.0)/1000.0)+128;
          lineGreen=wave(50,5,PI,127);
          lineBlue=wave(100,2.5,PI,155);
          bgRed=40;
          bgGreen=40;
          bgBlue=40;
          bgAlpha=5;
          //fill(40,40,40, 5); 
        break;
        case 8:   //red over white
          outline = true;
          glow = false;
          tieDye=false;
          threeD=false;
          machine=false;
          slowZoomFlag=true;
          nucleusFlag=false;
          midWidth=5;
          lineRed=255;
          lineGreen=25;
          lineBlue=0;
          bgRed=255;
          bgGreen=255;
          bgBlue=255;
          bgAlpha=10;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          //fill(255, 10); //white
        break;  
        case 6: //pastel on black
          outline=false;
          glow=true;
          tieDye=false;
          threeD=false;
          machine=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=wave(50,.125,0,200);//50*sin(millis()/1000.0)+200;
          lineGreen=wave(50,.125,TWO_PI/3,200);//50*sin((millis()/1000.0)+TWO_PI/3)+200;
          lineBlue=wave(50,.125,2*TWO_PI/3,200);//50*sin((millis()/1000.0)+2*TWO_PI/3)+200;
          bgRed=50;
          bgGreen=50;
          bgBlue=70;
          bgAlpha=2;
          //fill(50*sin(millis()/200.0), 10); //black
        break; 
        case 3: //white on black, no fade
          glow=true;
          outline=false;
          tieDye=false;
          threeD=false;
          machine=false;
          pattern=3; //atom mode
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=255;
          lineGreen=255;
          lineBlue=255;
          bgRed=0;
          bgGreen=0;
          bgBlue=0;
          bgAlpha=50;
          //fill(0,50); 
        break; 
        case 5: //aqua and pink
          glow=false;
          outline=true;
          tieDye=false;
          threeD=false;
          machine=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineGreen=wave(128,10,0,127);
          lineBlue=230;//wave(50,1,PI,255-50);
          lineRed=wave(128,10,PI,127);
          bgRed=0;
          bgGreen=20;
          bgBlue=80;
          bgAlpha=10;
          //fill(0,20,80,10); //black, no fade
        break; 
        case 4: //white on white with outline
          glow=false;
          outline=true;
          tieDye=false;
          threeD=false;
          machine=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineGreen=255;
          lineBlue=255;//wave(50,1,PI,255-50);
          lineRed=255;
          bgRed=255;
          bgGreen=255;
          bgBlue=255;
          bgAlpha=0;
          //fill(255,0);
        break; 
        case 1: //neon
          glow=true; //true;
          outline=false;
          tieDye=false;
          threeD=false;
          machine=false;
          slowZoomFlag=false;
          nucleusFlag=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=wave(128,.125,0,127);
          lineGreen=wave(128,.125,TWO_PI/3,127);
          lineBlue=wave(128,.125,2*TWO_PI/3,127);
          bgRed=0;
          bgGreen=0;
          bgBlue=0;
          bgAlpha=0;
          //fill(0,0); //black
        break; 
        case 2: //jewel tones
          glow=false;
          outline=true;
          tieDye=false;
          threeD=false;
          lineWidth=wave(.8*midWidth,20,0,midWidth);
          lineRed=wave(50,5,0,100);//127*sin((millis()+666.0)/1000.0)+128;
          lineGreen=wave(50,5,TWO_PI/3,75);
          lineBlue=wave(50,5,2*TWO_PI/3,75);
          bgRed=0;
          bgGreen=50;
          bgBlue=0;
          bgAlpha=0;
          //fill(0,50,0, 8); //green
        break; 
        case 7://machine
          lineFreq=.1;
          bgRed=50;
          bgGreen=50;
          bgBlue=50;
          bgAlpha=0;
          glow=false;
          outline=false;
          outlineWidth=3;
          tieDye=false;
          threeD=true;
          nucleusFlag=true;
          pattern=3; //atom mode
          midWidth=6;
          scheme+=.5;
        case 7.5:
          if (t%25<1){
            background(50,50,50,10);
          }
          lineWidth=midWidth*(sin((abs(patternX)+abs(patternY))/(width/2+height/2)*PI+PI/2)+1.25);// map(abs(patternX)+abs(patternY),0,width/2,2.0,.5); //get smaller on outskirts
        //normal
          //lineRed=wave(60,1,0,95);
          //lineGreen=wave(60,1,0,95);
          //lineBlue=wave(60,1,0,95);
        //for glowing red center
          lineRed=wave(60,1,0,95)*map(abs(patternX)+abs(patternY),0,width/2,2.0,0);
          lineGreen=wave(60,1,0,95)*map(abs(patternX)+abs(patternY),0,width/2,1.25,.5);
          lineBlue=wave(60,1,0,95)*map(abs(patternX)+abs(patternY),0,width/2,1.25,.5);
          
          //fill(50*sin(millis()/6000.0)+75,25*sin((millis()+333.0)/8000.0)+230,50*sin((millis()+666.0)/7000.0)+150, 10); //petina
        break; 
        case 9: //random gen
          outline = boolean(int(random(0,2)));
          glow = boolean(int(random(0,2)));
          tieDye= boolean(int(random(0,2)));
          threeD=boolean(int(random(0,2)));
          machine=boolean(int(random(0,2)));
          slowZoomFlag=boolean(int(random(0,2)));
          nucleusFlag=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=random(255);
          lineGreen=random(255);
          lineBlue=random(255);
          bgRed=int(random(255));
          bgGreen=int(random(255));
          bgBlue=int(random(255));
          bgAlpha=int(random(10));
          scheme++;
        case 10: //random scheme
          //loop to prevent constant randomizing
        break; 
        case 11: //white background
          background(255);
          nucleusFlag=false;
          scheme=11.5;
        case 11.5: //aqua and pink tie dye
          glow=false;
          outline=false;
          tieDye=true;
          threeD=false;
          machine=false;
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineGreen=wave(128,10,0,127);
          lineBlue=230;//wave(50,1,PI,255-50);
          lineRed=wave(128,10,PI,127);
          bgRed=0;
          bgGreen=20;
          bgBlue=80;
          bgAlpha=0;
          //fill(0,20,80,10); //black, no fade
        break; 
        case 12: //drop line number to 1
          numReflect=1;
          numRotate=1;
          midWidth=100;
          scheme=12.5;
          glow=false; //true;
          outline=false;
          tieDye=true;
          threeD=false;
          machine=false;
          slowZoomFlag=true;
        case 12.5: //neon tie dye
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=wave(128,.125,0,127);
          lineGreen=wave(128,.125,TWO_PI/3,127);
          lineBlue=wave(128,.125,2*TWO_PI/3,127);
          bgRed=0;
          bgGreen=0;
          bgBlue=0;
          bgAlpha=0;
          //fill(0,0); //black
        break; 
        case 13: //block colors
          //take care of anything that doesnt need to or shouldnt repeat here
          numReflect=1;
          numRotate=12;
          midWidth=20;
          slowZoomFlag=false;
          glow=false; //true;
          outline=false;
          tieDye=false;
          threeD=false;
          machine=true;
          bgRed=0;
          bgGreen=0;
          bgBlue=0;
          bgAlpha=0;
          scheme+=.5;
        case 13.5: //3d nickelodeon
          lineWidth=wave(.8*midWidth,lineFreq,0,midWidth);
          lineRed=wave(128,.0625,0,127);
          lineGreen=wave(128,.0625,TWO_PI/3,127);//+squareWave(127,.125,0,-128);
          lineBlue=wave(128,.0625,2*TWO_PI/3,127);
          break; 
        case 14:
          scheme=0;
        break;
  }
}

function wave(amp,freq,phase,ampOffset){
  return 1.0*amp*sin(TWO_PI*1.0*t/frameRate()*freq+phase)+ampOffset;
  //return sin(TWO_PI*millis()/1000);
}

function squareWave(amp,freq,phase,ampOffset){
  var val=sin(TWO_PI*t/frameRate()*freq+phase);
  if (val>0){return amp+ampOffset;}
  else{return -1*amp+ampOffset;}
}
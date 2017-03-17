var pattern=2; //pattern generator algorithm selection
var numLines=8;
var patternX=50;
var patternY=50;
var pointZeroX=0, pointZeroY=0;
var pointOneX=0, pointOneY=0;
var pointTwoX=0, pointTwoY=0;
var pointThreeX=0, pointThreeY=0;
var interpSecondX=0, interpSecondY=0;
var i=0; //for timing
var smoothDelay=1; //how long between each draw. Bigger number makes it more jumppy, but makes line smoother
var linVariant=3;// creates interesting variants in the line when not equal to 3. 1 is crazy amount of lines, 2 creates loose ends, 3 is normal, 4 and up create breaks
var lineWidth=0; //strokeweight
var midWidth=5; //mid lineWeight
var threeD=false, machine=false, nucleusFlag=false; //flags for different effects
var lineFreq=4;
var outlineWidth=5;
var reflection=true, rotation=false; //flags for drawing mode
var orchid=false;

function genPattern(){
  i++;
  genPath();
  translate(width/2,height/2);//shift origin to middle of screen
  if (t<rotateFlag){ //for rotate effect
     rotate((rotateFlag-t)*TWO_PI/(4*frameRate()*60.0/Beat.BPM));
  } 
  if((drawMode&&mouseIsPressed)||!drawMode){ //dont continuousely draw non-moving dots
    for (var n=0;n<7;n++){ //draw line multiple times for various line effects
      if (n==0&&glow){
        //for glowing lines
        strokeWeight(lineWidth+20);
        stroke(lineRed, lineGreen, lineBlue,30); 
      }
      else if (n==1&&outline){
        //for outline
        strokeWeight(lineWidth*(1+outlineWidth/10)+outlineWidth);
        stroke(0); //black
      }
      else if(n==2&&!tieDye){
        //for main line
        strokeWeight(lineWidth);
        stroke(lineRed,lineGreen,lineBlue); //white
      }
      else if (n==4&&threeD){
            //for 3D
            var threeDRes=8
            for (var j=0;j<threeDRes;j++){
              strokeWeight(lineWidth*(threeDRes-j)/threeDRes);
              var shadowMultiplyer = sin((j/threeDRes)*PI/2);
              stroke((lineRed+100)*shadowMultiplyer, (lineGreen+100)*shadowMultiplyer, (lineBlue+100)*shadowMultiplyer); //shadow
              drawLines();
          }
          strokeWeight(lineWidth/threeDRes);
          stroke(255,wave(75,.25,0,100)); //white
      }
          /*
          else if (n==5&&threeD){
            //for 3D
            strokeWeight(lineWidth*.6);
            //shiftY(lineWidth/4);
            stroke(lineRed, lineGreen, lineBlue);
          }
          else if (n==6&&threeD){
            //for 3D
            strokeWeight(lineWidth*.4);
            //shiftY(-lineWidth/4);
            stroke(lineRed*1.5, lineGreen*1.5, lineBlue*1.5); //highlight
          }
          else if (n==7&&threeD){
            //shiftY(-lineWidth/4);
            strokeWeight(lineWidth/6);
            stroke(255,wave(75,.25,0,100)); //white
          }
          */
      else if (n==5&&glow){
        //for white glow
        strokeWeight(constrain(lineWidth-4,0,8));
        stroke(255,200); //white
      }
      else if (n==6&&tieDye){
        //for white glow
        strokeWeight(lineWidth+20);
        stroke(lineRed, lineGreen, lineBlue,20); 
      }
      //switch between reflection/rotation/
      drawLines();
    }
  }
 
 if (nucleusFlag){
    drawNucleus();
 }
 
  if (i%smoothDelay==0) {
    if (t>rotateFlag){ //dont do during rotate effect
      shiftCoordinates();
    }
  }
}

function shiftCoordinates(){ //coordinates for bezzier curve
    pointZeroX=pointOneX;
    pointZeroY=pointOneY;
    pointOneX=pointTwoX;
    pointOneY=pointTwoY;
    pointTwoX=pointThreeX;
    pointTwoY=pointThreeY;
    pointThreeX=patternX;//pointX;
    pointThreeY=patternY;//pointY; 
    interpSecondX=pointOneX+(pointOneX-pointZeroX);
    interpSecondY=pointOneY+(pointOneY-pointZeroY);
}

function shiftY(amount){
    pointZeroY+=amount;
    pointOneY+=amount;
    pointTwoY+=amount;
    pointThreeY+=amount;//pointY; 
    interpSecondY+=amount;
}

function genPath(){ //modulation schemes
  if (mouseIsPressed){
    //mouse
    patternX=mouseX-width/2;
    patternY=mouseY-height/2;
  }
  else{
    //stroke(lineRed,lineGreen,lineBlue); 
    switch (pattern){
        case 0:
        //random
        patternX=width/2*sin(millis()/400.0)+random(-50,100);
        //patternX=wave(width,.2,0,0)+random(-50,50);
        patternY=height/2*sin(millis()/633.0)+random(-100,50);
        //patternY=wave(height,.2,0,0)+random(-50,50);
        drawMode=false;
        machine=false;
       break;
       case 1:
        //draw mode
        drawMode=true;
       break;
      case 2:
        //two point spectrum
        if (spectrum[5]<spectrum[1]){
          patternX=map(spectrum[1],0,255,0,-width/2)+width/2+random(-10,10);
          patternY=map(spectrum[4],0,255,0,-height/2)+height/2+random(-10,10);
          }
         else{
          patternX=map(spectrum[7],60,220,0,width)-width/2+100*sin(millis()/400.0)+random(-50,100);//random(-amp/5,amp/5);
          patternY=map(spectrum[12],40,175,0,height)-height/2+100*sin(millis()/400.0)+random(-50,100);//random(-amp/5,amp/5);
         }
        drawMode=false;
        machine=false;
      break;
      case 3:
        //atomic
       patternX=width/2.5*sin(millis()*Beat.BPM/80000.0)*sin(millis()/1027.0)+50*sin(millis()/220.9)
        //patternX=wave(width/4,.3,0,0)
       patternY=height/2.5*sin(millis()*Beat.BPM/40000.0)*sin(millis()/533.0)+50*sin(millis()/277.0);
       // patternY=wave(height/4,.2,0,0)
       drawMode=false;
       machine=true;
        //for flower mode
        //pointOneX=0;
       // pointOneY=0;
        
        
        //sphere attempt
        //var axisAngle=PI/2;//*sin(t/(25000*sin(t/25001+PI)+75000))-PI/2;
       // var xRadius=200.0;
        //var yRadius=200.0*cos(axisAngle);//map(mouseY,height,0,0,xRadius);
       // var phase=PI/2;//*sin(t/(25000*sin(t/25000)+75000))+PI/2;//map(mouseX,0,width,0,PI);
       // var xFreq=20;
       // var yFreq=1;
       // patternX=xRadius*sin(millis()/1000*yFreq*TWO_PI+PI/2.0)*sin(millis()/1000*xFreq*TWO_PI);
       // patternY=yRadius*sin(millis()/1000*yFreq*TWO_PI);//+xRadius*sin(axisAngle)*sin(t/100*yFreq*TWO_PI+PI/2)*sin(t/100*xFreq*TWO_PI+PI/2);
      break;
      case 4:
        pattern=0;
      break;
      
    /*  
    
    case 1:
        var cutoff=0;
        //split spectrum averaging
        cutoff=4+(millis()%500/100); //tune to center frequency for best spread. on a rotating basis for more variation
        patternX=0;
        for (var k=spectrum.legnth-50; k>cutoff; k=k-10){
        patternX+=spectrum[k]*2;
        }
    
        patternY=0;
        for (var k=2; k<cutoff; k++){
        patternY+=spectrum[k]*4;
        }
        break;

      case 3:  
        //channel level. doesnt work if mono.
        patternX=in.left.level()*width;
        patternY=height/4+in.right.level()*height;
        break;
      case 4:  
        //random two point spectrum
        patternX=fft.getBand(int(random(513)))*width/2;
        patternY=fft.getBand(int(random(513)))*height/2;
        break;
      case 5:
        //two point spectrum
        patternX=fft.getBand(2*fft.specSize()/3)*20;
        patternY=fft.getBand(5)*20;
        break;
      case 6:
        patternX=0;
        patternY=0;

        var height3 = height/3;
        for(var i = 0; i < fft.specSize(); i++)
        {
            line(i*2, height, i*2, height - fft.getBand(i)*10);
        }
         break;
       case 7:
        patternX=0;
        patternY=0;
        for(var i = 0; i < 1023; i++)
        {
            line(i, in.mix.get(i)*height+height/2, i+1, in.mix.get(i+1)*height+height/2);
        }
         break;
       case 8:
        patternX=0;
        patternY=0;
        for(var i = 0; i < 1023; i++)
        {
            line(in.left.get(i)*width+width/2, in.right.get(i)*height+height/2, in.left.get(i+1)*width+width/2, in.right.get(i+1)*height+height/2);
        }
         break; */
   }
 }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function drawLines(){
  if (reflection){
    if(machine){    
      if (orchid){
            line(pointThreeY, pointThreeX,  patternY, patternX);
            line(-pointThreeY, pointThreeX, -patternY, patternX);
            line(pointThreeX, -pointThreeY,  patternX, -patternY);
            line(-pointThreeX, -pointThreeY,  -patternX, -patternY);
      }
      else{
        for (var k=0;k<numLines;k++){
           
           line(pointThreeX, pointThreeY,  patternX, patternY);
           line(-pointThreeX, pointThreeY,  -patternX, patternY);
           rotate(TWO_PI/numLines);
         }
        }
      }
      else{ //bezier
        if (i%(linVariant*smoothDelay)==0) {
           if (orchid){
            bezier(pointOneY, pointOneX, interpSecondY, interpSecondX,  pointThreeY, pointThreeX,  patternY, patternX);
            bezier(-pointOneY, pointOneX, -interpSecondY, interpSecondX,  -pointThreeY, pointThreeX, -patternY, patternX);
            bezier(pointOneX, -pointOneY, interpSecondX, -interpSecondY,  pointThreeX, -pointThreeY,  patternX, -patternY);
            bezier(-pointOneX, -pointOneY, -interpSecondX, -interpSecondY, -pointThreeX, -pointThreeY,  -patternX, -patternY);
           }
           else{
             for (var k=0;k<numLines;k++){
               rotate(TWO_PI/numLines);
               bezier(pointOneX, pointOneY, interpSecondX, interpSecondY,  pointThreeX, pointThreeY,  patternX, patternY);
               bezier(-pointOneX, pointOneY, -interpSecondX, interpSecondY,  -pointThreeX, pointThreeY,  -patternX, patternY);
             }
           }
        } 
      }
    }
    else if (rotation){
        if (!machine){
         if (i%(linVariant*smoothDelay)==0) {
           for (var k=0;k<numLines;k++){
             rotate(TWO_PI/numLines);
             bezier(pointOneX, pointOneY, interpSecondX, interpSecondY,  pointThreeX, pointThreeY,  patternX, patternY);
           }
         }
       }  
       else if (machine){
         for (var k=0;k<numLines;k++){
             rotate(TWO_PI/numLines);
             line(pointThreeX, pointThreeY,patternX,patternY);
           }
       }
   }
}  

function drawNucleus(){
    var res=10;
    //strokeWeight(2);
    //fill(0);
    noStroke();
    //stroke(50);
   // ellipse(0,2,100,100);
    for (var i=1; i<res; i++){
      fill(250*sin(i/res*PI),220*sin(i/res*PI),220*sin(i/res*PI));
      ellipse(0,-1,120-i*20/res,120-i*20/res);
      fill(120*sin(i/res*PI),100*sin(i/res*PI),100*sin(i/res*PI));
      ellipse(0,1,120-i*20/res,120-i*20/res);
    }
    fill(0);
    ellipse(0,0,100,100);
    res=30;
    
    var breathe=(.25*sin(t/100*PI)+.75);
    for (var i=1; i<res; i++){
      fill(nucleusRed+i*255/res,nucleusGreen+i*255/res,nucleusBlue+i*255/res,i*255/res);
      ellipse(0,0,breathe*100-breathe*i*100/res,breathe*100-breathe*i*100/res);
    }
    fill(255,230,230,150);
    ellipse(20,-30,10,10);
    ellipse(10,-30,5,5);
    noFill();
    
}

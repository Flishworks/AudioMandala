var pattern=2; //pattern generator algorithm selection
var numLines=4; //changes the amount of lines to draw. 1=1, 2=2, 3=4, 4=8, 0=orchidstyle
var patternX=50;
var patternY=50;
var pointZeroX=0;
var pointZeroY=0;
var pointOneX=0;
var pointOneY=0;
var pointTwoX=0;
var pointTwoY=0;
var pointThreeX=0;
var pointThreeY=0;
var interpSecondX=0;
var interpSecondY=0;
var i=0; //for timing
var smoothDelay=1; //how long between each draw. Bigger number makes it more jumppy, but makes line smoother
var linVariant=3;// creates interesting variants in the line when not equal to 3. 1 is crazy amount of lines, 2 creates loose ends, 3 is normal, 4 and up create breaks
var lineWidth=0; //strokeweight
var midWidth=5; //mid lineWeight
var threeD=false;
var machine=false; //straight lines for machine mode

function genPattern(){
  i++;
  genPath();

  lineWidth=int(wave(.8*midWidth,4,0,midWidth));
  //lineWidth=lineWidth+wave(4,4,0,0)
  //strokeWeight(lineWidth);
   
  if (i%(linVariant*smoothDelay)==0) { //for line effect. 
    translate(width/2,height/2);
    scale(1+zoom);
    if (t<rotateFlag){ //for rotate effect
      rotate((rotateFlag-t)*TWO_PI/(4*frameRate()*60.0/Beat.BPM));
    } 
    if((drawMode&&mouseIsPressed)||!drawMode){ //dont continuoousely draw non-moving dots
      for (var n=0;n<10;n++){ //draw line multiple times for outlining effects
        if (n==0&&glow){
          //for glowing lines
          strokeWeight(lineWidth+20);
          stroke(lineRed, lineGreen, lineBlue,30); 
        }
        else if (n==1&&outline){
          //for outline
          strokeWeight(lineWidth*1.6+4);
          stroke(0); //black
        }
        else if(n==2&&!tieDye){
          //for main line
          strokeWeight(lineWidth);
          stroke(lineRed,lineGreen,lineBlue); //white
        }
        else if (n==4&&threeD){
              //for 3D
              strokeWeight(lineWidth);
              //shiftY(lineWidth/4);
              stroke(lineRed/1.5, lineGreen/1.5, lineBlue/1.5); //shadow
            }
            else if (n==5&&threeD){
              //for 3D
              strokeWeight(lineWidth*.6);
              //shiftY(lineWidth/4);
              stroke(lineRed, lineGreen, lineBlue); //shadow
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
        else if (n==8&&glow){
          //for white glow
          strokeWeight(constrain(lineWidth-4,0,8));
          stroke(255,200); //white
        }
        else if (n==9&&tieDye){
          //for white glow
          strokeWeight(lineWidth+20);
          stroke(lineRed, lineGreen, lineBlue,20); 
        }
        if(!machine){//for machine mode 
            switch (numLines){
              case 4:
                //8 lines
                bezier(pointOneY, pointOneX, interpSecondY, interpSecondX,  pointThreeY, pointThreeX,  patternY, patternX);
                bezier(-pointOneY, pointOneX, -interpSecondY, interpSecondX,  -pointThreeY, pointThreeX, -patternY, patternX);
                bezier(pointOneY, -pointOneX, interpSecondY, -interpSecondX,  pointThreeY, -pointThreeX,  patternY, -patternX);
                bezier(-pointOneY, -pointOneX, -interpSecondY, -interpSecondX, -pointThreeY, -pointThreeX,  -patternY, -patternX);
              
              
              case 3:
              //4 lines
                bezier(pointOneX, -pointOneY, interpSecondX, -interpSecondY,  pointThreeX, -pointThreeY,  patternX, -patternY);
                bezier(-pointOneX, -pointOneY, -interpSecondX, -interpSecondY, -pointThreeX, -pointThreeY,  -patternX, -patternY);
                //purposely no break so it continues to draw all other lines
              case 2:
               //2 lines
                bezier(-pointOneX, pointOneY, -interpSecondX, interpSecondY,  -pointThreeX, pointThreeY,  -patternX, patternY);
                //purposely no break so it continues to draw all other lines
              case 1:
                bezier(pointOneX, pointOneY, interpSecondX, interpSecondY,  pointThreeX, pointThreeY,  patternX, patternY);
              break;
              case 0:
                //orchid mode
                 bezier(pointOneY, pointOneX, interpSecondY, interpSecondX,  pointThreeY, pointThreeX,  patternY, patternX);
                bezier(-pointOneY, pointOneX, -interpSecondY, interpSecondX,  -pointThreeY, pointThreeX, -patternY, patternX);
                 bezier(pointOneX, -pointOneY, interpSecondX, -interpSecondY,  pointThreeX, -pointThreeY,  patternX, -patternY);
                bezier(-pointOneX, -pointOneY, -interpSecondX, -interpSecondY, -pointThreeX, -pointThreeY,  -patternX, -patternY);
              break;
             }
          }
          else{//for machine mode 
            switch (numLines){
              case 4:
                //8 lines
                line(pointOneY, pointOneX, interpSecondY, interpSecondX);
                line(interpSecondY, interpSecondX,pointThreeY, pointThreeX);
                line(pointThreeY, pointThreeX,  patternY, patternX);
                
                line(-pointOneY, pointOneX, -interpSecondY, interpSecondX);
                line(-interpSecondY, interpSecondX,-pointThreeY, pointThreeX);
                line(-pointThreeY, pointThreeX, -patternY, patternX);
                
                line(pointOneY, -pointOneX, interpSecondY, -interpSecondX);
                line(interpSecondY, -interpSecondX,pointThreeY, -pointThreeX);
                line(pointThreeY, -pointThreeX,  patternY, -patternX);
                
                line(-pointOneY, -pointOneX, -interpSecondY, -interpSecondX);
                line(-interpSecondY, -interpSecondX,-pointThreeY, -pointThreeX);
                line(-pointThreeY, -pointThreeX,  -patternY, -patternX);
              case 3:
              //4 lines
                line(pointOneX, -pointOneY, interpSecondX, -interpSecondY);
                line(interpSecondX, -interpSecondY,pointThreeX, -pointThreeY);
                line(pointThreeX, -pointThreeY,  patternX, -patternY);
                
                line(-pointOneX, -pointOneY, -interpSecondX, -interpSecondY);
                line(-interpSecondX, -interpSecondY,-pointThreeX, -pointThreeY);
                line(-pointThreeX, -pointThreeY,  -patternX, -patternY);
                //purposely no break so it continues to draw all other lines
              case 2:
               //2 lines
               line(-pointOneX, pointOneY, -interpSecondX, interpSecondY);
               line(-pointOneX, pointOneY,-pointThreeX, pointThreeY);
               line(-pointThreeX, pointThreeY,  -patternX, patternY);
                //purposely no break so it continues to draw all other lines
              case 1:
                line(pointOneX, pointOneY, interpSecondX, interpSecondY);
                line(pointOneX, pointOneY, pointThreeX, pointThreeY);
                line(pointThreeX, pointThreeY,  patternX, patternY);
              break;
              case 0:
                //orchid mode
                line(pointOneY, pointOneX, interpSecondY, interpSecondX);
                line(interpSecondY, interpSecondX,pointThreeY, pointThreeX);
                line(pointThreeY, pointThreeX,  patternY, patternX);
                
                line(-pointOneY, pointOneX, -interpSecondY, interpSecondX);
                line(-interpSecondY, interpSecondX,-pointThreeY, pointThreeX);
                line(-pointThreeY, pointThreeX, -patternY, patternX);
                
                line(pointOneX, -pointOneY, interpSecondX, -interpSecondY);
                line(interpSecondX, -interpSecondY,pointThreeX, -pointThreeY);
                line(pointThreeX, -pointThreeY,  patternX, -patternY);
                
                line(-pointOneX, -pointOneY, -interpSecondX, -interpSecondY);
                line(-pointOneX, -pointOneY, -pointThreeX, -pointThreeY);
                line(-pointThreeX, -pointThreeY,  -patternX, -patternY);
              break;
             }
          }
      }
    }
  }
//  
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

function genPath(){
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
          patternX=map(spectrum[7],60,220,0,width)-width/2+random(-amp/5,amp/5);
          patternY=map(spectrum[60],40,175,0,height)-height/2+random(-amp/5,amp/5);
         }
        drawMode=false;
      break;
      case 3:
        //two point spectrum
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

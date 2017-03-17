var lineFlag=0; //for line count effect
var effect=0; // to cycle through effects
var beatOverride=false; //for testing
function beatEffector(){ //generates effects on beat
    if((Beat.detect()&&Beat.timingConfidence>.90)||beatOverride){ //mix it up on the beat
       //varyPattern();
       switch(effect){
        case 0:
          rotateFlag=t+int(2*frameRate()*60/Beat.BPM);//
          effect++;
        break;
        case 1:
          numLines++;
          effect++;
          rotation=!rotation;
          reflection=!rotation;
          pattern=(pattern+1)%2+2; //switch between patterns 2 and 3
          numlines=int(random(1,12));
        break;
        case 2:
          //pauseFlag=t+int(frameRate()*60/Beat.BPM);
          quickZoomFlag=millis()+int(1000*60.0/Beat.BPM);//
          zoomDirection=random(-1,1);
          if (zoomDirection<0){zoomDirection=-1;}else{zoomDirection=1;}
          effect++;
          scheme=Math.floor(scheme+1);
          numlines=int(random(1,12));
          rotation=!rotation;
          reflection=!rotation;
          pattern=(pattern+1)%2+2; //switch between patterns 2 and 3
        break;
        case 3: //for orchidmode
            orchid=true;
            scheme=Math.floor(scheme+1);
            effect++;
            numlines=int(random(1,12));
        break;
        case 4: //revert from orchidmode
          orchid=false;
          quickZoomFlag=millis()+int(1000*60.0/Beat.BPM);//
          zoomDirection=random(-1,1);
          if (zoomDirection<0){zoomDirection=-1;}else{zoomDirection=1;}
          effect++;
          rotation=!rotation;
          reflection=!rotation;
          numlines=int(random(1,12));
        break;
        case 5:
          scheme=Math.floor(scheme+1);
          effect++;
        break;
        case 6:
          rotation=!rotation;
          reflection=!rotation;
          effect++;
        break;
        case 7:
          if (nucleusFlag==false){
            scheme=Math.floor(scheme+1);
          }
          numlines=int(random(1,12));
          effect++
        break;
         case 8:
          lineFlag=t+int(8*frameRate()*60/Beat.BPM);//t+frames/beat
          numLines=1;
          effect++;
        break;
         case 9:
          effect=0;
          numlines=int(random(1,12));
        break;
       }
    }
    if(Beat.timingConfidence<.50){ //beat is gone?
    // pattern=0;
    // linVariant=3;
    // scheme=0;
    }
    if (lineFlag>t){ //for line count effect, start at 1 line and add back up to 8 on the beat
      numLines=8-int(constrain(abs(t-lineFlag)*Beat.BPM/(60*frameRate())+1,0,8)); //lineFlag=t+int(frameRate()*60/Beat.BPM);
    }
}
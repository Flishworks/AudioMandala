var lineFlag=0; //for line count effect
var effect=0; // to cycle through effects
var beatOverride=false; //for testing

function beatEffector(){ //generates effects on beat
    if((Beat.detect()&&Beat.timingConfidence>.90)||beatOverride){ //mix it up on the beat
       randomEffect();
       randomEffect();
    }
    
    if(Beat.timingConfidence<.50){ //beat is gone?
      }
      
    if (lineFlag>t){ //for line count effect, start at 1 line and add back up to 8 on the beat
      numLines=8-int(constrain(abs(t-lineFlag)*Beat.BPM/(60*frameRate())+1,0,8)); //lineFlag=t+int(frameRate()*60/Beat.BPM);
    }
    
    if (t%(8*frameRate*60/Beat.BPM)<1){ //effect based on timing
      randomEffect();
    }
}

function randomEffect(){
    effect=int(random(1,9));
    
       switch(effect){
        case 0:
          if(quickZoomFlag<millis()){
          rotateFlag=t+int(2*frameRate()*60/Beat.BPM);//
          }
        break;
        case 1:
          rotation=!rotation;
          reflection=!rotation;
          orchid=false;
        break;
        case 2:
          pattern=(pattern+1)%2+2; //switch between patterns 2 and 3
          orchid=false;
        break;
        case 3: //for orchidmode
            orchid=true;
        break;
        case 4: //revert from orchidmode
          if(quickZoomFlag<millis()&&slowZoomFlag==false){
           pauseFlag=t+int(frameRate()*60/Beat.BPM);
          }
        break;
        case 5:
          if(pauseFlag<t&&rotateFlag<t){
            quickZoomFlag=millis()+int(1000*60.0/Beat.BPM);//
            zoomDirection=random(-1,1);
            if (zoomDirection<0){zoomDirection=-1;}else{zoomDirection=1;}
          }
        break;
        case 6:
          numlines=int(random(1,12));
        break;
        break;
        case 7:
          scheme=Math.floor(scheme+1);
        break;
         case 8:
          lineFlag=t+int(8*frameRate()*60/Beat.BPM);//t+frames/beat
          numLines=1;
          effect++;
          orchid=false;
        break;         
       }
}
    
    
    
    

function beat(){
  //for beat detecting
  this.energy=0; //tracks max buffer summation, indicates a beat
  this.threshold=.80; //percent of energy to consider a beat
  
  //for timing
  this.timer=1; //stored estimate of time between beats in milliseconds
  this.timerFuzz; //milliseconds on either end for error
  this.timeMark=[] ;//ongoing array storing beat timings
  this.numAvs=2; //then number of marks to gather. More will be more stringent detection
  this.i=0; //used to track the currentt indecy in timing array
  this.lowBound=1600; //150 bpm //lower boundary of expected beat legnth in ms
  this.highBound=4000; //60 bpm  //upper boundary of expected beat legnth in ms
  this.lastBeat=0; //time of last beat
  this.timingConfidence=0;
  this.BPM=120;
  this.amp;
  //this.beat()=function() { //constructor
  //}
   //<>//
  this.detect=function() {
    var now=millis();
    this.amp=amplitude.getLevel();
    this.getEnergy();//get max amp
    this.timingConfidence=constrain(this.timingConfidence-.001,0,1); //confidence deteriorates over time if not reinforced by a beat
    if (this.amp>this.threshold*this.energy){
      if (now-this.lastBeat>this.lowBound){ //valid beat mark //<>//
        if (now-this.lastBeat<this.highBound){ //if not after a long pause, use it to calc timing
          i++;
          i%=this.numAvs;
          this.timeMark[i]=now-this.lastBeat;
          this.timer=0;
          for (var j=0; j<this.numAvs; j++){
            this.timer=this.timer+this.timeMark[j];
          }
          this.timer/=this.numAvs; //calc average of timeMarks
          this.BPM=60000*4/(this.timer);
          
          this.timingConfidence=0;
          for (var j=0; j<this.numAvs; j++){
            this.timingConfidence+=abs((this.timer-this.timeMark[j])/(1.0*this.timer));
          }
          this.timingConfidence=1-this.timingConfidence/this.numAvs; //covert so 1 is max confidence
        }
        this.lastBeat=now;
        return true;
      }
    }
    return false;
  }

  this.getEnergy = function(){ //attempts to get a threshold energy value for determining the beat
    if (this.amp>this.threshold*this.energy){
      this.energy=this.amp;
    }
    println("amp: ",this.amp);
  }
  
}
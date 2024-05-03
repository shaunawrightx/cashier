let capture;
let capturewidth = 640;    
let captureheight = 480;

let emotions = ["neutral","happy", "sad", "angry","fearful", "disgusted","surprised"];

let faceapi;
let detections = [];

function setup() {
  createCanvas(capturewidth, captureheight);
  
  capture = createCapture(VIDEO);
  capture.position(0,0);
  
  //capture.hide();
  
  const faceOptions = {withLandmarks: true, withExpressions: true, withDescriptors: false};
  
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  }

function faceReady(){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return
  }
    detections = result;
    faceapi.detect(gotFaces);
   // console.log(detections);
}
  
const angAudio = [
  'ai audio/keep that hidden.mp3',
  'ai audio/be patient.mp3',
  'bottle that inside.mp3'
];

const conAudio = [
  'ai audio/customer is always right.mp3',
  'ai audio/you should know all the products.mp3',
  'ai audio/can you check in the back.mp3'
];

function playAngRandom() {
  const randomIndex = Math.floor(Math.random() * 3);
  const audio = document.getElementById('audioPlayer');

  audio.src = angAudio[randomIndex];

  audio.play();
}
function playConRandom() {
  const randomIndex = Math.floor(Math.random() * 3);
  const audio = document.getElementById('audioPlayer');

  audio.src = conAudio[randomIndex];

  audio.play();
}

function draw() {
  
  background(0);
  
  capture.loadPixels();
  
  push();
  fill('green');
      if(detections.length>0){
        for (i=0; i<detections.length; i ++){
          var points = detections[i].landmarks.positions;

          for (j=0; j<points.length; j ++){
           circle( points[j]._x,points[j]._y, 5);
            }
          
          var neutralLevel = detections[i].expressions.neutral;
          var happyLevel = detections[i].expressions.happy;
          var sadLevel = detections[i].expressions.sad;
          var angryLevel = detections[i].expressions.angry;
          var fearfulLevel = detections[i].expressions.fearful;
          var disgustedLevel = detections[i].expressions.disgusted;
          var surprisedLevel = detections[i].expressions.surprised;
          
          push();
//           console.log(detections[0].expressions);
          var biggest_emotion = "neutral";

          for (k = 0; k<emotions.length; k++) {
          
            var thisemotion = emotions[k];
            
            var thisemotionlevel= detections[i].expressions[thisemotion];
             
            //FOR PANEL SAYING LEVELS
           // text(thisemotion + " value: " + thisemotionlevel,40,30 + 30 * k );
               
            rect(40, 30 + 30 * k, thisemotionlevel * 100,10 );
            
            if(thisemotionlevel > detections[i].expressions[biggest_emotion]){
              biggest_emotion = thisemotion;
            }
          }
          
          console.log('applicant', i, 'emotes', biggest_emotion);
         
          }    


  
      if (biggest_emotion==="angry") {
       playAngRandom();
      
      } else if (biggest_emotion==="disgusted") {
       playAngRandom();

      } else if (biggest_emotion==="surprised") {
        playConRandom();

      } else if (biggest_emotion==="fearful") {
       playConRandom();

      } else if (biggest_emotion==="sad") {
        playConRandom();
      } 

    }}

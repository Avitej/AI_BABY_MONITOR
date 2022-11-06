img = "";
objects = [];
status = "";

function preload(){
  img = loadSound('sound.wav');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}
function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Person Detected";2
          //document.getElementById("number_of_objects").innerHTML = "Number of People detected are : "+ objects.length;
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if (objects[i].label == "person")
          {
            document.getElementById("number_of_objects").innerHTML = "BABY FOUND";
            console.log("stop");
            song.stop();
          } else
        {
            document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND";
            console.log("play");
            song.play();
        }

        if (objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND";
            console.log("play");
            song.play();
        }

        }
      }
}
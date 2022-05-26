objects = [];
status = "";
function preload(){
    var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
}
function setup(){
    canvas = createCanvas(340,250);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(340,250);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_value = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("modelLoaded");
    status = true;  
}

function draw(){
    image(video,0,0,340,250);
    if(status != ""){
        objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
        percent = floor(objects[i].confidence * 100);
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        fill("#FF0000");
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("#0000FF");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label == input_value){
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object_found").innerHTML = "Object Mentioned Found";
            speak();
        }
        else{
            document.getElementById("object_found").innerHTML = "Object Mentioned Not Found";
        }
    }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }    
    objects = results;
}

function speak(){
    var synth = window.speechSynthesis;
            speak_data = "object mention found!";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
        
            synth.speak(utterThis);
}
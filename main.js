status = "";

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
    image(video,0,0,340,250)
}
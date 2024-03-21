status = "";
objects = [];

function preload()
{
    img = loadImage("https://target.scene7.com/is/image/Target/GUEST_ce3a2c12-05f9-4b99-ade3-afdbab7afefa?wid=488&hei=488&fmt=pjpeg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = "samagna";
    ObjectDetector.detect(img, gotresults);
}

function gotresults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(img, 0, 0, 640, 420);
   if(status != "")
   {
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : objects detected";
        fill("red");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
   }
}
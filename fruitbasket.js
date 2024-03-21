status = "";
objects = [];

function preload()
{
    img = loadImage("https://rukminim2.flixcart.com/image/850/1000/xif0q/fruit-vegetable-basket/c/s/s/metal-round-fruit-bowl-fruit-basket-for-dinning-table-as-original-imaghyxz6cjh6vjh.jpeg?q=90&crop=false");
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
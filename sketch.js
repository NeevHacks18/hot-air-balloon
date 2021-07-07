var balloon;
var backgroundImg;

function preload(){
backgroundImg = loadImage("cityImage.png")
balloonImg = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
}

function setup(){
    createCanvas(800,800);
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = 0.2;
    balloon.shapeColor = "red";
//listning x & y position from the database
    firebase.database().ref('/balloon/height').on("value", (data)=>{
        position = data.val()
     
        balloon.x = position.x;
        balloon.y = position.y;
     })
}

function draw(){
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //updating to firebase
firebase.database().ref('/balloon/height/').set({
    x: position.x+x,
    y: position.y+y
  })
}

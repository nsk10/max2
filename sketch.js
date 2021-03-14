//Create variables here
var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload()
{
	//load images here
  sadDog=loadImage("img/Dog.png");
  happyDog=loadImage("img/happy dog.png");
  garden=loadImage("img/Garden.png");
  washroom=loadImage("img/Wash Room.png");
  bedroom=loadImage("img/Bed Room.png");
}

function setup() {
	createCanvas(800,500);
  database=firebase.database();

  foodObj = new Food();
  foodStock=database.ref('food');
  foodStock.on("value",function(data){
    foodS=data.val();
    foodObj.stock = foodS;
  });


  fedTime=database.ref('feedtime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });


  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(()=>{
    foodS++;
    database.ref('/').update({
    food:foodS
  })
  });
  
}


function draw() {  

  currentTime=hour();

  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();

 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();

 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();

 }else{
   
      update("Hungry")
dog.addImage(sadDog);

dog.visible=true;
    foodObj.display();
 }
 
 if(gameState!=="Hungry" ){
   feed.hide();
   addFood.hide();
   dog.visible=false;
 }else{
  feed.show();
  addFood.show();
  dog.visible=true;
 
 }

  
  drawSprites();
 
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.stock = foodObj.stock-1;
database.ref('/').update({
  food:foodObj.stock,
  feedtime:hour(),
  gameState:"Hungry"
})
}


function update(state){
  database.ref('/').update({
    gameState:state
  })
}
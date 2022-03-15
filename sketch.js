var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastfeed;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("feed the dog");
  feed.position(400,30);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

 if (lastfeed >=12){

 text("Ultima refeição" + lastfeed % 12, 350,30);

 }
 else if(lastfeed == 0 ){

 text("ultima refeição 12AM", 350,30);

 }
 else{

 text("ultima refeição" + lastfeed,350,30 )

 }
  
 
 drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 var foodStock = foodObj.getFoodStock()

 if (foodStock <= 0){

  foodObj.updateFoodStock(foodStock*0);

 }
 else{

  foodObj.updateFoodStock(foodStock-1);
 }
database.ref("/").update({Food: foodObj.getFoodStock(), FeedTime: hour() })


}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

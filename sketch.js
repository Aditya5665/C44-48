const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var backgroundSprite, ground, character, obstacle, coin, gameOver;
var obstacles, coinG;
var gameState = "END";
var gameState = "PLAY";
var score = 0;

function preload(){
  backgroundImg = loadImage("background.jpg");
  characterImg = loadImage("character.png");
  obstacleImg = loadImage("obstacle.png");
  obstacleImg1 = loadImage("obstacle1.png");
  islandImg = loadImage("floatingIsland.png");
  powerCoinImg = loadImage("powerup.png");
  powerCoin1Img = loadImage("powerup1.png");
  gameOverImg = loadImage("GameOver.png");
  resetButtonImg = loadImage("resetButton.png");
}

function setup() {
  createCanvas(1000,700);
  engine = Engine.create();
  world = engine.world;
  backgroundSprite = createSprite(300,100);
  backgroundSprite.addImage(backgroundImg);
  backgroundSprite.scale = 1.6;
  backgroundSprite.velocityX = -2;
  ground = createSprite(800,500,1800,10);
  ground.visible = false;

  character = createSprite(100,450,100,100);
  character.addImage(characterImg);
  character.scale = 0.5;

  gameOver = createSprite(500,200,10,10);
  gameOver.visible = false;
  resetButton = createSprite(500,400,20,20);
  resetButton.addImage(resetButtonImg);
  resetButton.visible = false;
  obstacles = new Group();
  coinG = new Group();

  character.setCollider("circle",0,0,80);
  //character.debug = true;
  
}

function draw() {
  background("white");

  Engine.update(engine); 
  //gameState = "END";
  if(gameState === "PLAY"){
    if( (keyDown("up") || keyDown("space")) && character.y >= 350) {
      character.velocityY = -12;
    }

    character.velocityY = character.velocityY + 1;
    character.collide(ground);
  

    console.log(backgroundSprite.x);
    if(backgroundSprite.x  === 30 ){
    backgroundSprite.x = 500;
    }
    createObstacles();
    createPowerups();
    if(obstacles.isTouching(character)){
      gameState = "END";
    }
    if(coinG.isTouching(character)){
      score = score+5;
      coinG.destroyEach();
    }
  }
  if(gameState === "END"){
    character.velocityX = 0;
    character.velocityY = 0;
    gameOver.visible = true;
    gameOver.addImage(gameOverImg);
    resetButton.visible = true;
    backgroundSprite.velocityX = 0;
    obstacles.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    

    if(mousePressedOver(resetButton)){
      gameState = "PLAY"
      obstacles.destroyEach();
      coinG.destroyEach();
      score = 0;
      gameOver.visible = false;
      resetButton.visible = false;
      backgroundSprite.velocityX = -2;
    }
  }


  drawSprites();
  fill("red");
  textSize(25);
  text("Score: "+score, 800,40);

}

  function createObstacles(){
    if(frameCount % 100 === 0){
      obstacle = createSprite(600,475,50,50);
      
      obstacle.velocityX = -7;
      console.log(frameCount);
     
      obstacle.scale = 0.15;
      
      var rn = Math.round(random(1,2));

      if(rn ===  1){
        obstacle.addImage(obstacleImg);
      }
      else {
        obstacle.addImage(obstacleImg1);
      }

      obstacles.add(obstacle);
        }
      }

    function createPowerups(){
      if(frameCount % 174 == 0){
      coin = createSprite(600,475,50,50);
      coin.y = Math.round(random(300,475));
      coin.velocityX = -7;
      console.log(frameCount);
      coin.scale = 0.15;
      coinG.add(coin);
      var rn1 = Math.round(random(1,2));

      if(rn1 ===  1){
        coin.addImage(powerCoinImg);
      }
      else {
        coin.addImage(powerCoin1Img);
      }
      
      }
  


        }
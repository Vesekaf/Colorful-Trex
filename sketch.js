var trex, running, trex_collided;
var ground, floor, ground2;
var gameState;
var game, over, replay, yrt;
var invis;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5
var obstacle;
var score;
var clouds, cloudsGroup, cloudImage;
var jumpSound, dieSound, chechpoint;


function preload(){
    
  running = loadAnimation("trex11.gif", "trex22.gif", "trex33.gif", "trex44.gif", "trex55.gif", "trex66.gif");
  
  trex_collided = loadAnimation("collided.gif");
  
  obstacle1 = loadImage("cactus1.gif");
  obstacle2 = loadImage("cactus2.gif");
  obstacle3 = loadImage("cactus3.gif");
  obstacle4 = loadImage("cactus4.gif");
  obstacle5 = loadImage("cactus5.gif");
  
  cloudImage = loadImage("cloud.gif");
  
  yrt = loadImage("1971580-200.png");
  game = loadImage("gameovver.png");
  
  
  floor = loadImage("totallyanimatedground.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  
  
}

function setup(){
  createCanvas(600,200);
  //ground2 = createSprite(400, 175);
  ground = createSprite(400, 175);
  trex = createSprite(75, 50); 
  
  over = createSprite(300, 50);
  
  invis = createSprite(400, 175, 700, 50);
  trex.addAnimation("trex_running", running);
  trex.addAnimation("collided", trex_collided);
  
  ground.addImage("runnnnnn", floor);
  over.addImage(game);
  replay = createSprite(300, 100);
  replay.addImage(yrt);
  
  //ground2.addImage("runnn", floor);
  
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  
  trex.scale = 0.25;
  ground.scale  = 0.25;
  
  replay.scale = 0.25;
  
  over.visible = false;
  replay.visible = false;
  
  
  invis.visible = false;
  //ground2.scale  = 0.25;
  score = 0;
  gameState = "play";
}


function draw(){
  
  background("white");
  text("Score:   " + score, 300, 50);
  
  if(gameState === "play"){
  
  ground.velocityX = -3;
  
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(4 + 3* score/100)
    
  if(ground.x < 200){
  
    ground.x = 300;
  
  }
    
  if(touches.length > 0 || keyDown("space") && trex.isTouching(ground)){
  
    trex.velocityY = -12;
    jumpSound.play();
    touches = [0];
  
  }
  trex.velocityY = trex.velocityY + 0.8;
  if(score>0 && score%100 === 0){
       checkpoint.play(); 
    }
  
  
  spawnObstacles();
  spawnClouds();
    
  if(obstaclesGroup.isTouching(trex)){
    
    gameState = "end";
    dieSound.play();
  }
}
  
  if(gameState === "end"){
  
  trex.changeAnimation("collided", trex_collided);
    
  trex.velocityY = 0;
  over.visible = true;
  replay.visible = true;
    
  ground.velocityX = 0; 
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
    
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(replay)){
  
    trex.changeAnimation(running);
    gameState = "play";
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    over.visible = false;
    replay.visible = false;
    
    score = 0;
  }
  
  }
  
  
  trex.collide(invis);  
  drawSprites();
  
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,130,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(20,80));
    cloud.addImage(cloudImage);
    cloud.scale = 0.15;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}


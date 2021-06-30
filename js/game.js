let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#88e288',
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

//---vars de son---
var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var soundButton;
var hasBeenClicked;

//--var de l'étoile de fin---
var star;
var starScale;

//---game background---
var gameBg;

//
function init() {
}

function preload() {
    //---full image in the background---
    this.load.image('background', './assets/tiger-01.png');
    
    //----members---
    this.load.image('head', './assets/tigerHead-01.png');
    this.load.image('body', './assets/tigerBody-01.png');
    this.load.image('handL', './assets/tigerHandL-01.png');
//    this.load.image('handR', './assets/pArmR-01.png');
    this.load.image('tail', './assets/tigerEnd-01.png');
//    this.load.image('legR', './assets/pLegR-01.png');
    
    //---flèche next---
    this.load.image('nextArrow', './assets/g-refresh.png');
    
    //---audio--
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/congratulations.wav');
    
    //---sound button----
    this.load.image('soundBtn', './assets/volume-up (2).png');
    
    //---star at the end---
    this.load.image('star', './assets/g-badge.png');
    
     //---background pattern---
    this.load.image('gameBg', './assets/newleaf-01.png');

}

function create() { 
    //--game background pattern---
    gameBg = this.add.image(180, 320, 'gameBg');
    gameBg.setVisible(false);
    
     //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    //---perso en transparence---
    var image = this.add.image(200, 250, 'background');
    image.alpha = 0.3;
    
    //---sons---
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----audio  btn----
    soundButton = this.add.image(50,50, 'soundBtn');
    soundButton.setScale(0.1);
    soundButton.setInteractive();
    soundButton.alpha = 0.5;
    soundButton.on('pointerdown', enableMusic);
    
    //----les membres-----
    var head = this.add.image(300, 92, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
//    head.setScale(2);
    head.setName('head');
//    head.setScale(0.45);
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.15);
    nextArrow.setVisible(false);
    
    //----vars des membres---
    var body = this.add.image(120, 530, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
//    body.setScale(0.45);
    
    var handL = this.add.image(310, 520, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
//    handL.setScale(0.45);
    
//    var handR = this.add.image(200, 552, 'handR', Phaser.Math.RND.pick(frames)).setInteractive();
//    this.input.setDraggable(handR);
//    handR.setName('handR');
//    hips.setScale(0.45);
    
    var tail = this.add.image(70, 350, 'tail', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(tail);
    tail.setName('tail');
//    legL.setScale(0.45);
    
//    var legR = this.add.image(310, 570, 'legR', Phaser.Math.RND.pick(frames)).setInteractive();
//    this.input.setDraggable(legR);
//    legR.setName('legR');
//    legR.setScale(0.45);
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(140, 142, 115, 140).setRectangleDropZone(115, 140);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(190, 278, 220, 137).setRectangleDropZone(220, 137);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(85, 175, 80, 100).setRectangleDropZone(80, 100);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(315, 392, 90, 140).setRectangleDropZone(90, 140);
    zone4.setName('tail');
    
    //  A drop zone
//    var zone5 = this.add.zone(160, 385, 90, 170).setRectangleDropZone(90, 170);
//    zone5.setName('legL');
    
    //  A drop zone
//    var zone6 = this.add.zone(270, 230, 40, 130).setRectangleDropZone(40, 130);
//    zone6.setName('handR');

//          var graphics = this.add.graphics();
//    graphics.lineStyle(2, 0xffff00);
//    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
//    
//    graphics.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
//    
//    graphics.strokeRect(zone3.x - zone3.input.hitArea.width / 2, zone3.y - zone3.input.hitArea.height / 2, zone3.input.hitArea.width, zone3.input.hitArea.height);
//    
//    graphics.strokeRect(zone4.x - zone4.input.hitArea.width / 2, zone4.y - zone4.input.hitArea.height / 2, zone4.input.hitArea.width, zone4.input.hitArea.height);

 
    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);
        holdSound.play();

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name == gameObject.name);
            console.log('successful dropoff of ' + gameObject.name + ' in ' + dropZone.name);
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
    
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 4){
            console.log("well done!!!!");
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
          finishSound.play();
          star.setVisible(true);
          gameBg.setVisible(true);
    }    
        
        nextArrow.on('pointerdown', onClick);

    });
    

}


function update() {
    if(successfulDropoff === 4){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.3){
            starScale = 0.3;
        } }
    
       if (hasBeenClicked === true){
        soundButton.alpha = 1;
        }
}
function onClick(){
//    window.open("https://www.google.com", "_blank");
    window.location.replace("https://games.caramel.be/mowgli/index.html");

}
function enableMusic(){
    hasBeenClicked = true;
}
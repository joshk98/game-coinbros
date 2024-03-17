let charGravity = 500;
let charJump = -230;
let charSpeed = 75;

let enemyGravity = charGravity;
let enemySpeed = 25;

class Play {
  create() {
    this.player = this.physics.add.sprite(80, 144, 'player');
    this.player.body.gravity.y = charGravity;

    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coin');
    this.deadSound = this.sound.add('dead');

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {frames: [4, 3, 5, 3]}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {frames: [1, 0, 2, 0]}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'rightEnemy',
      frames: this.anims.generateFrameNumbers('enemy', {frames: [4, 3, 5, 3]}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'leftEnemy',
      frames: this.anims.generateFrameNumbers('enemy', {frames: [1, 0, 2, 0]}),
      frameRate: 4,
      repeat: -1,
    });

    this.lastDirection = 'left'

    // this.music =this.load.audio('music');
    // this.music.loop = true;
    // this.music.play();

    this.arrow = this.input.keyboard.createCursorKeys();

    this.createWorld();
    
    this.coin = this.physics.add.sprite(80, 128, 'coin');

    this.scoreLabel = this.add.text(80, 128, 'Score: 0', { font: '18px Arial', fill: '#fff' });
    this.score = 0

    this.enemies = this.physics.add.group();
    this.time.addEvent({
      delay: 5000,
      callback: () => this.addEnemy(),
      loop: true,
    });
  }

  update() {
    this.physics.collide(this.player, this.walls);
    this.physics.collide(this.enemies, this.walls, this.enemyCollideWall, null, this);
    
    this.movePlayer();

    if (!this.physics.world.bounds.contains(this.player.x, this.player.y)) {
      this.playerDie();
    }  

    if (this.physics.overlap(this.player, this.coin)) {
      this.takeCoin();
    }

    if (this.physics.overlap(this.player, this.enemies)) {
      this.playerDie();
    }
    
  }

  movePlayer() {
    if (this.arrow.left.isDown) {
      this.player.body.velocity.x = -charSpeed;
      this.player.anims.play('left', true);
      this.lastDirection = 'left';
    }
    else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = charSpeed;
      this.player.anims.play('right', true);
      this.lastDirection = 'right';
    }
    else {
      this.player.body.velocity.x = 0;
      this.player.setFrame(this.lastDirection === 'left' ? 0 : 3);
    }
    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = charJump;
      this.jumpSound.play();
    }
  }

  createWorld() {
    let map = this.add.tilemap('map');
    let tileset = map.addTilesetImage('tileset', 'tileset');
    this.walls = map.createLayer('Tile Layer 1', tileset);

    this.walls.setCollision([1, 2, 3, 4, 5, 6]);

    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  playerDie() {
    this.deadSound.play();
    this.scene.start('menu', { score: this.score });
    // this.music.stop();
  }

  updateCoinPosition() {
    let positions = [
      { x: 24, y: 40 },
      { x: 40, y: 40 },
      { x: 120, y: 40 },
      { x: 136, y: 40 },

      { x: 24, y: 136 },
      { x: 40, y: 136 },
      { x: 120, y: 136 },
      { x: 136, y: 136 },

      { x: 24, y: 232 },
      { x: 40, y: 232 },
      { x: 56, y: 232 },
      { x: 104, y: 232 },
      { x: 120, y: 232 },
      { x: 136, y: 232 },
    ];

    positions = positions.filter(coin => coin.x !== this.coin.x);

    let newPosition = Phaser.Math.RND.pick(positions);

    this.coin.setPosition(newPosition.x, newPosition.y);
  }

  takeCoin() {
    this.score +=1;
    this.scoreLabel.setText('Score: ' + this.score);
    this.coinSound.play();
    this.updateCoinPosition();
  }

  addEnemy() {
    let enemy = this.enemies.create(80, -10, 'enemy');

    enemy.body.gravity.y = enemyGravity;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-enemySpeed, enemySpeed]);
    
    if (enemy.body.velocity.x < 0) {
        enemy.anims.play('leftEnemy', true);
    } else {
        enemy.anims.play('rightEnemy', true);
    }

    enemy.body.bounce.x = 1;

    this.time.addEvent({
        delay: 10000,
        callback: () => enemy.destroy(),
    });
  }

  enemyCollideWall(enemy, wall) {
    if (enemy.body.velocity.x < 0) {
        enemy.anims.play('leftEnemy', true); 
    } else {
        enemy.anims.play('rightEnemy', true);
    }
  }
};

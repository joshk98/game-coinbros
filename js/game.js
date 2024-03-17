let charGravity = 500;
let charJump = -230;
let charSpeed = 100;
let enemyGravity = charGravity;
let enemySpeed = 0.33 * charSpeed;

// const tileSize = 16;
// const mapWidth = 10;
// const mapHeight = 16;

class Main {
  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('tileset', 'assets/tile-grass.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/map.json');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('enemy', 'assets/enemy.png');
  }

  create() {
    this.player = this.physics.add.sprite(80, 144, 'player');
    this.player.body.gravity.y = charGravity;

    this.arrow = this.input.keyboard.createCursorKeys();

    this.createWorld();
    
    this.coin = this.physics.add.sprite(80, 128, 'coin');

    this.scoreLabel = this.add.text(30, 25, 'Score: 0', { font: '18px Arial', fill: '#fff' });
    this.score = 0

    this.enemies = this.physics.add.group();
    this.time.addEvent({
      delay: Phaser.Math.RND.between(2500, 4000),
      callback: () => this.addEnemy(),
      loop: true,
    });
}

  update() {
    this.physics.collide(this.player, this.walls);
    this.physics.collide(this.enemies, this.walls);
    
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
      this.player.body.velocity.x = -75;
    }
    else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = 75;
    }
    else {
      this.player.body.velocity.x = 0;
    }
    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = charJump;
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
    this.scene.start('main');
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

    this.updateCoinPosition();
  }

  addEnemy() {
    let enemy = this.enemies.create(80, -10, 'enemy');

    enemy.body.gravity.y = charGravity;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-25, 25]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({
      delay: 10000,
      callback: () => enemy.destroy(),
    });
  }
};

let game = new Phaser.Game({
  width: 160,
  height: 256,
  backgroundColor: '#25131a',
  physics: { default: 'arcade' },
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
});

game.scene.add('main', Main);
game.scene.start('main');
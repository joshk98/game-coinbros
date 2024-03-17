class Load {
  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 16, frameHeight: 16 });

    this.load.tilemapTiledJSON('map', 'assets/maps/map.json');
    this.load.image('tileset', 'assets/tile-grass.png');
    this.load.image('coin', 'assets/coin.png');

    this.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
    this.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
    this.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
    // this.load.audio('music', ['assets/music.ogg', 'assets/music.mp3']);

    let loadLabel = this.add.text(80, 128, 'Loading...', { font: '30px Arial', fill: '#fff' });

    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    this.scene.start('menu');
  }
};
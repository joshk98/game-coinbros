class Load {
  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/map.json');
    this.load.image('tileset', 'assets/tile-grass.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('enemy', 'assets/enemy.png');

    let loadLabel = this.add.text(80, 128, 'Loading', { font: '30px Arial', fill: '#fff' });

    loadLabel.setOrigin(0.5, 0.5);
  }

  create() {
    this.scene.start('menu');
  }
};
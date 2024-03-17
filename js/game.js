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

game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('play', Play);

game.scene.start('load');
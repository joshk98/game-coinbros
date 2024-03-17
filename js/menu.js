class Menu {
  create(data) {
    let score = data.score ? data.score : 0;

    this.add.image(80, 128, 'background');

    let nameLabel = this.add.text(80, 128, 'Tower Trek', { font: '30px Arial', fill: '#fff' });
    nameLabel.setOrigin(0.5, 0.5);

    let scoreText = 'Last Score: ' + score;
    let scoreLabel = this.add.text(80, 144, scoreText, { font: '15px Arial', fill: '#fff' });
    scoreLabel.setOrigin(0.5, 0.5);

    let startText = 'Tap to start';
    let startLabel = this.add.text(80, 160, startText, { font: '15px Arial', fill: '#fff' });
    startLabel.setOrigin(0.5, 0.5);

    this.upKey = this.input.keyboard.addKey('up')
  }

  update() {
    if (this.upKey.isDown) {
      this.scene.start('play');
    }
  }
}
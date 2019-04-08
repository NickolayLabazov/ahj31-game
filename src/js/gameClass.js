export default class Game {
  constructor(delay) {
    this.lastPosition = -1;
    this.field = 0;
    this.board = 1;
    this.position = -1;
    this.goblin = 0;
    this.ball = 0;
    this.miss = 0;
    this.interval = 0;
    this.delay = delay;
    this.listFunc = 0;
    this.cursor = 0;
    this.ceil = 0;
  }

  score(){
    let scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    document.body.appendChild(scoreDiv);
    let ballName = document.createElement('div');
    let ball = document.createElement('div');
    let missName = document.createElement('div');
    let miss = document.createElement('div');
    ballName.classList.add('ball');
    ball.classList.add('ball');
    missName.classList.add('ball');
    miss.classList.add('ball');
    ballName.innerHTML = 'Очки:';
    ball.innerHTML = this.ball;
    missName.innerHTML = 'Пропущено:';
    miss.innerHTML = this.miss;    
    scoreDiv.appendChild(ballName);
    scoreDiv.appendChild(ball);
    scoreDiv.appendChild(missName);
    scoreDiv.appendChild(miss);
  }

  newScore(){    
    let child = document.querySelector('.score')
    document.body.removeChild(child);
    this.score();
  }

  rand() {
    let position = Math.ceil((Math.random() * this.board ** 2) - 1);
    if (position === this.lastPosition) {
      position = this.rand();
    }
    this.lastPosition = position;
    return position;
  }

  fieldCreate(board) {    
    this.board = board;
    this.field = document.createElement('div');
    this.field.classList.add('field');
    const width = 124 * board;
    this.field.style.width = `${width}px`;
    document.body.appendChild(this.field);
    for (let i = 0; i < board ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.field.appendChild(cell);
    }
    this.score();
    this.goblin = document.createElement('img');
    this.goblin.setAttribute('src', './img/goblin.png');
    this.listFunc = () => {
      this.ball += 1;
      this.newScore();
      clearInterval(this.interval);
      this.imgCreate();      
    }   
  }

  imgCreate() {
    this.addImg();
    this.interval = setInterval(() => {
      this.addImg();
      this.miss += 1;
      this.newScore();
      if(this.miss === 5){
        clearInterval(this.interval);
        alert('Game over');
      }      
    }, this.delay);
  }

  addImg() {
    if (this.position > -1) {
      this.field.childNodes[this.position].removeEventListener('click', this.listFunc);
      this.ceil.style.cursor = "auto";
    }
    this.position = this.rand();
    this.ceil = this.field.childNodes[this.position];
    this.field.childNodes[this.position].appendChild(this.goblin);
    this.field.childNodes[this.position].addEventListener('click', this.listFunc);
    this.ceil.style.cursor = "url('img/cursor.png'), auto";
  }
}
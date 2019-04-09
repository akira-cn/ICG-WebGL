import generateMaze from '../../common/maze';

const WIDTH = 20;
const HEIGHT = 20;

const maze = generateMaze(WIDTH, HEIGHT);
const container = document.getElementById('container');

for(let i = 0; i < HEIGHT; i++) {
  for(let j = 0; j < WIDTH; j++) {
    const block = document.createElement('div');
    const blockData = maze[i][j];
    block.className = 'block';
    if(blockData & 0x1) {
      block.className += ' up';
    }
    if(blockData & 0x2) {
      block.className += ' right';
    }
    if(blockData & 0x4) {
      block.className += ' bottom';
    }
    if(blockData & 0x8) {
      block.className += ' left';
    }
    container.appendChild(block);
  }
}

import generateMaze from '../../common/maze';

const maze = generateMaze(10, 10);
const container = document.getElementById('container');

for(let i = 0; i < 10; i++) {
  for(let j = 0; j < 10; j++) {
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

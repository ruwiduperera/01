const MIN_SIZE = 5;
const MAX_SIZE = 15;
const INTEL_REQUIRED = 3;

let n = 7;
let grid = [];
let player = { x: 0, y: 0, lives: 3, intel: 0 };

function createGrid() {
  grid = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) row.push(".");
    grid.push(row);
  }

  placeRandom("#", n);
  placeRandom("I", 3);
  placeRandom("L", 2);

  grid[n - 1][n - 1] = "X";
  grid[0][0] = "@";
}

function placeRandom(item, count) {
  while (count > 0) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);

    if (grid[x][y] === ".") {
      grid[x][y] = item;
      count--;
    }
  }
}

function drawGrid() {
  let html = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      html += `<span>${grid[i][j]}</span>`;
    }
    html += "<br>";
  }
  document.getElementById("grid").innerHTML = html;

  document.getElementById("stats").innerText =
    `Lives: ${player.lives} | Intel: ${player.intel}`;
}

function move(dir) {
  let nx = player.x;
  let ny = player.y;

  if (dir === "w") nx--;
  if (dir === "s") nx++;
  if (dir === "a") ny--;
  if (dir === "d") ny++;

  if (
    nx < 0 ||
    ny < 0 ||
    nx >= n ||
    ny >= n ||
    grid[nx][ny] === "#"
  ) {
    player.lives--;
    checkGame();
    return;
  }

  grid[player.x][player.y] = ".";

  if (grid[nx][ny] === "I") player.intel++;
  if (grid[nx][ny] === "L") player.lives++;

  player.x = nx;
  player.y = ny;
  grid[nx][ny] = "@";

  checkGame();
  drawGrid();
}

function checkGame() {
  if (player.lives <= 0) {
    alert("Game Over");
    location.reload();
  }

  if (
    player.x === n - 1 &&
    player.y === n - 1 &&
    player.intel === INTEL_REQUIRED
  ) {
    alert("You Win!");
    location.reload();
  }
}

createGrid();
drawGrid();
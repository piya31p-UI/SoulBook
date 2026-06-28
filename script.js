// 🔐 PASSWORD SYSTEM
function handlePassword() {
  let input = document.getElementById("passwordInput").value;
  let savedPassword = localStorage.getItem("soulbook_password");

  if (!savedPassword) {
    if (input.length < 4) {
      document.getElementById("errorText").innerText =
        "Password must be at least 4 characters ❌";
      return;
    }

    localStorage.setItem("soulbook_password", input);
    document.getElementById("statusText").innerText =
      "Password set! Now enter to unlock 🔓";
    document.getElementById("errorText").innerText = "";
    return;
  }

  if (input === savedPassword) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("errorText").innerText = "Wrong password ❌";
  }
}

// 🌙 MOOD
let mood = "Not set";

function setMood(m) {
  mood = m;
  document.getElementById("moodText").innerText = "Today Mood: " + mood;
}

// 💌 DIARY
function saveDiary() {
  let text = document.getElementById("diaryInput").value;

  if (text === "") {
    alert("Write something first 💌");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("diary")) || [];

  entries.push({
    text: text,
    mood: mood,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("diary", JSON.stringify(entries));

  document.getElementById("diaryInput").value = "";

  showDiary();
}

function showDiary() {
  let list = document.getElementById("diaryList");
  list.innerHTML = "";

  let entries = JSON.parse(localStorage.getItem("diary")) || [];

  entries.forEach(e => {
    let li = document.createElement("li");
    li.innerText = `${e.date} | ${e.mood} | ${e.text}`;
    list.appendChild(li);
  });
}

// 📅 CALENDAR / MEMORY
function saveMemory() {
  let date = document.getElementById("memoryDate").value;
  let text = document.getElementById("memoryText").value;

  if (!date || !text) {
    alert("Please select date and write memory 💗");
    return;
  }

  let memories = JSON.parse(localStorage.getItem("memories")) || [];

  memories.push({ date, text });

  localStorage.setItem("memories", JSON.stringify(memories));

  document.getElementById("memoryText").value = "";

  showMemory();
}

function showMemory() {
  let list = document.getElementById("memoryList");
  list.innerHTML = "";

  let memories = JSON.parse(localStorage.getItem("memories")) || [];

  memories.forEach(m => {
    let li = document.createElement("li");
    li.innerText = `${m.date} ⭐ ${m.text}`;
    list.appendChild(li);
  });
}

// INIT
showDiary();
showMemory();
const stories = {
  romance: [
    "💖 Laila Majnu - A love story that never dies...",
    "💖 Romeo Juliet - Love beyond limits..."
  ],

  bollywood: [
    "🎬 90s Bollywood - golden era of emotions, songs, drama...",
    "🎬 Dilwale Dulhania Le Jayenge - classic love journey..."
  ],

  motivation: [
    "🌟 Believe in yourself, everything starts from within...",
    "🌟 Small steps every day lead to big success..."
  ]
};

function showStories(type) {
  let container = document.getElementById("storyList");
  container.innerHTML = "";

  stories[type].forEach(story => {
    let div = document.createElement("div");
    div.className = "box";
    div.innerText = story;
    container.appendChild(div);
  });
}
const stories = {
  romance: [
    {
      title: "Laila Majnu",
      content: "Laila and Majnu loved each other deeply. Their love became so pure that even society could not break it. They lived for love, and their story became eternal."
    },
    {
      title: "Romeo Juliet",
      content: "Romeo and Juliet belonged to rival families, but their love was stronger than hate. They chose love over life itself."
    }
  ],

  bollywood: [
    {
      title: "DDLJ",
      content: "Raj and Simran’s journey started in Europe and ended in Punjab. A classic love story that defines Bollywood romance."
    }
  ],

  motivation: [
    {
      title: "Believe in Yourself",
      content: "Success starts when you stop doubting yourself. Small steps every day lead to big change."
    }
  ]
};

function loadStories(type) {
  let list = document.getElementById("storyList");
  let viewer = document.getElementById("storyViewer");

  viewer.style.display = "none";
  list.style.display = "block";
  list.innerHTML = "";

  stories[type].forEach((story, index) => {
    let div = document.createElement("div");
    div.className = "box";
    div.innerHTML = `
      <h3>${story.title}</h3>
      <button onclick="openStory('${type}', ${index})">Read</button>
    `;
    list.appendChild(div);
  });
}

function openStory(type, index) {
  let story = stories[type][index];

  document.getElementById("storyList").style.display = "none";

  let viewer = document.getElementById("storyViewer");
  viewer.style.display = "block";

  viewer.innerHTML = `
    <div class="box">
      <h2>${story.title}</h2>
      <p style="text-align:left;">${story.content}</p>
      <button onclick="goBack()">⬅ Back</button>
    </div>
  `;
}

function goBack() {
  document.getElementById("storyViewer").style.display = "none";
  document.getElementById("storyList").style.display = "block";
}
let data = JSON.parse(localStorage.getItem("key")) || [];

// 1. SAVE
function addItem(){
    data.push("something");

    localStorage.setItem("key", JSON.stringify(data));

    render();
}

// 2. SHOW ON SCREEN
function render(){
    console.log(data);
}

// 3. DELETE
function deleteItem(index){
    data.splice(index, 1);

    localStorage.setItem("key", JSON.stringify(data));

    render();
}

// first load
render();
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";

let food = randomFood();

// speed control
let speed = 10;
let lastTime = 0;

// 🎮 GAME LOOP (SMOOTH)
function gameLoop(time) {
    requestAnimationFrame(gameLoop);

    if (time - lastTime < 1000 / speed) return;
    lastTime = time;

    update();
    draw();
}

// 🔄 UPDATE GAME STATE
function update() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    // 🍎 eat food
    if (headX === food.x && headY === food.y) {
        food = randomFood();
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    // 💔 wall collision
    if (headX < 0 || headY < 0 || headX >= 400 || headY >= 400) {
        alert("💔 Game Over!");
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";
        food = randomFood();
        return;
    }

    // 💔 self collision
    for (let i = 0; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            alert("💔 Game Over! You hit yourself");
            snake = [{ x: 200, y: 200 }];
            direction = "RIGHT";
            food = randomFood();
            return;
        }
    }

    snake.unshift(newHead);
}

// 🎨 DRAW EVERYTHING
function draw() {
    ctx.clearRect(0, 0, 400, 400);

    // snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#ff2e93" : "#ff99cc";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // food
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(food.x, food.y, box, box);
}

// 🍎 random food
function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

// 🎮 CONTROLS
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// 🚀 START GAME
function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = randomFood();
}

// auto start smooth loop
requestAnimationFrame(gameLoop);
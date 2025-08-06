const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve index.html and assets

// Local JSON Vault
const readUsers = () => {
  if (fs.existsSync('users.json')) {
    return JSON.parse(fs.readFileSync('users.json'));
  }
  return [];
};

const writeUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// 🔐 Register Route
app.post('/register', async (req, res) => {
  const { contact, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.contact === contact)) {
    return res.status(400).send('User already exists ❌');
  }

  const hash = await bcrypt.hash(password, 10);
  users.push({ contact, password: hash });
  writeUsers(users);
  res.send('Account created ✅');
});

// 🔓 Login Route
app.post('/login', async (req, res) => {
  const { identity, password } = req.body;
  const users = readUsers();

  const user = users.find(u => 
    u.contact === identity || u.username === identity
  );

  if (!user) return res.status(404).send('User not found ❌');

  const match = await bcrypt.compare(password, user.password);
  res.send(match ? 'Access granted ✅' : 'Wrong password ❌');
});

// 🚀 Start Server
app.listen(PORT, () =>
  console.log(`🃏 Joker's Server running at http://localhost:${PORT}`)
);
document.querySelector("#formArea").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const isLogin = loginMode; // from your toggle

  const route = isLogin ? "/login" : "/register";
  const res = await fetch(route, {
    method: "POST",
    body: formData,
  });

  const message = await res.text();
  alert(message); // optional: show feedback

  if (message.includes("✅") || message.includes("🔓")) {
    window.location.href = "https://your-chaos-domain.com/dashboard.html"; // replace with your actual landing page
  }
});
app.post('/register', async (req, res) => { /* save user to users.json */ });
app.post('/login', async (req, res) => { /* validate user and password */ });

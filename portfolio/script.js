function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const loginSection = document.getElementById("chat-login");
const chatSection = document.getElementById("chat");
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username-input");

let username = "";

loginBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Please enter a username");

  username = name;

  // Hide login, show chat
  loginSection.style.display = "none";
  chatSection.style.display = "block";

  // Connect WebSocket now
  connectChat();
});

// Optional: press Enter to login
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") loginBtn.click();
});

function connectChat() {
  const ws = new WebSocket("ws://192.168.0.103:8080");

  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

function appendMessage(text, isSystem = false) {
  const div = document.createElement("div");
  div.classList.add("message");
  if (isSystem) {
    div.classList.add("system");
    div.textContent = text;
  } else {
    // Expect format "username: message"
    const [name, ...msgParts] = text.split(":");
    const usernameEl = document.createElement("b");
    usernameEl.classList.add("username");
    usernameEl.textContent = name;
    div.appendChild(usernameEl);
    div.appendChild(document.createTextNode(":" + msgParts.join(":")));
  }
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "login", username }));
    appendMessage(`[Connected as ${username}]`, true);
  };

  ws.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      if (msg.type === "message") {
        appendMessage(`${msg.username}: ${msg.text}`);
      } else if (msg.type === "system") {
        appendMessage(msg.text, true);
      }
    } catch {
      appendMessage(e.data, true);
    }
  };

  ws.onclose = () => appendMessage("[Disconnected]", true);
  ws.onerror = () => appendMessage("[Error]", true);

  chatSend.onclick = () => {
    const text = chatInput.value.trim();
    if (!text || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "message", text }));
    chatInput.value = "";
  };

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") chatSend.click();
  });
}

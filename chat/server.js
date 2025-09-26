const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });
console.log("✅ WebSocket server running on ws://192.168.0.103:8080");

wss.on("connection", (ws) => {
  let username = null;

  ws.on("message", (message) => {
    let data;
    try {
      data = JSON.parse(message.toString());
    } catch {
      ws.send(JSON.stringify({ type: "system", text: "Invalid message format" }));
      return;
    }

    // LOGIN
    if (data.type === "login") {
      username = data.username?.trim() || "Guest";
      ws.send(JSON.stringify({ type: "system", text: `You are now known as ${username}` }));
      return;
    }

    // CHAT MESSAGE
    if (data.type === "message") {
      if (!username) {
        ws.send(JSON.stringify({ type: "system", text: "Please login first" }));
        return;
      }

      const payload = {
        type: "message",
        username,
        text: data.text
      };

      // Broadcast to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(payload));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log(`${username || "A user"} disconnected`);
  });
});

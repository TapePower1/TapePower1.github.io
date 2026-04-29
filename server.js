// server.js
const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ WebSocket-сервер запущен на порту ${PORT}`);

wss.on('connection', (ws) => {
  console.log('➕ Новый клиент подключился');

  ws.on('message', (data) => {
    // Рассылаем полученное сообщение всем клиентам, включая отправителя
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => console.log('➖ Клиент отключился'));
});

import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

const rooms = new Map(); // room => Set(ws)

function broadcast(room, data, except) {
  for (const client of rooms.get(room) || []) {
    if (client !== except && client.readyState === client.OPEN) client.send(JSON.stringify(data));
  }
}

wss.on("connection", (ws, req) => {
  let room = null;
  ws.on("message", msg => {
    const { type, payload } = JSON.parse(msg);
    if (type === "join") {
      room = payload.room || "global";
      const isNewRoom = !rooms.has(room);
      if (isNewRoom) rooms.set(room, new Set());
      const roomSize = rooms.get(room).size;
      rooms.get(room).add(ws);
      
      // Broadcast user join event to others in room
      broadcast(room, { 
        type: "user-joined", 
        payload: { 
          room, 
          userCount: roomSize + 1,
          isSecondUser: roomSize === 1 // true if this is the second person to join
        } 
      }, ws);
    }
    if (type === "set-language" && room) {
      broadcast(room, { type: "peer-language", payload: { language: payload.language } }, ws);
    }
  });
  ws.on("close", () => {
    if (room && rooms.get(room)) {
      rooms.get(room).delete(ws);
      if (!rooms.get(room).size) rooms.delete(room);
    }
  });
});
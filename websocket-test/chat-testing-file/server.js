// server.js

import { CHAR_ZERO_WIDTH_NOBREAK_SPACE } from "https://deno.land/std@0.151.0/path/_constants.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const connectedClients = new Map();

const app = new Application();
const port = 8080;
const router = new Router();

// send a message to all connected clients
function broadcast(message) {
  for (const client of connectedClients.values()) {
    client.send(message);
  }
}

// send updated users list to all connected clients
function broadcast_usernames() {
  const usernames = [...connectedClients.keys()];
  if (usernames.length >= 1) {
    console.log(`usernames[0] = ${usernames[0]}`);
  }
  console.log(
    "Sending updated username list to all clients: " +
      JSON.stringify(usernames),
  );
  broadcast(
    JSON.stringify({
      event: "update-users",
      usernames: usernames,
    }),
  );
}

router.get("/start_web_socket", async (ctx) => {
  const socket = await ctx.upgrade();
  const username = ctx.request.url.searchParams.get("username"); // get username from url (?username="username")
  if (connectedClients.has(username)) {
    socket.close(1008, `Username ${username} is already taken`); // kick if username is already taken
    return;
  }
  socket.username = username; // store username in socket.username <- socket.(username) is key to get the username
  console.log(`socket.username: ${socket.username}`);
  //localStorage.setItem("name", username); // save in localStorage
  //if((userCheck.length === 0) && (userCheck.length <= 1)){
  //  userCheck.append(username); // check here bro
  //}
  connectedClients.set(username, socket);
  console.log(`New client connected: ${username}`);

  // broadcast the active users list when a new user logs in
  socket.onopen = () => {
    broadcast_usernames();
    if (localStorage.getItem("useruser") !== null) {
      localStorage.removeItem("useruser");
    }
  };

  // when a client disconnects, remove them from the connected clients list
  // and broadcast the active users list
  socket.onclose = () => {
    console.log(`Client ${socket.username} disconnected`);
    connectedClients.delete(socket.username);
    broadcast_usernames();
  };

  // broadcast new message if someone sent one
  socket.onmessage = (m) => {
    const data = JSON.parse(m.data);
    console.log(`data = ${data.message}`);
    switch (data.event) {
      case "send-message":
        broadcast(
          JSON.stringify({
            event: "send-message",
            username: socket.username,
            message: data.message,
          }),
        );
        break;

      case "qr-reader":
        const userA = data.userA; // the user's name who read the qr
        const userB = data.userB; // user who showed the qr
        if (localStorage.getItem("useruser") === null) { // if there was no user who sent the data(qr read) first
          const userAB = [userA, userB];
          localStorage.setItem("useruser", userAB);
        } else if (localStorage.getItem("useruser") !== null) {
          const userAB = [userA, userB];
          const userBA = localStorage.getItem("useruser");
          if ((userAB[1] === userBA[1])) {
            localStorage.removeItem("useruser");
            for (const client of connectedClients.values()) {
              client.send(
                JSON.stringify({
                  event: "userOK",
                  isOK: "GOOD",
                }),
              );
            }
          } else {
            for (const client of connectedClients.values()) {
              client.send(
                JSON.stringify({
                  event: "userOK",
                  isOK: "BRUH",
                }),
              );
            }
          }
        }
        break;
    }
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/`,
    index: "public/index.html",
  });
});

console.log("Listening at http://localhost:" + port);
await app.listen({ port });

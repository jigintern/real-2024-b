import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

Deno.serve({
  port: 8080,
  handler: async (req) => {
    // If the req is a websocket upgrade,
    // we need to use the Deno.upgradeWebSocket helper
    if (req.headers.get("upgrade") === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(req);

      socket.onopen = () => {
        console.log("CONNECTED");
      };
      socket.onmessage = (event) => {
        console.log(`RECEIVED: ${event.data}`);
        socket.send("pong");
      };
      socket.onclose = () => console.log("DISCONNECTED");
      socket.onerror = (error) => console.error("ERROR:", error);

      return response;
    } else {
      // If the req is a normal HTTP req,
      // we serve the client HTML file.
      return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
      });
    }
  },
});

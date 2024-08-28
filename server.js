// https://deno.land/std@0.194.0/http/server.ts?s=serve

import { serve } from "http/server.ts";
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from "http/file_server.ts";
import { load } from "https://deno.land/std@0.203.0/dotenv/mod.ts"
const waitingList = new Map();  
const clientsMap = new Map();   // all clients
/**
 * APIリクエストを処理する
 */
Deno.serve({
  port: 8080,
  handler: async (req) => {
    if (req.headers.get("upgrade") === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(req);

      socket.onopen = () => {
        // 接続したときの処理
        console.log("CONNECTED");
        socket.send(JSON.stringify({
          event: "connected",
        }));
      };
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        // 受信したときの処理
        switch (data.event) {
          // 送ってきた“もの”のイベント類
          case "matching-request": //
            // Todo: マッチング待ちの時の処理
            socket.send("send-success");
            break;
        }
      };
      socket.onclose = () => console.log("DISCONNECTED"); // 接続が終わったときの処理

      socket.onerror = (error) => console.error("ERROR:", error); // エラーが発生したときの処理

      return response;
    } else {
      const pathname = new URL(req.url).pathname;
      console.log(pathname);

      // publicフォルダ内にあるファイルを返す
      return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
      });
    }
  },
});

async function getkvData(){
  return await Deno.openKv(Deno.env.get(URL));
}

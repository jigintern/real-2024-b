// https://deno.land/std@0.194.0/http/server.ts?s=serve

import { serve } from "http/server.ts";
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from "http/file_server.ts";
import "https://deno.land/std@0.203.0/dotenv/mod.ts";

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
          case "matching-request": 
            clientsMap.set(data.myName, socket);
            console.log(`matching-request received! user-data: ${data.myName},${data.pairName},${data.pairActive}`);
            const previousName = waitingList.get(data.pairName);  // get previous user's name
            if((previousName != null) && (previousName === data.myName)){
              // マッチングに成功した時の処理
              const json = JSON.stringify({event: "matching-success", pairName: data.pairName, pairActive: data.pairActive});
              const clientA = clientsMap.get(data.myName);
              clientA.send(json);
              const clientB = clientsMap.get(data.pairName);
              clientB.send(json);
            }else{
              // マッチング待ちの時の処理
              waitingList.set(data.myName, data.pairName);
              const json = JSON.stringify({event: "send-success"});
              socket.send(json);
            }
            break;

          default:
            break;
        }
      };
      socket.onclose = () => {
        console.log("DISCONNECTED"); // 接続が終わったときの処理
        clientsMap.clear(); // 接続が切れたらデータを消すようにしている
        waitingList.clear();
        }
      
      socket.onerror = (error) => console.error("ERROR:", error); // エラーが発生したときの処理

      return response;
  
    }else{
      const pathname = new URL(req.url).pathname;
      console.log(pathname);

      if(req.method == "POST" && pathname === "/activity"){
        // アクティビティの保存処理aaaaa
        const dbClient = getkvData();
        console.log(await dbClient);

        const dateNow = new Date();
        const timeNow = dateNow.toISOString();

        const json = await req.json();
        const username = json["user_name"];
        const activity = json["activity"];
        // pngをjpegに変えること
        const image = json["image"];

        saveAll(await dbClient, username, activity, image, timeNow);
      }

      // publicフォルダ内にあるファイルを返す
      return serveDir(req, {

        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
      });
    }
  }
});

async function getkvData(){
  return await Deno.openKv(Deno.env.get("URL"));
}

async function saveAll(kv, username, activity, icon, time){
  await kv.set(
    ["username", username, "activity", activity, "image"],
    {
        img: icon,
        time: time
    }
  );
}

async function getActivityImage(kv, username, activity){
  const actGet = await kv.get(["username", username, "activity", activity, "image"]);
  return actGet.value;
}
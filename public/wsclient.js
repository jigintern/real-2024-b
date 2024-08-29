const uri = new URL(window.location.href);
const myUsername = localStorage.getItem('name');
const protocol = uri.host === "localhost:8080" ? "ws" : "wss";
const socket = new WebSocket(  
    `${protocol}://${uri.host}/start_web_socket?username=${myUsername}`, // put username from url
);

socket.onmessage = (m) => {
  // 接続したときの処理
  const data = JSON.parse(m.data);

  switch (data.event) {
    
    // 送ってきた“もの”のイベント類
    case "connected": 
      // Todo: 接続成功した時の処理
      break;

    case "matching-success":
      const pairName = data.pairName; 
      const pairActive = data.pairActive; 
      localStorage.setItem("pairName", pairName);
      localStorage.setItem("pairActive", pairActive);
      console.log(pairActive);
      // Todo: マッチング成功したときの処理
      audio.play();
      // Add an event listener for the 'ended' event
      audio.addEventListener('ended', function() {
        // Change the page only after the audio has finished playing
        window.location.href = "/match.html";
      });
      break;
    case "send-success":
      // Todo: 送信成功した時の処理
      // Todo: heyhey by ikebou
      break;
  }
};

// sendPair(自分の名前、相手の名前、相手の出来事)でサーバに送信する
function sendPair(myName, pairName, pairActive){
  socket.send(
    JSON.stringify({
      event: "matching-request",
      myName: myName,
      pairName: pairName,
      pairActive: pairActive,
    }),
  );
}
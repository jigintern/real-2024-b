// app.js

const myUsername = prompt("Please enter your name") || "Anonymous";
localStorage.setItem("Username", myUsername);
console.log(`Username stored here: ${localStorage.getItem("Username")}`);
const socket = new WebSocket(
  `ws://localhost:8080/start_web_socket?username=${myUsername}`, // put username from url
);
//const clown = localStorage.setItem("user-name", myUsername);  // store username in localstorage
//console.log(`Username stored here: ${clown}`);

socket.onmessage = (m) => {
  const data = JSON.parse(m.data);

  switch (data.event) {
    case "update-users":
      // refresh displayed user list
      let userListHtml = "";
      for (const username of data.usernames) {
        userListHtml += `<div> ${username} </div>`;
      }
      document.getElementById("users").innerHTML = userListHtml;
      break;

    case "send-message":
      // display new chat message
      addMessage(data.username, data.message);
      break;

    case "userOK":
      if (data.isOK == "GOOD") {
        document.getElementById("readTheQr").innerHTML = "YEABOI";
      } else {
        document.getElementById("readTheQr").innerHTML = "BRUHLOL";
      }
      break;
  }
};

function readQr() { // read the qr
  userA = localStorage.getItem("user-name");
  let qrRead = "98456"; // info from qr (user/client B's UID)
  socket.send(
    JSON.stringify({
      event: "qr-reader",
      userA: userA, // I read this qr !
      userB: qrRead, // The person I read!
    }),
  );
  console.log("qrRead!!");
}

function addMessage(username, message) {
  // displays new message
  document.getElementById(
    "conversation",
  ).innerHTML += `<b> ${username} </b>: ${message} <br/>`;
}

// on page load
window.onload = () => {
  // when the client hits the ENTER key
  document.getElementById("send-message").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("send-message");
      var message = inputElement.value;
      inputElement.value = "";
      socket.send(
        JSON.stringify({
          event: "send-message",
          message: message,
        }),
      );
    }
  });
};

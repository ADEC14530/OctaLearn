const { Client, Storage, ID } = Appwrite;

const client = new Client().setProject("675d98b10002e645460a");

const storage = new Storage(client);

function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}
function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

const params = new URLSearchParams(window.location.search);
const fileId = params.get("file");
const bucketId = params.get("buckID");
var loading = false;

const fileViewURL = storage.getFileView(bucketId, fileId);

function send(event) {
  if (
    (event.key === "Enter" || event.type === "click") &&
    !loading &&
    fileViewURL
  ) {
    loading = true;
    const input = document.getElementById("input");
    const message = input.value.trim();
    if (message) {
      const chat = document.getElementById("chat");
      const userMessage = document.createElement("div");
      userMessage.className = "user-message";
      userMessage.textContent = message;
      chat.appendChild(userMessage);
      input.value = "";
      chat.scrollTop = chat.scrollHeight;

      sendMessage(message, fileViewURL);
    }
  }
}

function sendMessage(message, fileViewURL) {
  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = "Thinking...";
  const chat = document.getElementById("chat");
  chat.appendChild(botMessage);

  fetch("https://octa-um8u.onrender.com/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: message,
      file_url: fileViewURL,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      response = data["response"];
      botMessage.textContent = response;
      chat.scrollTop = chat.scrollHeight;
      loading = false;
    })
    .catch((error) => {
      fetch("https://octa-um8u.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          file_url: fileViewURL,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          response = data["response"];
          botMessage.textContent = response;
          chat.scrollTop = chat.scrollHeight;
          loading = false;
        })
        .catch((error) => {
          botMessage.textContent = "Error";
          chat.scrollTop = chat.scrollHeight;
          loading = false;
        });
    });
}

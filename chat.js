const { Client, Storage } = Appwrite;

// Initialize Appwrite
const client = new Client().setProject("675d98b10002e645460a");
const storage = new Storage(client);

// Read URL parameters safely
const params = new URLSearchParams(window.location.search);

// Accept multiple possible URL formats
const fileId =
  params.get("file") ||
  params.get("fileId") ||
  params.get("f");

const bucketId =
  params.get("bucket") ||
  params.get("bucketId") ||
  params.get("buckID") ||
  params.get("b");

let loading = false;

// Build file URL (if available)
let fileViewURL = null;
if (fileId && bucketId) {
  try {
    fileViewURL = storage.getFileView(bucketId, fileId);
  } catch (err) {
    console.log("Error generating file URL:", err);
  }
}

function send(event) {
  // Only send when user presses Enter or clicks icon
  if (!(event.key === "Enter" || event.type === "click")) return;
  if (loading) return;

  const input = document.getElementById("input");
  const message = input.value.trim();
  if (!message) return;

  loading = true;

  // Add user message to chat
  const chat = document.getElementById("chat");
  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = message;
  chat.appendChild(userMessage);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  sendMessage(message);
}

function sendMessage(message) {
  const chat = document.getElementById("chat");

  // Show bot "Thinking" message
  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = "Thinking...";
  chat.appendChild(botMessage);

  // Send request to your AI backend
  fetch("https://octa-um8u.onrender.com/ask", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      question: message,
      file_url: fileViewURL || null
    })
  })
    .then(res => res.json())
    .then(data => {
      botMessage.textContent = data.response || "No response from AI.";
    })
    .catch(err => {
      console.log("AI Error:", err);
      botMessage.textContent = "Error contacting AI server.";
    })
    .finally(() => {
      loading = false;
      chat.scrollTop = chat.scrollHeight;
    });
}

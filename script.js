function addMessage(role, content) {
  const chat = document.getElementById("chat");
  const message = document.createElement("div");
  message.style.marginBottom = "16px";
  message.textContent = `${role === "user" ? "👤" : "🤖"} ${content}`;
  chat.appendChild(message);
}

function autoResizeTextarea() {
  const textarea = document.getElementById("input");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function toggleSendButton() {
  const input = document.getElementById("input");
  const sendBtn = document.getElementById("send");

  if (input.value.trim() === "") {
    sendBtn.disabled = true;
    sendBtn.style.opacity = 0.4;
    sendBtn.style.cursor = "default";
  } else {
    sendBtn.disabled = false;
    sendBtn.style.opacity = 1;
    sendBtn.style.cursor = "pointer";
  }
}

async function sendMessage() {
  const input = document.getElementById("input").value.trim();
  if (!input) return;

  addMessage("user", input);
  document.getElementById("input").value = "";

  addMessage("assistant", "Sending...");

  try {
    const res = await fetch("https://we-do-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();

    // Replace "Sending..." with the real response
    const chat = document.getElementById("chat");
    chat.lastChild.textContent = `🤖 ${data.response}`;
  } catch (err) {
    const chat = document.getElementById("chat");
    chat.lastChild.textContent = `❌ Error: ${err.message}`;
  }
}

// Show the initial assistant message when page loads
window.addEventListener("DOMContentLoaded", () => {
  // Start the assistant with an opening message
  addMessage("assistant", "Hello! How can I assist you with your custom storage organizer needs today?");

  // Get the textarea element
  const input = document.getElementById("input");

  // Run both functions once at load
  autoResizeTextarea();
  toggleSendButton();

  // Run them again whenever the user types
  input.addEventListener("input", () => {
    autoResizeTextarea();
    toggleSendButton();
  });
});


 window.sendMessage = sendMessage;

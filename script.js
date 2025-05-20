function addMessage(role, content) {
  const chat = document.getElementById("chat");
  const message = document.createElement("div");
  message.style.marginBottom = "16px";
  message.textContent = `${role === "user" ? "👤" : "🤖"} ${content}`;
  chat.appendChild(message);
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
  addMessage("assistant", "Hello! How can I assist you with your custom storage organizer needs today?");
});
 window.sendMessage = sendMessage;

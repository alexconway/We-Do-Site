async function sendMessage() {
  const input = document.getElementById("input").value.trim();
  const responseEl = document.getElementById("response");

  if (!input) {
    responseEl.textContent = "Please enter a message.";
    return;
  }

  responseEl.textContent = "Sending...";

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
    responseEl.textContent = data.response || JSON.stringify(data, null, 2);
  } catch (err) {
    responseEl.textContent = `Error: ${err.message}`;
  }
}

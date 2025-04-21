let display = document.getElementById("calc-display");

function press(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  const secretCode = "0420"; // 🕵️‍♂️ secret code to unlock AI
  if (display.value === secretCode) {
    document.getElementById("calc").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
  } else {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  const userMessage = input.value;
  output.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = "";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant disguised as a calculator. Be friendly and a little funny."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await res.json();
  const botReply = data.choices[0].message.content;
  output.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
  output.scrollTop = output.scrollHeight;
}

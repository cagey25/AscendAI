import React, { useState } from 'react';

export default function Coach() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'How can I help you today, recruit?' },
  ]);
  const [input, setInput] = useState('');

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Placeholder "AI" response — this is where we'll plug in a real API call next
    setTimeout(() => {
      const reply = generateReply(userMsg.text);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 500);
  }

  function generateReply(userText) {
    if (userText.toLowerCase().includes('motivat')) {
      return 'Motivation is temporary. Discipline is what makes you dangerous. Start with one mission.';
    }
    return 'Understood, recruit. What is the first mission you will complete today?';
  }

  return (
    <div>
      <h1 className="screen-title">AI Coach</h1>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
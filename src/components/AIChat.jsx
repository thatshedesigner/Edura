import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, ChevronRight } from 'lucide-react';
import './AIChat.css';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Edura's AI assistant. I can help you find the right path. Try asking me something like 'Which exam should I take for Engineering?' or 'Suggest some scholarships for medical students'.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('engineering')) {
        botResponse = "For engineering in India, JEE Main and JEE Advanced are the premier exams. You might also want to look into BITSAT or state-level exams like MHT-CET or KCET. Would you like to see our Engineering list?";
      } else if (lowerInput.includes('scholarship')) {
        botResponse = "There are several scholarships like the Reliance Foundation Scholarship or the HDFC Badhte Kadam Scholarship currently open. Check out the 'Scholarships' category in our discovery page!";
      } else if (lowerInput.includes('medical')) {
        botResponse = "NEET UG is the primary exam for medical studies. You can also explore internships at top hospitals or research institutes like AIIMS. Looking for something specific in medical?";
      } else {
        botResponse = "That's a great question! I recommend exploring our 'Career Paths' section to get a broader view of different industries, or you can use our 'Compare' tool to see how different exams stack up.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`ai-chat-container ${isOpen ? 'open' : ''}`}>
      {/* Floating Bubble */}
      {!isOpen && (
        <button className="chat-bubble btn-primary" onClick={() => setIsOpen(true)}>
          <Sparkles size={24} />
          <span className="bubble-text">Ask Edura AI</span>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel glass-card animate-fade">
          <header className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar glass">
                <Bot size={20} />
              </div>
              <div className="bot-text">
                <h3>Edura AI Assistant</h3>
                <span>Always online</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </header>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-icon">
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="message-bubble glass">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-icon"><Bot size={14} /></div>
                <div className="message-bubble glass typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <div className="suggestions">
              <button 
                className="suggestion-pill glass" 
                onClick={() => { setInput("Best engineering exams?"); handleSend(); }}
              >
                Top exams <ChevronRight size={14} />
              </button>
              <button 
                className="suggestion-pill glass"
                onClick={() => { setInput("Scholarships in India?"); handleSend(); }}
              >
                Scholarships <ChevronRight size={14} />
              </button>
            </div>
            <div className="input-box glass">
              <input 
                type="text" 
                placeholder="Ask about career paths..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={handleSend}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

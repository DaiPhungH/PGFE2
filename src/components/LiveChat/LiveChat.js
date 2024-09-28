import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LiveChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [username, setUsername] = useState("Người dùng"); // Tên người dùng

  // Danh sách câu trả lời tự động
  const autoResponses = [
    "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
    "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ trả lời sớm nhất.",
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Thêm tin nhắn của người dùng vào
      setMessages([...messages, { sender: username, text: inputMessage }]);
      
      // Reset ô nhập liệu
      setInputMessage("");

      // Gọi hàm phản hồi tự động sau 1.5 giây
      setTimeout(() => {
        const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
        setMessages(prevMessages => [...prevMessages, { sender: "Support", text: randomResponse }]);
      }, 1500);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Hàm để tắt chat và reset lại tin nhắn
  const handleCloseChat = () => {
    setIsChatOpen(false);   // Đóng cửa sổ chat
    setMessages([]);        // Xóa tất cả tin nhắn
    setInputMessage("");    // Xóa input hiện tại
  };

  return (
    <div style={styles.liveChat}>
      <div style={{ ...styles.chatBox, ...(isChatOpen ? styles.chatBoxOpen : styles.chatBoxClosed) }}>
        <div style={styles.chatHeader} onClick={toggleChat}>
          <i className="fas fa-comments" style={styles.icon}></i>
          {isChatOpen ? (
            <>
              <span>Tư vấn trực tuyến (Đang hoạt động)</span>
              <button style={styles.closeButton} onClick={handleCloseChat}>
                <i className="fas fa-times"></i>
              </button>
            </>
          ) : (
            <span>Tư vấn trực tuyến</span>
          )}
        </div>
        {isChatOpen && (
          <div style={styles.chatBody}>
            <div style={styles.chatMessages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{ 
                    ...styles.chatMessage, 
                    ...(msg.sender === username ? styles.userMessage : styles.supportMessage) 
                  }}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.chatInput}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                <i className="fas fa-paper-plane"></i> {/* Icon gửi */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  liveChat: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    fontFamily: 'Arial, sans-serif',
    zIndex: 1000,
  },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease, height 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  chatBoxClosed: {
    width: '185px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  chatBoxOpen: {
    width: '300px',
    height: '400px',
  },
  chatHeader: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
  chatBody: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    maxHeight: 'calc(100% - 50px)', // Để phần body không tràn quá khung
    flexGrow: 1, // Để body chiếm không gian còn lại
  },
  chatMessages: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '10px', // Giữ khoảng cách với input
  },
  chatMessage: {
    marginBottom: '10px',
  },
  userMessage: {
    textAlign: 'right',
    color: 'blue',
  },
  supportMessage: {
    textAlign: 'left',
    color: 'green',
  },
  chatInput: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flexGrow: 1,
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  sendButton: {
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LiveChatComponent;

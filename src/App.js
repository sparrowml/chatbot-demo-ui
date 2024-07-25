import React from "react";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function App() {
  const [messages, setMessages] = React.useState([]);

  const handleNewMessage = async (innerHtml, _, __) => {
    setMessages([
      ...messages,
      {
        message: innerHtml,
        direction: "outgoing",
      },
      {
        message: "...",
        direction: "incoming",
      },
    ]);
    const response = await axios.post("http://localhost:5000/openai/invoke", {
      input: { input: innerHtml },
    });
    if (response.data.output?.output) {
      setMessages([
        ...messages,
        {
          message: innerHtml,
          direction: "outgoing",
        },
        {
          message: response.data.output.output,
          direction: "incoming",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "500px", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message) => (
                <Message model={message} key={message.message} />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              attachButton={false}
              onSend={handleNewMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;

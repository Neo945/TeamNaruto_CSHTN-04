import React, { useEffect } from "react";
import Message from "./Sections/Message";
import { List, Icon, Avatar } from "antd";
import Card from "./Sections/Card";
function Chatbot(params) {
  const [messages, setMessages] = React.useState([]);
  useEffect(() => {
    eventQuery("Welcome");
  }, []);

  const textQuery = async (text) => {
    let conversation = {
      who: params.user.username,
      content: {
        text: {
          text: text,
        },
      },
    };
    setMessages([...messages, conversation]);

    try {
      const resType = await fetch("http://localhost:5000/api/message/send", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await resType.json();
      conversation = {
        who: "bot",
        content: response.message,
      };
      setMessages([...messages, conversation]);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      setMessages([...messages, conversation]);
    }
  };

  const eventQuery = async (event) => {
    try {
      const resType = await fetch("http://localhost:5000/api/message/event", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await resType.json();
      let conversation = {
        who: "bot",
        content: response.message,
      };
      setMessages([...messages, conversation]);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      setMessages([...messages, conversation]);
    }
  };

  const keyPressHanlder = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type somthing first");
      }

      textQuery(e.target.value);

      e.target.value = "";
    }
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };

  const renderOneMessage = (message, i) => {
    console.log("message", message);

    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {
      const AvatarSrc =
        message.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

      return (
        <div>
          <List.Item style={{ padding: "1rem" }}>
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={renderCards(
                message.content.payload.fields.card.listValue.values
              )}
            />
          </List.Item>
        </div>
      );
    }
  };

  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messages)}
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;

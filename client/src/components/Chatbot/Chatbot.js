import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Wave from "react-wavify";
import chat from "./chat.png";

function Chatbot(params) {
  const [messages, setMessages] = React.useState([]);
  console.log(params);
  useEffect(() => {
    fetch(`http://localhost:5000/api/message/get?limit=${1}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    eventQuery("Welcome");
    // textQuery("What can i buy?");
  }, []);
  const [show, setShow] = useState(true);
  const showBot = () => {
    setShow(!show);
  };
  const textQuery = async (text) => {
    try {
      const resType = await fetch("http://localhost:5000/api/message/send", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ message: text }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await resType.json();
      let convoUser = {
        who: response.user,
        content: text,
      };
      const convoBot = {
        who: "bot",
        content: response.message.response,
      };
      console.log(response);
      setMessages([...messages, convoUser, convoBot]);
    } catch (error) {
      const conversation = {
        who: "bot",
        content: " Error just occured, please check the problem",
      };
      setMessages([...messages, conversation]);
    }
  };

  const eventQuery = async (event) => {
    try {
      const resType = await fetch("http://localhost:5000/api/message/event", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          event,
        }),
      });
      const response = await resType.json();
      let conversation = {
        who: "bot",
        content: response.message.response,
      };
      console.log(response);
      setMessages([...messages, conversation]);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: " Error just occured, please check the problem",
      };
      console.log("error");
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

  //   const renderCards = (cards) => {
  //     return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  //   };

  //   const renderOneMessage = (message, i) => {
  //     console.log("message", message);

  //     if (message.content && message.content.text && message.content.text.text) {
  //       return (
  //         <Message key={i} who={message.who} text={message.content.text.text} />
  //       );
  //     } else if (message.content && message.content.payload.fields.card) {
  //       const AvatarSrc =
  //         message.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

  //       return (
  //         <div>
  //           <List.Item style={{ padding: "1rem" }}>
  //             <List.Item.Meta
  //               avatar={<Avatar icon={AvatarSrc} />}
  //               title={message.who}
  //               description={renderCards(
  //                 message.content.payload.fields.card.listValue.values
  //               )}
  //             />
  //           </List.Item>
  //         </div>
  //       );
  //     }
  //   };

  //   const renderMessage = (returnedMessages) => {
  //     if (returnedMessages) {
  //       return returnedMessages.map((message, i) => {
  //         return renderOneMessage(message, i);
  //       });
  //     } else {
  //       return null;
  //     }
  //   };
  console.log(messages);
  return (
    <>
      {!show ? (
        <>
          <div
            style={{
              width: 360,
              border: "none",
              position: "absolute",
              right: "5%",
              bottom: "20%",
            }}
          >
            <Card
              style={{
                borderRadius: "18px",
                borderRight: "2px solid #f79902",
                borderBottom: "2px solid #f79902",
              }}
            >
              <CardContent>
                <div>
                  <div
                    style={{
                      color: "black",
                      position: "absolute",
                      zIndex: 10,
                      marginTop: "1.9rem",
                    }}
                  >
                    <Typography variant="h6" component="h6" color="white">
                      ourGrocery
                    </Typography>
                    <br></br>
                    <Typography variant="h4" component="h4" color="white">
                      Hi Jay!
                    </Typography>
                  </div>

                  <Wave
                    fill="#f79902"
                    paused={false}
                    options={{
                      height: 20,
                      amplitude: 20,
                      speed: 0.2,
                      points: 3,
                    }}
                  />
                </div>
                <hr></hr>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                    maxHeight: 200,
                  }}
                >
                  {/* {renderMessage(messages)} */}
                  {messages.map((msg, i) => (
                    <div key={i}>{msg.content}</div>
                  ))}
                </div>
              </CardContent>
              <CardActions>
                <input
                  type="text"
                  className="textInput"
                  style={{
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    padding: "5px",
                    fontSize: "1rem",
                    border: "none",
                  }}
                  size="small"
                  placeholder="Send a message..."
                  onKeyPress={keyPressHanlder}
                />
                <Button size="small">send</Button>
              </CardActions>
            </Card>
          </div>
        </>
      ) : null}
      <div style={{ position: "absolute", right: "0%", top: "80%" }}>
        {!show ? (
          <img
            onClick={() => showBot()}
            style={{ marginRight: 20, marginTop: 10 }}
            src={chat}
            alt="chat"
          ></img>
        ) : (
          <img
            onClick={() => showBot()}
            width="110px"
            height="80px"
            src="https://cdn.dribbble.com/users/2585668/screenshots/10500391/media/2d0a20bb69688cd3fbb1160260e0e691.png?compress=1&resize=400x300"
            alt="chat"
          ></img>
        )}
      </div>
    </>
  );
}

export default Chatbot;

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Wave from "react-wavify";
import chat from "./chat.png";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
function Chatbot({ handleAddToCart, products, handleRemoveCart, cart, user }) {
    const [query, setQuery] = useState();
    const [messages, setMessages] = React.useState([]);
    // console.log(params);
    const [lang, setLang] = useState("en-US");
    const changeLanguage = (lang) => {
        setLang(lang);
    };
    // const [products, setProducts] = useState([]);

    // const fetchProducts = async () => {
    //   const { data } = await commerce.products.list();
    //   setProducts(data);

    // };

    useEffect(() => {
        fetch(`/api/message/get?limit=${1}`, {
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
            const resType = await fetch("/api/message/send", {
                method: "POST",
                credentials: "include",
                mode: "cors",
                body: JSON.stringify({ message: text, language: lang }),
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
            // console.log(response);
            setMessages([...messages, convoUser, convoBot]);
            console.log(cart);
            if (response.product) {
                // console.log(products)
                // products.map((prod)=>(
                //   prod.name===response.product ? handleAddToCart(prod.id,response.number) : null
                // ))
                products.forEach((prod) =>
                    prod.name === response.product
                        ? handleAddToCart(prod.id, 1)
                        : null
                );
            }
            if (response.Removeproduct) {
                console.log(response);
                console.log(products);
                cart.line_items.forEach((prod) =>
                    prod.product_name === response.Removeproduct
                        ? handleRemoveCart(prod.id)
                        : null
                );
            }
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
            const resType = await fetch("/api/message/event", {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    event,
                    language: lang,
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

    const sendText = () => {
        textQuery(query);
        setQuery("");
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
    // console.log(messages);
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
                            bottom: "15%",
                        }}
                    >
                        <Card
                            style={{
                                borderRadius: "18px",
                                borderRight: "2px solid #f79902",
                                borderBottom: "2px solid #f79902",
                            }}
                        >
                            <div style={{ float: "right" }}>
                                {lang === "hi" ? (
                                    <Button
                                        style={{
                                            borderRadius: 20,
                                            width: 18,
                                            height: 15,
                                            color: "rgb(89, 109, 240)",
                                            backgroundColor: "white",
                                            fontSize: 10,
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            changeLanguage("hi");
                                        }}
                                    >
                                        हिंदी
                                    </Button>
                                ) : (
                                    <Button
                                        style={{
                                            borderRadius: 20,
                                            width: 18,
                                            height: 15,
                                            backgroundColor:
                                                "rgb(89, 109, 240)",

                                            fontSize: 10,
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            changeLanguage("hi");
                                        }}
                                    >
                                        हिंदी
                                    </Button>
                                )}

                                {lang === "en-US" ? (
                                    <Button
                                        style={{
                                            borderRadius: 20,
                                            color: "rgb(89, 109, 240)",
                                            backgroundColor: "white",
                                            width: 10,
                                            height: 15,
                                            fontSize: 10,
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            changeLanguage("en-US");
                                        }}
                                    >
                                        ENG
                                    </Button>
                                ) : (
                                    <Button
                                        style={{
                                            borderRadius: 20,
                                            backgroundColor:
                                                "rgb(89, 109, 240)",
                                            width: 10,
                                            height: 15,
                                            fontSize: 10,
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            changeLanguage("en-US");
                                        }}
                                    >
                                        ENG
                                    </Button>
                                )}
                            </div>
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
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <img
                                                    src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
                                                    alt=""
                                                    height="25px"
                                                    style={{ borderRadius: 20 }}
                                                />
                                            </div>
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    component="h6"
                                                    color="white"
                                                >
                                                    ourGrocery
                                                </Typography>
                                            </div>
                                        </div>

                                        <br></br>
                                        <Typography
                                            variant="h5"
                                            component="h5"
                                            color="white"
                                        >
                                            Hi {user.username}!
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

                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        overflow: "auto",
                                        maxHeight: 200,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                        }}
                                    >
                                        <div>
                                            <Button
                                                style={{
                                                    border: "1px solid #f79902",
                                                    color: "#f79902",
                                                }}
                                                onClick={() => {
                                                    eventQuery("add_product");
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                style={{
                                                    border: "1px solid #f79902",
                                                    color: "#f79902",
                                                }}
                                                onClick={() => {
                                                    eventQuery(
                                                        "remove_product"
                                                    );
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                component={Link}
                                                to="/cart"
                                                style={{
                                                    border: "1px solid #f79902",
                                                    color: "#f79902",
                                                }}
                                            >
                                                View
                                            </Button>
                                        </div>
                                    </div>

                                    {messages.map((msg, i) => (
                                        <div key={i}>
                                            <div>
                                                {msg.who === "bot" ? (
                                                    <div>
                                                        <Avatar
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                clear: "both",
                                                            }}
                                                            src="https://cdn.dribbble.com/users/2585668/screenshots/10500391/media/2d0a20bb69688cd3fbb1160260e0e691.png?compress=1&resize=400x300"
                                                        />
                                                        <div
                                                            style={{
                                                                color: "white",
                                                                backgroundColor:
                                                                    "rgb(89, 109, 240)",
                                                                padding: 10,
                                                                float: "left",
                                                                borderRadius:
                                                                    "0px 20px 20px 20px",
                                                            }}
                                                        >
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            clear: "both",
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: "0%",
                                                            }}
                                                        >
                                                            <Avatar
                                                                style={{
                                                                    width: "20px",
                                                                    height: "20px",
                                                                }}
                                                            >
                                                                {
                                                                    msg.who.toUpperCase()[0]
                                                                }
                                                            </Avatar>
                                                        </div>

                                                        <div
                                                            style={{
                                                                color: "white",
                                                                backgroundColor:
                                                                    "#f79902",
                                                                padding: 10,
                                                                float: "right",
                                                                borderRadius:
                                                                    "20px 0px 20px 20px",
                                                                marginTop: 25,
                                                            }}
                                                        >
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardActions>
                                <input
                                    type="text"
                                    className="textInput"
                                    onChange={(e) => setQuery(e.target.value)}
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

                                <IconButton onClick={sendText}>
                                    <SendIcon />
                                </IconButton>
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

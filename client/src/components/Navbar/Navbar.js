import React from "react";
import {
    AppBar,
    IconButton,
    Badge,
    MenuItem,
    Menu,
    Button,
    Typography,
    Toolbar,
} from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
export default function Navbar({ totalItems }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        <img
                            src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
                            alt=""
                            height="25px"
                            className={classes.image}
                        />
                        ourGrocery
                    </Typography>

                    {location.pathname === "/" && (
                        <>
                            <div className={classes.button}>
                                <IconButton
                                    component={Link}
                                    to="/cart"
                                    aria-label="Show cart items"
                                    color="inherit"
                                >
                                    <Badge
                                        badgeContent={totalItems}
                                        color="secondary"
                                    >
                                        <ShoppingBasket />
                                    </Badge>
                                </IconButton>
                            </div>
                        </>
                    )}
                    {!(
                        location.pathname === "/login" &&
                        location.pathname === "/login"
                    ) ? (
                        <>
                            <Button
                                variant="text"
                                onClick={() => {
                                    fetch("/api/user/logout", {
                                        method: "GET",
                                        credentials: "include",
                                        mode: "cors",
                                        headers: {
                                            "Content-type": "application/json",
                                        },
                                    }).then((res) => {
                                        if (res.status === 200) {
                                            localStorage.setItem("user", null);
                                            window.location.href = "/";
                                        }
                                    });
                                }}
                            >
                                Logout
                            </Button>

                            <div className={classes.button}>
                                {/* <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                   <ShoppingBasket/>
                </Badge>
            </IconButton> */}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

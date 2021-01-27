import React, { useState, useContext, useEffect } from "react";
import { Link, Nav } from "./styles";
import { MdHome, MdPersonOutline, MdMessage, MdSearch } from "react-icons/md";
import Button from "@material-ui/core/Button";
import { Context } from "../../Context";
import { navigate } from "@reach/router";
import Badge from "@material-ui/core/Badge";

var chatModel = require("../../service/chatModel");

const firebaseApp = require("firebase/app");

const SIZE = "32px";

export const BottomBar = () => {
  var currentState = window.location.pathname;
  const { user, removeAuth, type } = useContext(Context);
  const [msgNotSeen, setMsgNotSeen] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const emailEdited = user.email.split(".").join(",");
      firebaseApp
        .database()
        .ref("/chats/" + emailEdited)
        .on("value", async function (snapshot) {
          setMsgNotSeen(await chatModel.obtenerCountNotSeen(user.email));
        });
    }
    fetchData();
  }, []);

  const menu = () => {
    switch (type) {
      case "PLAYER":
        return (
          <Nav>
            <Link to={`/player/home/${user.uid}`}>
              <MdHome size={SIZE} />
            </Link>
            <Link to={`/player/search/${user.uid}`}>
              <MdSearch size={SIZE} />
            </Link>
            <Link to={`/messages/${user.uid}`}>
              <Badge color="error" badgeContent={msgNotSeen}>
                <MdMessage size={SIZE} />
              </Badge>
            </Link>
            <Link to={`/player/profile/${user.uid}`}>
              <MdPersonOutline size={SIZE} />
            </Link>
          </Nav>
        );
      case "AGENT":
        return (
          <Nav>
            <Link to={`/agent/home/${user.uid}`}>
              <MdHome size={SIZE} />
            </Link>
            <Link to={`/agent/search/${user.uid}`}>
              <MdSearch size={SIZE} />
            </Link>
            <Link to={`/messages/${user.uid}`}>
              <Badge color="error" badgeContent={msgNotSeen}>
                <MdMessage size={SIZE} />
              </Badge>
            </Link>
            <Link to={`/agent/profile/${user.uid}`}>
              <MdPersonOutline size={SIZE} />
            </Link>
          </Nav>
        );
      case "CLUB":
        return (
          <Nav>
            <Link to={`/club/home/${user.uid}`}>
              <MdHome size={SIZE} />
            </Link>
            <Link to={`/club/search/${user.uid}`}>
              <MdSearch size={SIZE} />
            </Link>
            <Link to={`/messages/${user.uid}`}>
              <Badge color="error" badgeContent={msgNotSeen}>
                <MdMessage size={SIZE} />
              </Badge>
            </Link>
            <Link to={`/club/profile/${user.uid}`}>
              <MdPersonOutline size={SIZE} />
            </Link>
          </Nav>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {user && user.uid && type ? menu() : ""}
      {(!user || !user.uid) && (
        <Nav>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/registro");
            }}
          >
            Sign up
          </Button>
        </Nav>
      )}
    </>
  );
};

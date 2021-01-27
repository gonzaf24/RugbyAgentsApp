import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import PelotaImg from "../../assets/pelotaRugby.png";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import MenuLateral from "../../components/MenuLateral/menuLateral";

const useStyles = makeStyles((theme) => ({
  link: {
    alignItems: "center",
    color: "#fafffc",
    display: "inline-flex",
    height: "100%",
    textDecoration: "none",
  },
  link2: {
    marginRight: 5,
    justifyContent: "flex-end",
    color: "#fafffc",
    display: "inline-flex",
    height: "100%",
    textDecoration: "none",
    width: "100%",
    alignItems: "center",
    marginRight: "3%",
  },
  image: {
    marginLeft: "10px",
    width: 40,
    height: 40,
  },
  nav: {
    borderBottom: "0px",
    top: 0,
    display: "flex",
    height: "50px",
    left: 0,
    margin: "0px auto",
    maxWidth: "500px",
    position: "fixed",
    right: 0,
    width: "100%",
    zIndex: 100,
    backgroundColor: "#435b68",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  editButton: {
    whiteSpace: "break-spaces",
    fontSize: 10,
  },
  select: {
    color: "white",
  },
}));

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { changeLang, user, type } = useContext(Context);
  const [lang, setLang] = useState();

  return (
    <div>
      <nav className={classes.nav}>
        <div className={classes.link}>
          <img
            className={classes.image}
            src={PelotaImg}
            onClick={() => {
              switch (type) {
                case "PLAYER":
                  navigate(`/player/home/${user.uid}`);
                  break;
                case "AGENT":
                  navigate(`/agent/home/${user.uid}`);
                  break;
                case "CLUB":
                  navigate(`/club/home/${user.uid}`);
                  break;
                default:
                  navigate("/");
                  break;
              }
            }}
          />
        </div>
        <div className={classes.link2}>
          <MenuLateral />
        </div>
      </nav>
    </div>
  );
};

import React, { createContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useLocalStorage("isAuth", false);
  const [notificarSuscripcion, setNotificarSuscripcion] = useLocalStorage(
    "notificarSuscripcion",
    false
  );
  const [
    notificarCompletarInformacion,
    setNotificarCompletarInformacion,
  ] = useLocalStorage("notificarCompletarInformacion", false);
  const [player, setPlayer] = useLocalStorage("player", false);
  const [club, setClub] = useLocalStorage("club", false);
  const [agent, setAgent] = useLocalStorage("agent", false);
  const [type, setType] = useLocalStorage("type", false);
  const [user, setUser] = useLocalStorage("user", false);
  const [lenguaje, setLenguaje] = useLocalStorage("lenguaje", false);
  const [listaChats, setListaChats] = useLocalStorage("listaChats", false);

  const value = {
    user,
    notificarSuscripcion,
    notificarCompletarInformacion,
    type,
    isAuth,
    lenguaje,
    player,
    club,
    agent,
    listaChats,
    storeChats: (chats) => {
      setListaChats(chats);
    },
    userAuth: (user) => {
      setUser(user);
      setType(user.type);
    },
    activateAuth: (user) => {
      console.log(
        " ----------------------LOG IN-----------------> al CONTEXT : "
      );
      setIsAuth(true);
      setNotificarSuscripcion(user.notificarSuscripcion);
      setNotificarCompletarInformacion(user.notificarCompletarInformacion);
      setType(user.type);
      setUser(user);
      setPlayer(user.player);
      setClub(user.club);
      setAgent(user.agent);
      window.localStorage.setItem("tokenRA", user.token);
    },
    removeAuth: () => {
      console.log(
        " ----------m------------ LOG OUT -----------------> al CONTEXT : "
      );
      setIsAuth(false);
      setNotificarSuscripcion(null);
      setNotificarCompletarInformacion(null);
      setType(null);
      setUser(null);
      setPlayer(null);
      setClub(null);
      setAgent(null);
      window.localStorage.removeItem("tokenRA");
      window.localStorage.removeItem("lang");
    },
    changeLang(lang) {
      setLenguaje(lang);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};

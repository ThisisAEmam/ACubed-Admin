import React, { createContext, useState, useEffect } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return <Context.Provider value={{ isLoggedIn, setLoggedIn }}>{props.children}</Context.Provider>;
};

export default ContextProvider;

import React, { createContext, useState, useEffect } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);

  return <Context.Provider value={{ isLoggedIn, setLoggedIn, backPressCount, setBackPressCount }}>{props.children}</Context.Provider>;
};

export default ContextProvider;

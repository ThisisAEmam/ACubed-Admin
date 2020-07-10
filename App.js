import React from "react";
import Layout from "./Layout";
import ContextProvider from "./context/Context";

const App = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};

export default App;

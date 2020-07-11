import React from "react";
import Layout from "./Layout";
import ContextProvider from "./context/Context";
import axios from "axios";

axios.defaults.baseURL = "https://acubed-tech3.herokuapp.com/api";
axios.defaults.headers.common["Authorization"] = "Token ede5d5abcddd96dafe60b0e4059c03b4d4c754c5";

const App = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};

export default App;

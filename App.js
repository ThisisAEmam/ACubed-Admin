import React from "react";
import Layout from "./Layout";
import ContextProvider from "./context/Context";
import axios from "axios";

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://acubed-django.herokuapp.com/api";
axios.defaults.headers.common["Authorization"] = "Token fee106285cc7281c266b7d38df8e534a9e187492";

const App = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};

export default App;

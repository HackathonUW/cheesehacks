import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.render(
    <Auth0Provider
        domain="dev-rabog0rg.us.auth0.com"
        clientId="1s81WYDS1KwB1sakPw32j81LfnUSKktj"
        redirectUri={window.location.origin}
    >
    <ChakraProvider>
        <App />
    </ChakraProvider>
    </Auth0Provider>,
  document.getElementById("root")
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
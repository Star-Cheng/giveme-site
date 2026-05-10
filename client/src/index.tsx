import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./i18n/LangContext";
import App from "./app";
import "./index.css";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <BrowserRouter basename={routerBasename}>
        <App />
      </BrowserRouter>
    </LangProvider>
  </StrictMode>,
);

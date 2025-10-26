// import { StrictMode } from 'react'
import "antd/dist/reset.css"; // với Ant Design v5 trở lên
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TrelloProvider } from "./contexts/trello-context.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TrelloProvider>
    <App />
  </TrelloProvider>
  // </StrictMode>,
);

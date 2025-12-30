import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <NuqsAdapter>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        style: {
          background: "#363636",
          color: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 4px 14px rgba(0,0,0.25)",
          userSelect: "none",
        },

        // SUCCESS
        success: {
          duration: 4000,
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
        },

        // ERROR
        error: {
          duration: 4000,
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        },
      }}
    />
  </NuqsAdapter>
);

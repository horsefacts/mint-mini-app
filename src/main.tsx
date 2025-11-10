/**
 * Main entry point for the Farcaster mini app
 *
 * CONCEPT 1: Mini Apps are Standard Web Apps
 * This is a standard React app built with Vite. Nothing special here!
 * We use familiar web technologies: React, TypeScript, and CSS.
 *
 * The only requirements are:
 * - WagmiProvider: For Ethereum wallet connections
 * - QueryClientProvider: For managing async state (used by wagmi)
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);

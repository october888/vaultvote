// Polyfills for Node.js modules required by Zama SDK
import { Buffer } from "buffer";
import process from "process";
import EventEmitter from "events";

// Make them available globally for the Zama SDK
(window as any).Buffer = Buffer;
(window as any).process = process;
(window as any).EventEmitter = EventEmitter;

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Wait for RelayerSDK to load from CDN before initializing React app
async function initApp() {
  // Check if RelayerSDK is already loaded
  if ((window as any).RelayerSDK || (window as any).relayerSDK) {
    console.log('✅ RelayerSDK found, initializing app...');
    renderApp();
    return;
  }

  console.log('⏳ Waiting for RelayerSDK to load...');
  
  // Wait up to 10 seconds for SDK to load
  const maxWait = 10000;
  const checkInterval = 100;
  let waited = 0;

  const checkSDK = () => {
    if ((window as any).RelayerSDK || (window as any).relayerSDK) {
      console.log('✅ RelayerSDK loaded, initializing app...');
      renderApp();
      return;
    }

    waited += checkInterval;
    if (waited >= maxWait) {
      console.warn('⚠️ RelayerSDK did not load in time, proceeding anyway...');
      renderApp();
      return;
    }

    setTimeout(checkSDK, checkInterval);
  };

  checkSDK();
}

function renderApp() {
  createRoot(document.getElementById("root")!).render(<App />);
}

initApp();

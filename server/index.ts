import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Serve all WASM files with correct MIME type (before Vite middleware)
app.use((req, res, next) => {
  if (req.path.endsWith('.wasm')) {
    res.setHeader('Content-Type', 'application/wasm');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// Serve Zama SDK WASM files from public directory
app.use("/wasm", express.static(
  path.resolve(import.meta.dirname, "..", "client/public/wasm"),
  {
    setHeaders: (res) => {
      res.setHeader('Content-Type', 'application/wasm');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    }
  }
));

// Serve WASM files from node_modules (for development)
app.use("/node_modules", express.static(
  path.resolve(import.meta.dirname, "..", "node_modules"),
  {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      }
    }
  }
));

// Add CORS headers required for WASM threading (Zama FHE SDK)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  // Allow WebAssembly execution for FHE encryption
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; worker-src 'self' blob:; child-src 'self' blob:; img-src 'self' data: https:;");
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Serve worker helper files (needed by Zama SDK for WASM threading)
  app.get('/workerHelpers.js', (req, res) => {
    const workerPath = path.resolve(import.meta.dirname, '..', 'client/public/workerHelpers.worker.js');
    if (fs.existsSync(workerPath)) {
      res.setHeader('Content-Type', 'text/javascript');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      return res.sendFile(workerPath);
    }
    res.status(404).send('Worker file not found');
  });

  // Dedicated WASM file handler - must run BEFORE Vite's catch-all
  // This directly serves WASM files and prevents Vite from returning index.html
  // Handles both regular paths and Vite's /@fs/ prefixed paths
  app.get(/\.wasm$/, (req, res, next) => {
    
    // Decode and normalize the path
    let requestPath = decodeURIComponent(req.path);
    
    // Extract filename from request path
    const filename = path.basename(requestPath);
    
    // Check if this is a Vite /@fs/ prefixed path
    if (requestPath.startsWith('/@fs/')) {
      // Remove /@fs/ prefix and use the absolute path
      const absolutePath = requestPath.replace(/^\/@fs/, '');
      if (fs.existsSync(absolutePath) && absolutePath.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        return res.sendFile(absolutePath);
      }
    }
    
    // Check known WASM files from public directory
    const wasmFiles: Record<string, string> = {
      'tfhe_bg.wasm': path.resolve(import.meta.dirname, '..', 'client/public/tfhe_bg.wasm'),
      'kms_lib_bg.wasm': path.resolve(import.meta.dirname, '..', 'client/public/kms_lib_bg.wasm'),
    };
    
    const filePath = wasmFiles[filename];
    if (filePath && fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/wasm');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      return res.sendFile(filePath);
    }
    
    // Check node_modules directory
    const nodeModulesPath = path.resolve(import.meta.dirname, '..', 'node_modules', '@zama-fhe', 'relayer-sdk', 'bundle', filename);
    if (fs.existsSync(nodeModulesPath)) {
      res.setHeader('Content-Type', 'application/wasm');
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      return res.sendFile(nodeModulesPath);
    }
    
    next();
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

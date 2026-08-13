// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";

// src/lib/api-plugin.ts
import { loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import mongoose from "file:///home/project/node_modules/mongoose/index.js";
import bcrypt from "file:///home/project/node_modules/bcryptjs/index.js";
import jwt from "file:///home/project/node_modules/jsonwebtoken/index.js";
var JWT_EXPIRES_IN = "7d";
var userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
var User = null;
var mongoConnected = false;
var JWT_SECRET = "lumiere-dental-jwt-secret-2026";
var MONGODB_URI = "";
async function connectMongo(retries = 0) {
  if (!MONGODB_URI) {
    console.error("[api] MONGODB_URI not set");
    return;
  }
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 1e4,
      connectTimeoutMS: 1e4
    });
    User = conn.model("User", userSchema);
    mongoConnected = true;
    console.log("[api] MongoDB connected");
  } catch (err) {
    console.error(`[api] MongoDB attempt ${retries + 1} failed:`, err.message);
    if (retries < 10) {
      setTimeout(() => connectMongo(retries + 1), 3e3);
    }
  }
}
function jsonBody(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
async function handleAuthRequest(url, method, body, authHeader) {
  if (url === "/api/auth/signup" && method === "POST") {
    if (!mongoConnected || !User) return jsonBody(503, { error: "Database is connecting. Please try again in a moment." });
    const { email, password } = body;
    if (!email || !password) return jsonBody(400, { error: "Email and password are required" });
    if (password.length < 6) return jsonBody(400, { error: "Password must be at least 6 characters" });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return jsonBody(409, { error: "An account with this email already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), password: hashed });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return jsonBody(201, { token, user: { id: user._id, email: user.email } });
  }
  if (url === "/api/auth/signin" && method === "POST") {
    if (!mongoConnected || !User) return jsonBody(503, { error: "Database is connecting. Please try again in a moment." });
    const { email, password } = body;
    if (!email || !password) return jsonBody(400, { error: "Email and password are required" });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return jsonBody(401, { error: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return jsonBody(401, { error: "Invalid email or password" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return jsonBody(200, { token, user: { id: user._id, email: user.email } });
  }
  if (url === "/api/auth/verify" && method === "GET") {
    if (!mongoConnected || !User) return jsonBody(503, { error: "Database is connecting." });
    if (!authHeader || !authHeader.startsWith("Bearer ")) return jsonBody(401, { error: "No token provided" });
    try {
      const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
      const user = await User.findById(decoded.userId).select("email");
      if (!user) return jsonBody(401, { error: "User not found" });
      return jsonBody(200, { user: { id: user._id, email: user.email } });
    } catch {
      return jsonBody(401, { error: "Invalid or expired token" });
    }
  }
  return null;
}
function apiPlugin() {
  return {
    name: "api-auth",
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI || "";
      JWT_SECRET = env.JWT_SECRET || process.env.JWT_SECRET || JWT_SECRET;
      connectMongo();
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        const method = req.method || "GET";
        const url = req.url.split("?")[0];
        const authHeader = req.headers.authorization;
        let body = null;
        if (method === "POST" || method === "PUT") {
          try {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            body = JSON.parse(Buffer.concat(chunks).toString() || "{}");
          } catch {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON body" }));
            return;
          }
        }
        try {
          const result = await handleAuthRequest(url, method, body, authHeader);
          if (result) {
            res.writeHead(result.status, { "Content-Type": "application/json" });
            res.end(await result.text());
            return;
          }
        } catch (err) {
          console.error("[api] Error:", err.message);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Something went wrong. Please try again." }));
          return;
        }
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
      });
    }
  };
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2xpYi9hcGktcGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IHsgYXBpUGx1Z2luIH0gZnJvbSAnLi9zcmMvbGliL2FwaS1wbHVnaW4nO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGFwaVBsdWdpbigpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3Qvc3JjL2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9zcmMvbGliL2FwaS1wbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC9zcmMvbGliL2FwaS1wbHVnaW4udHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5jb25zdCBKV1RfRVhQSVJFU19JTiA9ICc3ZCc7XG5cbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxuICB7XG4gICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlLCBsb3dlcmNhc2U6IHRydWUsIHRyaW06IHRydWUgfSxcbiAgICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XG4pO1xuXG5sZXQgVXNlcjogbW9uZ29vc2UuTW9kZWw8YW55PiB8IG51bGwgPSBudWxsO1xubGV0IG1vbmdvQ29ubmVjdGVkID0gZmFsc2U7XG5sZXQgSldUX1NFQ1JFVCA9ICdsdW1pZXJlLWRlbnRhbC1qd3Qtc2VjcmV0LTIwMjYnO1xubGV0IE1PTkdPREJfVVJJID0gJyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RNb25nbyhyZXRyaWVzID0gMCkge1xuICBpZiAoIU1PTkdPREJfVVJJKSB7XG4gICAgY29uc29sZS5lcnJvcignW2FwaV0gTU9OR09EQl9VUkkgbm90IHNldCcpO1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IGNvbm4gPSBhd2FpdCBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCB7XG4gICAgICBzZXJ2ZXJTZWxlY3Rpb25UaW1lb3V0TVM6IDEwMDAwLFxuICAgICAgY29ubmVjdFRpbWVvdXRNUzogMTAwMDAsXG4gICAgfSk7XG4gICAgVXNlciA9IGNvbm4ubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKTtcbiAgICBtb25nb0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgY29uc29sZS5sb2coJ1thcGldIE1vbmdvREIgY29ubmVjdGVkJyk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihgW2FwaV0gTW9uZ29EQiBhdHRlbXB0ICR7cmV0cmllcyArIDF9IGZhaWxlZDpgLCBlcnIubWVzc2FnZSk7XG4gICAgaWYgKHJldHJpZXMgPCAxMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBjb25uZWN0TW9uZ28ocmV0cmllcyArIDEpLCAzMDAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24ganNvbkJvZHkoc3RhdHVzOiBudW1iZXIsIGJvZHk6IGFueSkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGJvZHkpLCB7XG4gICAgc3RhdHVzLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQXV0aFJlcXVlc3QodXJsOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBib2R5OiBhbnksIGF1dGhIZWFkZXI/OiBzdHJpbmcpIHtcbiAgaWYgKHVybCA9PT0gJy9hcGkvYXV0aC9zaWdudXAnICYmIG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgaWYgKCFtb25nb0Nvbm5lY3RlZCB8fCAhVXNlcikgcmV0dXJuIGpzb25Cb2R5KDUwMywgeyBlcnJvcjogJ0RhdGFiYXNlIGlzIGNvbm5lY3RpbmcuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJyB9KTtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYm9keTtcbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkgcmV0dXJuIGpzb25Cb2R5KDQwMCwgeyBlcnJvcjogJ0VtYWlsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnIH0pO1xuICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCA2KSByZXR1cm4ganNvbkJvZHkoNDAwLCB7IGVycm9yOiAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMnIH0pO1xuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogZW1haWwudG9Mb3dlckNhc2UoKSB9KTtcbiAgICBpZiAoZXhpc3RpbmcpIHJldHVybiBqc29uQm9keSg0MDksIHsgZXJyb3I6ICdBbiBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhbHJlYWR5IGV4aXN0cycgfSk7XG5cbiAgICBjb25zdCBoYXNoZWQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZSh7IGVtYWlsOiBlbWFpbC50b0xvd2VyQ2FzZSgpLCBwYXNzd29yZDogaGFzaGVkIH0pO1xuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyB1c2VySWQ6IHVzZXIuX2lkIH0sIEpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiBKV1RfRVhQSVJFU19JTiB9KTtcbiAgICByZXR1cm4ganNvbkJvZHkoMjAxLCB7IHRva2VuLCB1c2VyOiB7IGlkOiB1c2VyLl9pZCwgZW1haWw6IHVzZXIuZW1haWwgfSB9KTtcbiAgfVxuXG4gIGlmICh1cmwgPT09ICcvYXBpL2F1dGgvc2lnbmluJyAmJiBtZXRob2QgPT09ICdQT1NUJykge1xuICAgIGlmICghbW9uZ29Db25uZWN0ZWQgfHwgIVVzZXIpIHJldHVybiBqc29uQm9keSg1MDMsIHsgZXJyb3I6ICdEYXRhYmFzZSBpcyBjb25uZWN0aW5nLiBQbGVhc2UgdHJ5IGFnYWluIGluIGEgbW9tZW50LicgfSk7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGJvZHk7XG4gICAgaWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHJldHVybiBqc29uQm9keSg0MDAsIHsgZXJyb3I6ICdFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJyB9KTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogZW1haWwudG9Mb3dlckNhc2UoKSB9KTtcbiAgICBpZiAoIXVzZXIpIHJldHVybiBqc29uQm9keSg0MDEsIHsgZXJyb3I6ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyB9KTtcblxuICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgaWYgKCFpc01hdGNoKSByZXR1cm4ganNvbkJvZHkoNDAxLCB7IGVycm9yOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHsgdXNlcklkOiB1c2VyLl9pZCB9LCBKV1RfU0VDUkVULCB7IGV4cGlyZXNJbjogSldUX0VYUElSRVNfSU4gfSk7XG4gICAgcmV0dXJuIGpzb25Cb2R5KDIwMCwgeyB0b2tlbiwgdXNlcjogeyBpZDogdXNlci5faWQsIGVtYWlsOiB1c2VyLmVtYWlsIH0gfSk7XG4gIH1cblxuICBpZiAodXJsID09PSAnL2FwaS9hdXRoL3ZlcmlmeScgJiYgbWV0aG9kID09PSAnR0VUJykge1xuICAgIGlmICghbW9uZ29Db25uZWN0ZWQgfHwgIVVzZXIpIHJldHVybiBqc29uQm9keSg1MDMsIHsgZXJyb3I6ICdEYXRhYmFzZSBpcyBjb25uZWN0aW5nLicgfSk7XG4gICAgaWYgKCFhdXRoSGVhZGVyIHx8ICFhdXRoSGVhZGVyLnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkgcmV0dXJuIGpzb25Cb2R5KDQwMSwgeyBlcnJvcjogJ05vIHRva2VuIHByb3ZpZGVkJyB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkoYXV0aEhlYWRlci5zcGxpdCgnICcpWzFdLCBKV1RfU0VDUkVUKSBhcyBhbnk7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChkZWNvZGVkLnVzZXJJZCkuc2VsZWN0KCdlbWFpbCcpO1xuICAgICAgaWYgKCF1c2VyKSByZXR1cm4ganNvbkJvZHkoNDAxLCB7IGVycm9yOiAnVXNlciBub3QgZm91bmQnIH0pO1xuICAgICAgcmV0dXJuIGpzb25Cb2R5KDIwMCwgeyB1c2VyOiB7IGlkOiB1c2VyLl9pZCwgZW1haWw6IHVzZXIuZW1haWwgfSB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBqc29uQm9keSg0MDEsIHsgZXJyb3I6ICdJbnZhbGlkIG9yIGV4cGlyZWQgdG9rZW4nIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBpUGx1Z2luKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2FwaS1hdXRoJyxcbiAgICBjb25maWcoXywgeyBtb2RlIH0pIHtcbiAgICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICAgICAgTU9OR09EQl9VUkkgPSBlbnYuTU9OR09EQl9VUkkgfHwgcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkgfHwgJyc7XG4gICAgICBKV1RfU0VDUkVUID0gZW52LkpXVF9TRUNSRVQgfHwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBKV1RfU0VDUkVUO1xuICAgICAgY29ubmVjdE1vbmdvKCk7XG4gICAgfSxcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICBpZiAoIXJlcS51cmw/LnN0YXJ0c1dpdGgoJy9hcGkvJykpIHJldHVybiBuZXh0KCk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZCB8fCAnR0VUJztcbiAgICAgICAgY29uc3QgdXJsID0gcmVxLnVybC5zcGxpdCgnPycpWzBdO1xuICAgICAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcblxuICAgICAgICBsZXQgYm9keTogYW55ID0gbnVsbDtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY2h1bmtzOiBCdWZmZXJbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZXEpIGNodW5rcy5wdXNoKGNodW5rIGFzIEJ1ZmZlcik7XG4gICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoKSB8fCAne30nKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdJbnZhbGlkIEpTT04gYm9keScgfSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaGFuZGxlQXV0aFJlcXVlc3QodXJsLCBtZXRob2QsIGJvZHksIGF1dGhIZWFkZXIpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQocmVzdWx0LnN0YXR1cywgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgICAgcmVzLmVuZChhd2FpdCByZXN1bHQudGV4dCgpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignW2FwaV0gRXJyb3I6JywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uJyB9KSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzLndyaXRlSGVhZCg0MDQsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnTm90IGZvdW5kJyB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlLFdBQVc7OztBQ0RuQyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFFaEIsSUFBTSxpQkFBaUI7QUFFdkIsSUFBTSxhQUFhLElBQUksU0FBUztBQUFBLEVBQzlCO0FBQUEsSUFDRSxPQUFPLEVBQUUsTUFBTSxRQUFRLFVBQVUsTUFBTSxRQUFRLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSztBQUFBLElBQ2pGLFVBQVUsRUFBRSxNQUFNLFFBQVEsVUFBVSxLQUFLO0FBQUEsRUFDM0M7QUFBQSxFQUNBLEVBQUUsWUFBWSxLQUFLO0FBQ3JCO0FBRUEsSUFBSSxPQUFtQztBQUN2QyxJQUFJLGlCQUFpQjtBQUNyQixJQUFJLGFBQWE7QUFDakIsSUFBSSxjQUFjO0FBRWxCLGVBQWUsYUFBYSxVQUFVLEdBQUc7QUFDdkMsTUFBSSxDQUFDLGFBQWE7QUFDaEIsWUFB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QUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLGNBQU0sYUFBYSxJQUFJLFFBQVE7QUFFL0IsWUFBSSxPQUFZO0FBQ2hCLFlBQUksV0FBVyxVQUFVLFdBQVcsT0FBTztBQUN6QyxjQUFJO0FBQ0Ysa0JBQU0sU0FBbUIsQ0FBQztBQUMxQiw2QkFBaUIsU0FBUyxJQUFLLFFBQU8sS0FBSyxLQUFlO0FBQzFELG1CQUFPLEtBQUssTUFBTSxPQUFPLE9BQU8sTUFBTSxFQUFFLFNBQVMsS0FBSyxJQUFJO0FBQUEsVUFDNUQsUUFBUTtBQUNOLGdCQUFJLFVBQVUsS0FBSyxFQUFFLGdCQUFnQixtQkFBbUIsQ0FBQztBQUN6RCxnQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sb0JBQW9CLENBQUMsQ0FBQztBQUN0RDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSTtBQUNGLGdCQUFNLFNBQVMsTUFBTSxrQkFBa0IsS0FBSyxRQUFRLE1BQU0sVUFBVTtBQUNwRSxjQUFJLFFBQVE7QUFDVixnQkFBSSxVQUFVLE9BQU8sUUFBUSxFQUFFLGdCQUFnQixtQkFBbUIsQ0FBQztBQUNuRSxnQkFBSSxJQUFJLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDM0I7QUFBQSxVQUNGO0FBQUEsUUFDRixTQUFTLEtBQVU7QUFDakIsa0JBQVEsTUFBTSxnQkFBZ0IsSUFBSSxPQUFPO0FBQ3pDLGNBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELGNBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLDBDQUEwQyxDQUFDLENBQUM7QUFDNUU7QUFBQSxRQUNGO0FBRUEsWUFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsWUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sWUFBWSxDQUFDLENBQUM7QUFBQSxNQUNoRCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjs7O0FEakprSSxJQUFNLDJDQUEyQztBQU1uTCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQzlCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

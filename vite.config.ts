import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/<REPO_NAME>/", // 假設你的 repo 名稱叫做 my-app，就改成 '/my-app/'
});

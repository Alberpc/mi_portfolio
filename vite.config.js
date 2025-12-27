import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mi_portfolio/", // <--- AÑADE ESTO (Cámbialo por el nombre real de tu repo)
});

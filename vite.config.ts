import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		// Change the default output directory name from "dist" to "dist-react" to avoid naming conflict with Electron
		outDir: "dist-react",
	},
});

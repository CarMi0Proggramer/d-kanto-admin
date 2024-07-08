import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                admin: resolve(__dirname, "src/pages/admin.html"),
                not_found: resolve(__dirname, "src/pages/404.html"),
                internal_error: resolve(__dirname, "src/pages/500.html"),
            },
        },
    },
});

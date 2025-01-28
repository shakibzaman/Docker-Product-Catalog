import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Ensure this points to the correct entry file
            refresh: true,
        }),
        react(), // Handles JSX
    ],
    server: {
        historyApiFallback: true, // Handles refresh route issue
        host: '0.0.0.0', // Allow external access inside Docker
        port: 5173, // Ensure correct port
        strictPort: true, // Prevent port conflicts
        hmr: {
            host: 'localhost', // Ensure hot module replacement works
        },
        watch: {
            usePolling: true, // Fix issues inside Docker
            interval: 300, // Adjust polling interval
        },
    },

    resolve: {
        alias: {
            '@': '/resources/js', // Optional: Set up alias for cleaner imports
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    css: {
        postcss: {
          plugins: [tailwindcss()]
        }
      }
});

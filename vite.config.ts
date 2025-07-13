import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// import process from 'process';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '/', '');
    return {
        plugins: [react()],

        server: {
            port: 5174,

            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});

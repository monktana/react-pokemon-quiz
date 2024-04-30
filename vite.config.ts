import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [react(), tsconfigPaths()],

  build: {
    sourcemap: configEnv.mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          return id.includes('node_modules') ? 'vendor' : null;
        },
      },
    },
  },
}));

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const envToReplace = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

export default defineConfig({
  plugins: [
    react(),
    replace(envToReplace)
  ]
})

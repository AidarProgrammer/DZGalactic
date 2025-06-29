// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// const ReactCompilerConfig = { /* ... */ };

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//         babel: {
//           plugins: [
//             ["babel-plugin-react-compiler", ReactCompilerConfig],
//           ],
//         },
//       }
//   )],
//    test: {
//     globals: true,          
//     environment: 'jsdom',   
//     setupFiles: './src/testing/setup.js',  
//     css: true,             
//   }
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup.js',
    css: true,
  }
});
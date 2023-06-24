import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
    define: { 'process.env': {} },

    // resolve:{
    // alias:{
    //   '@':path.reslove(__dirname,'./src'),
    // }
    // }
    // build: {
    //     target: 'es2020'
    // },
    // optimizedeps: {
    //     esbuildoptions: {
    //         target: 'es2020'
    //     }
    // },
    // resolve:{
    //   alias:{
    //     '@': fileURLToPath(new URL('./src',import.meta.url))
    //   }
    // }
    // resolve: {
    //     /** 添加alias规则 */
    //     alias: [
    //         {
    //             find: '@/',
    //             replacement: '/src/'
    //         }
    //     ],
    // },
})

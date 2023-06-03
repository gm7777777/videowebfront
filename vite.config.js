import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
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

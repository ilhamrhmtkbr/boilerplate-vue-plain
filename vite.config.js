import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig((mode, command) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isDevelopment = command === 'serve'

  // Determine base URL
  const getBaseUrl = () => {
    // github pages production
    if (isProduction) return '/boilerplate-vue-plain/'
    // ngrok
    if (env.VITE_APP_FRONTEND_STUDENT_URL?.includes('ngrok')) return '/student/'
    return '/'
  }

  return {
    base: getBaseUrl(),

    plugins: [
      vue({

      }),
      tailwindcss(),
      Components({
        dirs: ['src/components'], // scan semua component
        deep: true,               // include subfolder
        dts: false                // optional
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0', // Penting agar Vite bisa diakses dari Docker network (oleh Nginx)
      port: 5173, // Ini port Vite di dalam container frontend-student,
      strictPort: true,

      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '.iamra.site',
        '.ngrok-free.app'
      ],

      hmr: {
        overlay: true,
        host: isDevelopment ? env.VITE_HMR : undefined,
        protocol: env.VITE_USE_HTTPS === 'true' ? 'wss' : 'ws',
        clientPort: env.VITE_USE_HTTPS === 'true' ? 443 : 5173,
      },

      watch: {
        usePolling: !!env.VITE_USE_POLLING || process.env.NODE_ENV === 'docker',
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**']
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'terser' : false,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('vue-router')) {
                return 'router'
              }

              if (id.includes('vue')) {
                return 'vendor'
              }
            }
          }
        }
      },

      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      } : undefined,

      chunkSizeWarningLimit: 1000
    },

    // Environment variables prefix
    envPrefix: ['VITE_'],

    // Dependency optimization
    optimizeDeps: {
      include: [
        'vue',
        'vue-router'
      ],
      exclude: []
    }
  }
})

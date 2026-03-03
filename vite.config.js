import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
    cssInjectedByJsPlugin(),
  ],
  base: '/',
  build: {
    cssCodeSplit: true,
    
    rollupOptions: {
      output: {
        manualChunks: {
          
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          
          
          'admin': ['./src/admin/layouts/AdminLayout', './src/admin/pages/Dashboard', './src/admin/pages/ManageBlogs', './src/admin/pages/ManageReviews'],
          
          
          'services': ['./src/components/services/Ecommerce', './src/components/services/SEO', './src/components/services/ContentWriting', './src/components/services/GraphicDesign', './src/components/services/SocialMedia', './src/components/services/MobileApp', './src/components/services/WebDevelopment', './src/components/services/CustomSoftware'],
          
          
          'blog': ['./src/pages/Blog', './src/components/blogs/BlogPost'],
        },
      },
    },
    minify: 'terser',
    sourcemap: false, 
    chunkSizeWarningLimit: 1000, 
    terserOptions: {
      compress: {
        drop_console: true, 
      },
    },
  },
})

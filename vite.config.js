// vite.config.js
export default {
    build: {
      rollupOptions: {
        input: {
          app: 'assets/scripts/app.js',
          new: 'assets/scripts/new.js'
          // Add more entry points if needed
        },
      }
    }
  };
  
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
}

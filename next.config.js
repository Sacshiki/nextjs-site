module.exports = {
  async redirects() {
    return [
      {
        source: '/articles/:slug',
        destination: '/explore/:slug',
        permanent: true,
      },
    ]
  },
}
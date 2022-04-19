module.exports = {
  async redirects() {
    return [
      {
        source: '/articles/how-to-sacshiki',
        destination: '/explore/how-to-sacshiki',
        permanent: true,
      },
    ]
  },
}
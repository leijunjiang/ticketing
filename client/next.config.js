module.exports = {
  // Custom webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Enable polling in webpack watch options for development
    if (dev) {
      config.watchOptions = {
        poll: 300,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

// ----------------------------------------------------------------------

module.exports = {
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  // Disable strict mode for faster builds
  reactStrictMode: false,
};

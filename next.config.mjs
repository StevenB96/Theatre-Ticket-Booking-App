/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^oracledb$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    );
    return config;
  },
};

export default nextConfig;

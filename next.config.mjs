/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: false, // 302 리다이렉트 (일시적)
      },
    ]
  },
}

export default nextConfig

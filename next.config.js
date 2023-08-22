/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  async rewrites() { // api 요청 proxy 설정 (cors 우회처리)
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8080/:path*"
      },
    ]
  },
  
}

module.exports = nextConfig

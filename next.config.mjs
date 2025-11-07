/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  // Windows 파일 잠금 문제 해결
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    // HTML에서 data-nscript 속성 제거를 위한 플러그인
    if (!isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.emit.tap('RemoveDataNscript', (compilation) => {
            Object.keys(compilation.assets).forEach((filename) => {
              if (filename.endsWith('.html')) {
                let source = compilation.assets[filename].source();
                source = source.replace(/data-nscript="[^"]*"/g, '');
                source = source.replace(/data-nscript='[^']*'/g, '');
                compilation.assets[filename] = {
                  source: () => source,
                  size: () => source.length,
                };
              }
            });
          });
        },
      });
    }
    
    return config;
  },
};

export default nextConfig;
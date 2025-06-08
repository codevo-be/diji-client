import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    transpilePackages: ['@digico/ui'],
    webpack: (config, { dev, isServer }) => {
        // Force proper module resolution for react-hook-form
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-hook-form': require.resolve('react-hook-form')
        }
        return config
    }
}

export default nextConfig

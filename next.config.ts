import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    transpilePackages: ['@digico/ui'],
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-hook-form': require.resolve('react-hook-form')
        }
        return config
    }
}

export default nextConfig

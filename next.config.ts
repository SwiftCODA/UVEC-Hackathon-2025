const nextConfig = {
    turbopack: {
        // Ensure Next treats this folder as the workspace root
        root: __dirname
    },
    output: 'standalone'
}

export default nextConfig

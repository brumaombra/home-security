module.exports = {
    apps: [
        {
            name: 'security-user-dashboard',
            exec_mode: 'fork',
            instances: 1,
            script: './server/index.mjs',
            cwd: __dirname,
            env: {
                NITRO_PORT: 3000,
                NUXT_ENVIRONMENT: 'production',
                VIDEO_SERVICE_BASE_URL: 'http://localhost:3000'
            },
            log_file: './logs.log',
            merge_logs: true,
            time: true
        }
    ]
}
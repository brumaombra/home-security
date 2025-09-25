module.exports = {
    apps: [
        {
            name: 'security-video-analysis',
            exec_mode: 'fork',
            instances: 1,
            script: './index.js',
            cwd: __dirname,
            env: {
                SERVER_PORT: 3001
            },
            log_file: './logs.log',
            merge_logs: true,
            time: true
        }
    ]
}
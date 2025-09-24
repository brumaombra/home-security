module.exports = {
    apps: [
        {
            name: 'home-security',
            exec_mode: 'fork',
            instances: 1,
            script: './index.js',
            env: {
                SERVER_PORT: 3000
            },
            log_file: './logs.log',
            merge_logs: true,
            time: true
        }
    ]
}
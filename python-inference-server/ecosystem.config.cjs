module.exports = {
    apps: [
        {
            name: 'python-inference',
            exec_mode: 'fork',
            instances: 1,
            script: 'uvicorn',
            args: 'app:app --host 0.0.0.0 --port $PORT',
            cwd: __dirname,
            env: {
                PORT: 3002
            },
            log_file: './logs.log',
            merge_logs: true,
            time: true
        }
    ]
}
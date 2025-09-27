module.exports = {
    apps: [
        {
            name: 'python-inference',
            exec_mode: 'fork',
            instances: 1,
            script: './venv/bin/python',
            args: '-m uvicorn app:app --host 0.0.0.0 --port 3002',
            cwd: __dirname,
            log_file: './logs.log',
            merge_logs: true,
            time: true
        }
    ]
}
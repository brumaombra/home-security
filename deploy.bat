@echo off
echo Starting deployment process...

:: ----------------- Deploy the user-dashboard static site -----------------

:: Build the static site
:: echo Building user-dashboard static site...
:: npm run build --prefix user-dashboard

:: Force delete and recreate the directory on the Raspberry Pi
echo Force deleting and recreating user-dashboard directory on Raspberry Pi...
ssh pi@raspberry.local "sudo rm -rf ~/projects/home-security/user-dashboard && mkdir -p ~/projects/home-security/user-dashboard"
if %errorlevel% neq 0 (
    echo Error: Failed to delete and recreate directory on Raspberry Pi.
    goto :error
)

:: Deploy the static site to Raspberry Pi
echo Deploying static site to Raspberry Pi...
scp -r user-dashboard\dist\* pi@raspberry.local:~/projects/home-security/user-dashboard/
if %errorlevel% neq 0 (
    echo Error: Failed to deploy static site via SCP.
    goto :error
)

:: ----------------- Deploy the video-analysis Node app -----------------

:: Create a deploy folder excluding node_modules
echo Creating deploy folder for video-analysis...
if exist deploy-video-analysis rmdir /s /q deploy-video-analysis
robocopy video-analysis deploy-video-analysis /E /XD node_modules /XF events.json
if %errorlevel% geq 8 (
    echo Error: Failed to create deploy folder.
    goto :error
)

:: Empty the images folder from deploy folder (I can't exclude it with robocopy)
echo Emptying images folder from deploy folder...
if exist deploy-video-analysis\public\images del /q deploy-video-analysis\public\images\*

:: Force delete and recreate the video-analysis directory on the Raspberry Pi
echo Force deleting and recreating video-analysis directory on Raspberry Pi...
ssh pi@raspberry.local "sudo rm -rf ~/projects/home-security/video-analysis && mkdir -p ~/projects/home-security/video-analysis"
if %errorlevel% neq 0 (
    echo Error: Failed to delete and recreate video-analysis directory on Raspberry Pi.
    goto :error
)

:: Deploy the deploy folder to Raspberry Pi
echo Deploying video-analysis deploy folder to Raspberry Pi...
scp -r deploy-video-analysis\* pi@raspberry.local:~/projects/home-security/video-analysis/
if %errorlevel% neq 0 (
    echo Error: Failed to deploy video-analysis via SCP.
    goto :error
)

:: Clean up deploy folder
echo Cleaning up deploy folder...
rmdir /s /q deploy-video-analysis

:: Install dependencies on Raspberry Pi
echo Installing video-analysis dependencies on Raspberry Pi...
ssh pi@raspberry.local "source ~/.nvm/nvm.sh && nvm use default && cd ~/projects/home-security/video-analysis && npm install"
if %errorlevel% neq 0 (
    echo Error: Failed to install video-analysis dependencies on Raspberry Pi.
    goto :error
)

:: Restart the video-analysis app using PM2
echo Restarting video-analysis app using PM2...
ssh pi@raspberry.local "source ~/.nvm/nvm.sh && nvm use default && pm2 restart security-video-analysis || pm2 start ~/projects/home-security/video-analysis/ecosystem.config.cjs"
if %errorlevel% neq 0 (
    echo Error: Failed to restart or start video-analysis app using PM2.
    goto :error
)

:: ----------------- Deploy the python-inference-server -----------------

:: Force delete and recreate the python-inference-server directory on the Raspberry Pi
echo Force deleting and recreating python-inference-server directory on Raspberry Pi...
ssh pi@raspberry.local "sudo rm -rf ~/projects/home-security/python-inference-server && mkdir -p ~/projects/home-security/python-inference-server"
if %errorlevel% neq 0 (
    echo Error: Failed to delete and recreate directory on Raspberry Pi.
    goto :error
)

:: Deploy the python-inference-server to Raspberry Pi
echo Deploying python-inference-server to Raspberry Pi...
scp -r python-inference-server\* pi@raspberry.local:~/projects/home-security/python-inference-server/
if %errorlevel% neq 0 (
    echo Error: Failed to deploy python-inference-server via SCP.
    goto :error
)

:: Install Python dependencies on Raspberry Pi
echo Installing python-inference-server dependencies on Raspberry Pi...
ssh pi@raspberry.local "cd ~/projects/home-security/python-inference-server && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
if %errorlevel% neq 0 (
    echo Error: Failed to install python-inference-server dependencies on Raspberry Pi.
    goto :error
)

:: Start the python-inference-server using PM2
echo Starting python-inference-server using PM2...
ssh pi@raspberry.local "source ~/.nvm/nvm.sh && nvm use default && pm2 restart python-inference || pm2 start ~/projects/home-security/python-inference-server/ecosystem.config.cjs"
if %errorlevel% neq 0 (
    echo Error: Failed to start python-inference-server using PM2.
    goto :error
)

echo Deployment completed successfully.
goto :end

:error
echo Deployment failed. Check the errors above.
pause

:end
pause
cmd /k
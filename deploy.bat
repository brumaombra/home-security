@echo off
echo Starting deployment process...

:: ----------------- Deploy the user-dashboard static site -----------------

:: Generate the static site
echo Generating static site for user-dashboard...
cd user-dashboard
if exist dist rmdir /s /q dist
npm run generate
if %errorlevel% neq 0 (
    echo Error: Failed to generate static site.
    goto :error
)
cd ..

:: Force delete and recreate the directory on the Raspberry Pi
echo Force deleting and recreating user-dashboard directory on Raspberry Pi...
ssh pi@raspberry.local "rm -rf ~/projects/home-security/user-dashboard && mkdir -p ~/projects/home-security/user-dashboard"
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
ssh pi@raspberry.local "rm -rf ~/projects/home-security/video-analysis && mkdir -p ~/projects/home-security/video-analysis"
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

echo Deployment completed successfully.
goto :end

:error
echo Deployment failed. Check the errors above.
pause

:end
pause
cmd /k
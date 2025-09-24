@echo off
echo Starting deployment process...

:: Build the Nuxt app
echo Building Nuxt app...
cd user-dashboard
npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build Nuxt app.
    goto :error
)
cd ..
echo Nuxt app built successfully.

:: Create the git archive
echo Creating git archive...
git archive --format=tar --output=deploy.tar HEAD
if %errorlevel% neq 0 (
    echo Error: Failed to create git archive.
    goto :error
)

:: Copy the archive to the Raspberry Pi
echo Copying archive to Raspberry Pi...
scp deploy.tar pi@raspberry.local:~/projects/
if %errorlevel% neq 0 (
    echo Error: Failed to copy archive via SCP.
    goto :error
)

:: Extract and deploy on the Raspberry Pi
echo Extracting and deploying on Raspberry Pi...
ssh pi@raspberry.local "rm -rf ~/projects/home-security && mkdir ~/projects/home-security && tar -xf ~/projects/deploy.tar -C ~/projects/home-security && rm ~/projects/deploy.tar"
if %errorlevel% neq 0 (
    echo Error: Failed to execute commands on Raspberry Pi via SSH.
    goto :error
)

:: Install dependencies on the Raspberry Pi
echo Installing dependencies on Raspberry Pi...
ssh pi@raspberry.local "cd ~/projects/home-security/user-dashboard && npm install && cd ../video-analysis && npm install"
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies on Raspberry Pi.
    goto :error
)

:: Clean up  local archive
echo Cleaning up local archive...
del deploy.tar
if %errorlevel% neq 0 (
    echo Error: Failed to delete local archive.
    goto :error
)

echo Deployment completed successfully.
goto :end

:error
echo Deployment failed. Check the errors above.
pause

:end
pause
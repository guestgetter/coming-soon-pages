@echo off
echo Copying assets from original location to public directory...

if not exist "public" mkdir public

copy "..\coming-soon-pages\templates\jewish-mothers-deli\fulllogo_transparent.png" "public\"
copy "..\coming-soon-pages\templates\jewish-mothers-deli\jewish-mothers-deli-favicon.png" "public\"

echo Assets copied successfully!
echo.
echo Please ensure the following files are in the public directory:
echo - fulllogo_transparent.png
echo - jewish-mothers-deli-favicon.png
pause

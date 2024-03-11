:: Default Chrome 

set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "DATA_DIR=%TEMP%\chrome_data_dir-%RANDOM%"
"%CHROME_PATH%" --disable-sync --no-default-browser-check --no-first-run --user-data-dir="%DATA_DIR%" --install-autogenerated-theme="150,220,150" --silent-debugger-extension-api https://example.com >nul 2>&1
rmdir /s /q "%DATA_DIR%" >nul

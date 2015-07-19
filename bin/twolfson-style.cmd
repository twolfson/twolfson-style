@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\twolfson-style" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\twolfson-style" %*
)

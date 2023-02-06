#https://docs.microsoft.com/ru-ru/ef/core/miscellaneous/cli/dotnet

@echo off

echo Tool install dotnet-ef start

dotnet tool install --global dotnet-ef

cd ..

dotnet add package Microsoft.EntityFrameworkCore.Design

cd @

echo Tool install dotnet-ef finish
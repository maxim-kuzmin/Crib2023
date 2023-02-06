@echo off

echo Migrations remove start

cd ..

dotnet ef migrations remove --configuration Debug

cd @

echo Migrations remove finish
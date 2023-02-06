@echo off

echo Database update start

cd ..

dotnet ef database update --configuration Debug

cd @

echo Database update finish
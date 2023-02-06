@echo off

echo Database update InitialCreate start

cd ..

dotnet ef database update InitialCreate --configuration Debug

cd @

echo Database update InitialCreate finish
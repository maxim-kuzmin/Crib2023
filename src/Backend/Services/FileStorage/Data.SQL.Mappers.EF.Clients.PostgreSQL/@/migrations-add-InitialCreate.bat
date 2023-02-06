@echo off

echo Migrations add InitialCreate start

cd ..

dotnet ef migrations add InitialCreate --configuration Debug

cd @

echo Migrations add InitialCreate finish
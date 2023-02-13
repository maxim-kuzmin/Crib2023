@echo off

echo Migrations add InitialCreate start

cd ..

dotnet ef migrations add InitialCreate -- "Server=localhost;Port=5432;Database=crib2023_filestorage;User Id=crib;Password=Crib2023;"

cd @

echo Migrations add InitialCreate finish
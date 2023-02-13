@echo off

echo Migrations remove start

cd ..

dotnet ef migrations remove -- "Server=localhost;Port=5432;Database=crib2023_filestorage;User Id=crib;Password=Crib2023;"

cd @

echo Migrations remove finish
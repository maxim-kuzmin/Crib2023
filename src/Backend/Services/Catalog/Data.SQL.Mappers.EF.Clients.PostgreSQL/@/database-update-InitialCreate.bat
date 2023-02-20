@echo off

echo Database update InitialCreate start

cd ..

dotnet ef database update InitialCreate -- "Server=localhost;Port=5432;Database=crib2023_catalog;User Id=crib;Password=Crib2023;"

cd @

echo Database update InitialCreate finish
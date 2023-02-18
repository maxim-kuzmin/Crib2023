#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5001
VOLUME /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Crib2023.Services.Catalog.App/Crib2023.Services.Catalog.App.csproj", "Crib2023.Services.Catalog.App/"]
RUN dotnet restore "Crib2023.Services.Catalog.App/Crib2023.Services.Catalog.App.csproj"
COPY . .
WORKDIR "/src/Crib2023.Services.Catalog.App"
RUN dotnet build "Crib2023.Services.Catalog.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Crib2023.Services.Catalog.App.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crib2023.Services.Catalog.App.dll"]
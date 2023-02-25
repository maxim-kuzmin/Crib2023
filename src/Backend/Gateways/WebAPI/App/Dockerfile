#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Backend/Gateways/WebAPI/App/App.csproj", "Backend/Gateways/WebAPI/App/"]
COPY ["Backend/Gateways/WebAPI/Domains.CatalogArticle/Domains.CatalogArticle.csproj", "Backend/Gateways/WebAPI/Domains.CatalogArticle/"]
COPY ["Backend/Gateways/WebAPI/Domain/Domain.csproj", "Backend/Gateways/WebAPI/Domain/"]
COPY ["Backend/Gateways/WebAPI/Domains.CatalogTopic/Domains.CatalogTopic.csproj", "Backend/Gateways/WebAPI/Domains.CatalogTopic/"]
RUN dotnet restore "Backend/Gateways/WebAPI/App/App.csproj"
COPY . .
WORKDIR "/src/Backend/Gateways/WebAPI/App"
RUN dotnet build "App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "App.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crib2023.Backend.Gateways.WebAPI.App.dll"]
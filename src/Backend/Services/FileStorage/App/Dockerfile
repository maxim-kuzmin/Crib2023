#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
VOLUME /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Backend/Services/FileStorage/App/App.csproj", "Backend/Services/FileStorage/App/"]
COPY ["Backend/Services/FileStorage/Domains.Article/Domains.Article.csproj", "Backend/Services/FileStorage/Domains.Article/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Mappers.EF.Clients.PostgreSQL/Data.SQL.Mappers.EF.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Data.SQL.Mappers.EF.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Clients.PostgreSQL/Data.SQL.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Data.SQL.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL/Data.SQL.csproj", "Backend/Services/FileStorage/Data.SQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Mappers.EF/Data.SQL.Mappers.EF.csproj", "Backend/Services/FileStorage/Data.SQL.Mappers.EF/"]
COPY ["Backend/Services/FileStorage/Domain.SQL/Domain.SQL.csproj", "Backend/Services/FileStorage/Domain.SQL/"]
COPY ["Backend/Services/FileStorage/Domains.Topic/Domains.Topic.csproj", "Backend/Services/FileStorage/Domains.Topic/"]
RUN dotnet restore "Backend/Services/FileStorage/App/App.csproj"
COPY . .
WORKDIR "/src/Backend/Services/FileStorage/App"
RUN dotnet build "App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "App.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crib2023.Backend.Services.FileStorage.App.dll"]
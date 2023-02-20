#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
VOLUME /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Backend/Services/FileStorage/App.SQL.Mappers.EF.Clients.PostgreSQL/App.SQL.Mappers.EF.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/App.SQL.Mappers.EF.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL/Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Mappers.EF.Clients.PostgreSQL/Data.SQL.Mappers.EF.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Data.SQL.Mappers.EF.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Clients.PostgreSQL/Data.SQL.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Data.SQL.Clients.PostgreSQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL/Data.SQL.csproj", "Backend/Services/FileStorage/Data.SQL/"]
COPY ["Backend/Services/FileStorage/Data.SQL.Mappers.EF/Data.SQL.Mappers.EF.csproj", "Backend/Services/FileStorage/Data.SQL.Mappers.EF/"]
COPY ["Backend/Services/FileStorage/Domain.SQL/Domain.SQL.csproj", "Backend/Services/FileStorage/Domain.SQL/"]
COPY ["Backend/Services/FileStorage/Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL/Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.csproj", "Backend/Services/FileStorage/Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL/"]
RUN dotnet restore "Backend/Services/FileStorage/App.SQL.Mappers.EF.Clients.PostgreSQL/App.SQL.Mappers.EF.Clients.PostgreSQL.csproj"
COPY . .
WORKDIR "/src/Backend/Services/FileStorage/App.SQL.Mappers.EF.Clients.PostgreSQL"
RUN dotnet build "App.SQL.Mappers.EF.Clients.PostgreSQL.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "App.SQL.Mappers.EF.Clients.PostgreSQL.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.dll"]
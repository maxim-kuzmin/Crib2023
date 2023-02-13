// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Grpc.Protos;
global using Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Setup;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
global using Grpc.Core;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Apps.WebApp;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Setup;
global using MediatR;
global using Microsoft.Extensions.Localization;
global using ModuleOfServiceDataSQLClientsPostgreSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Clients.PostgreSQL.Setup.ClientSetupAppModule;
global using ModuleOfServiceDataSQLMappersEFClientsPostgreSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Setup.ClientMapperSetupAppModule;
global using ModuleOfServiceDataSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Setup.SetupAppModule;
global using ModuleOfServiceDomainsArticle = Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Setup.DomainSetupAppModule;
global using ModuleOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupAppModule;
global using ModuleOfCommonDataSQLClientsPostgreSQL = Makc2023.Backend.Common.Data.SQL.Clients.PostgreSQL.Setup.ClientSetupAppModule;
global using ModuleOfCommonDataSQLMappersEF = Makc2023.Backend.Common.Data.SQL.Mappers.EF.Setup.MapperSetupAppModule;
global using ModuleOfCommonDataSQL = Makc2023.Backend.Common.Data.SQL.Setup.SetupAppModule;
global using ModuleOfCommonDomain = Makc2023.Backend.Common.Domain.Setup.SetupAppModule;
global using ModuleOfCommonDomainSqlMappersEF = Makc2023.Backend.Common.Domain.SQL.Mappers.EF.Setup.MapperSetupAppModule;

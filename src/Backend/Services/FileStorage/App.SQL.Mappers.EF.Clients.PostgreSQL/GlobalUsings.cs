﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;
global using Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Entities;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.List.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.List.Get;
global using Crib2023.Backend.Services.FileStorage.GrpcProtos;
global using Grpc.Core;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Apps.WebApp;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Setup;
global using Makc2023.Backend.Common.Core.Converting;
global using Makc2023.Backend.Common.Core.Repeat;
global using Makc2023.Backend.Common.Data.SQL.Operations.Tree.Node.Get;
global using Makc2023.Backend.Common.Data.SQL.Operations.Tree.Path.Get;
global using MediatR;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.Localization;
global using Npgsql;
global using ModuleOfServiceApp = Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup.SetupAppModule;
global using ModuleOfServiceDataSQLClientsPostgreSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Clients.PostgreSQL.Setup.ClientSetupAppModule;
global using ModuleOfServiceDataSQLMappersEFClientsPostgreSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Setup.ClientMapperSetupAppModule;
global using ISetupServiceOfServiceDataSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Setup.ISetupService;
global using ModuleOfServiceDataSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Setup.SetupAppModule;
global using ModuleOfServiceDomainsArticle = Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Setup.DomainSetupAppModule;
global using ModuleOfServiceDomainsTopic = Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Setup.DomainSetupAppModule;
global using GrpcServerOfAtrticle = Crib2023.Backend.Services.FileStorage.GrpcProtos.FileStorageArticleService.FileStorageArticleServiceBase;
global using GrpcServerOfTopic = Crib2023.Backend.Services.FileStorage.GrpcProtos.FileStorageTopicService.FileStorageTopicServiceBase;
global using ModuleOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupAppModule;
global using ModuleOfCommonDataSQLClientsPostgreSQL = Makc2023.Backend.Common.Data.SQL.Clients.PostgreSQL.Setup.ClientSetupAppModule;
global using ModuleOfCommonDataSQLMappersEF = Makc2023.Backend.Common.Data.SQL.Mappers.EF.Setup.MapperSetupAppModule;
global using ModuleOfCommonDataSQL = Makc2023.Backend.Common.Data.SQL.Setup.SetupAppModule;
global using ModuleOfCommonDomain = Makc2023.Backend.Common.Domain.Setup.SetupAppModule;
global using ModuleOfCommonDomainSQLMappersEF = Makc2023.Backend.Common.Domain.SQL.Mappers.EF.Setup.MapperSetupAppModule;

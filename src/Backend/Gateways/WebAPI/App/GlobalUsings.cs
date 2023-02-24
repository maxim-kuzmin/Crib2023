// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Gateways.WebAPI.App.Setup;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Apps.WebApp;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Options;
global using ModuleOfGatewayApp = Crib2023.Backend.Gateways.WebAPI.App.Setup.SetupAppModule;
global using GrpcClientOfCatalogArticle = Crib2023.Backend.Services.Catalog.GrpcProtos.CatalogArticleService.CatalogArticleServiceClient;
global using GrpcClientOfCatalogTopic = Crib2023.Backend.Services.Catalog.GrpcProtos.CatalogTopicService.CatalogTopicServiceClient;
global using GrpcClientOfFileStorageArticle = Crib2023.Backend.Services.FileStorage.GrpcProtos.FileStorageArticleService.FileStorageArticleServiceClient;
global using GrpcClientOfFileStorageTopic = Crib2023.Backend.Services.FileStorage.GrpcProtos.FileStorageTopicService.FileStorageTopicServiceClient;
global using ModuleOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupAppModule;

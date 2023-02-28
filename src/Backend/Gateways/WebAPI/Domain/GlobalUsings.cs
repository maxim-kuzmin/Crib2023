// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Grpc.Backend.Services.Catalog;
global using Makc2023.Backend.Common.Core;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Options;
global using GrpcClientOfCatalogArticle = Crib2023.Grpc.Backend.Services.Catalog.CatalogArticleService.CatalogArticleServiceClient;
global using GrpcClientOfCatalogTopic = Crib2023.Grpc.Backend.Services.Catalog.CatalogTopicService.CatalogTopicServiceClient;
global using GrpcClientOfFileStorageArticle = Crib2023.Grpc.Backend.Services.FileStorage.FileStorageArticleService.FileStorageArticleServiceClient;
global using GrpcClientOfFileStorageTopic = Crib2023.Grpc.Backend.Services.FileStorage.FileStorageTopicService.FileStorageTopicServiceClient;

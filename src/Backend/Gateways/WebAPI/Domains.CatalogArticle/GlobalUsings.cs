// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.List.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;
global using Crib2023.Grpc.Backend.Services.Catalog;
global using Makc2023.Backend.Common.Core;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Setup;
global using MediatR;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using GrpcClientOfCatalogArticle = Crib2023.Grpc.Backend.Services.Catalog.CatalogArticleService.CatalogArticleServiceClient;

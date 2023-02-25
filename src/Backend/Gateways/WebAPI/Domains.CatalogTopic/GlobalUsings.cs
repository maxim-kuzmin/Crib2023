// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.List.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;
global using Crib2023.Backend.Services.Catalog.GrpcProtos;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Setup;
global using MediatR;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using GrpcClientOfCatalogTopic = Crib2023.Backend.Services.Catalog.GrpcProtos.CatalogTopicService.CatalogTopicServiceClient;
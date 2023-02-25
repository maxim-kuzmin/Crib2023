// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Gateways.WebAPI.App.Setup;
global using Crib2023.Backend.Services.Catalog.GrpcProtos;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Apps.WebApp;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Setup;
global using MediatR;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Extensions.Localization;
global using ModuleOfGatewayApp = Crib2023.Backend.Gateways.WebAPI.App.Setup.SetupAppModule;
global using ModuleOfGatewayDomain = Crib2023.Backend.Gateways.WebAPI.Domain.Setup.SetupAppModule;
global using ModuleOfGatewayDomainsCatalogArticle = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Setup.DomainSetupAppModule;
global using ModuleOfGatewayDomainsCatalogTopic = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Setup.DomainSetupAppModule;
global using ModuleOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupAppModule;
global using ModuleOfCommonDomain = Makc2023.Backend.Common.Domain.Setup.SetupAppModule;
global using RequestHandlerOfGatewayCatalogArticleOperationsItemGet = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get.DomainItemGetOperationRequestHandler;
global using RequestHandlerOfGatewayCatalogArticleOperationsListGet = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get.DomainListGetOperationRequestHandler;
global using RequestHandlerOfGatewayCatalogTopicOperationsItemGet = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get.DomainItemGetOperationRequestHandler;
global using RequestHandlerOfGatewayCatalogTopicOperationsListGet = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get.DomainListGetOperationRequestHandler;

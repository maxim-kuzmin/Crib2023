// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Article.Item;
global using Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Article.List;
global using Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.Item;
global using Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.List;
global using Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.Tree;
global using Crib2023.Backend.Gateways.WebAPI.App.Setup;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;
global using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Tree.Get;
global using Crib2023.Grpc.Backend.Services.Catalog;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Apps.WebApp;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Response;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Responses;
global using Makc2023.Backend.Common.Core.Apps.WebApp.Setup;
global using Makc2023.Backend.Common.Core.Converting;
global using MediatR;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Extensions.Localization;
global using ModuleOfGatewayApp = Crib2023.Backend.Gateways.WebAPI.App.Setup.SetupAppModule;
global using ModuleOfGatewayDomain = Crib2023.Backend.Gateways.WebAPI.Domain.Setup.SetupAppModule;
global using ModuleOfGatewayDomainsCatalogArticle = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Setup.CatalogArticleDomainSetupAppModule;
global using ModuleOfGatewayDomainsCatalogTopic = Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Setup.CatalogTopicDomainSetupAppModule;
global using ModuleOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupAppModule;
global using ModuleOfCommonDomain = Makc2023.Backend.Common.Domain.Setup.SetupAppModule;

// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Entities;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.List.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.Item.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.List.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.ValueObjects;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Converting;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Operations;
global using Makc2023.Backend.Common.Core.Operations.Item.Get;
global using Makc2023.Backend.Common.Core.Operations.List.Get;
global using Makc2023.Backend.Common.Core.Operations.Tree.Node.Get;
global using Makc2023.Backend.Common.Core.Operations.Tree.Path.Get;
global using Makc2023.Backend.Common.Domain;
global using Makc2023.Backend.Common.Domain.ValueObjects.Options;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;

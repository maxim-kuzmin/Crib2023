// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Entities;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.List.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.ValueObjects;
global using Makc2023.Backend.Common.Core.Converting;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Data.SQL.Operations.Item.Get;
global using Makc2023.Backend.Common.Data.SQL.Operations.List.Get;
global using Makc2023.Backend.Common.Domain;
global using Makc2023.Backend.Common.Domain.ValueObjects.Options;
global using Makc2023.Backend.Common.Data.SQL.Operations.Tree.Path.Get;

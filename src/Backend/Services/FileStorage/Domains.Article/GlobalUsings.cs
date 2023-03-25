// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.FileStorage.Domain.SQL.Repositories;
global using Crib2023.Backend.Services.FileStorage.Domains.Article;
global using Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Converting;
global using Makc2023.Backend.Common.Core.Exceptions;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Operations;
global using Makc2023.Backend.Common.Core.Operations.Item.Get;
global using Makc2023.Backend.Common.Core.Operations.List.Get;
global using Makc2023.Backend.Common.Data.SQL.Commands.Tree;
global using Makc2023.Backend.Common.Domain;
global using Makc2023.Backend.Common.Domain.SQL.Mappers.EF;
global using Makc2023.Backend.Common.Domain.ValueObjects.Options;
global using MediatR;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using SetupOptionsOfCommonCore = Makc2023.Backend.Common.Core.Setup.SetupOptions;

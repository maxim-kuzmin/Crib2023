﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Entities;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.List.Get;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.Repositories;
global using Crib2023.Backend.Services.Catalog.Domain.SQL.ValueObjects;
global using Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
global using Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Setup;
global using Makc2023.Backend.Common.Data.SQL.Commands.Tree;
global using Makc2023.Backend.Common.Data.SQL.Operations.List.Get;
global using Makc2023.Backend.Common.Domain.SQL.Mappers.EF;
global using MediatR;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
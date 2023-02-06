﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions;
global using Makc2023.Backend.Common.Core.Exceptions.VariableExceptions;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Setup;
global using Makc2023.Backend.Common.Data.SQL.Operations.List.Get;
global using Makc2023.Backend.Common.Domain.SQL.Mappers.EF;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.FileStorage.Domain.Entities;
global using Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.List.Get;
global using Crib2023.Backend.Services.FileStorage.Domain.Repositories;
global using Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;
global using Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;
global using MediatR;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;

// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using System.Reflection;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Clients.PostgreSQL;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Db;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Setup;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Setup;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Topic;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions.VariableExceptions;
global using Makc2023.Backend.Common.Data.SQL.Commands.Tree;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF.Db;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Design;
global using Microsoft.EntityFrameworkCore.Metadata.Builders;
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using Npgsql;
global using OptionsOfServiceDataSQL = Crib2023.Backend.Services.Catalog.Data.SQL.Setup.SetupOptions;
global using OptionsOfCommonDataSQL = Makc2023.Backend.Common.Data.SQL.Setup.SetupOptions;
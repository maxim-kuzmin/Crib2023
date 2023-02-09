// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using System.Reflection;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions.VariableExceptions;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Clients.PostgreSQL;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Design;
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using OptionsOfCommonDataSQL = Makc2023.Backend.Common.Data.SQL.Setup.SetupOptions;
global using OptionsOfServiceDataSQL = Crib2023.Backend.Services.FileStorage.Data.SQL.Setup.SetupOptions;


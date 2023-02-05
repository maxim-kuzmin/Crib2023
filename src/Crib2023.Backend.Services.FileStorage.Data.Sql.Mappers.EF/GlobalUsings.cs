// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Db;
global using Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Types.Topic;
global using Crib2023.Backend.Services.FileStorage.Data.Sql.Setup;
global using Crib2023.Backend.Services.FileStorage.Data.Sql.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.Sql.Types.Topic;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions.VariableExceptions;
global using Makc2023.Backend.Common.Data.Sql;
global using Makc2023.Backend.Common.Data.Sql.Commands.Tree.Trigger;
global using Makc2023.Backend.Common.Data.Sql.Commands.Trigger;
global using Makc2023.Backend.Common.Data.Sql.Mappers.EF;
global using Makc2023.Backend.Common.Data.Sql.Mappers.EF.Db;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Metadata.Builders;
global using Microsoft.Extensions.DependencyInjection;

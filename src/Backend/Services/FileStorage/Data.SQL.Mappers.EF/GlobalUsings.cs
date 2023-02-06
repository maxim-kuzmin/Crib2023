// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Db;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Setup;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;
global using Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Exceptions.VariableExceptions;
global using Makc2023.Backend.Common.Data.SQL;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF;
global using Makc2023.Backend.Common.Data.SQL.Mappers.EF.Db;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Metadata.Builders;
global using Microsoft.Extensions.DependencyInjection;

﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Data.SQL.Types.Topic;
global using Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Item.Get;
global using Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.List.Get;
global using Makc2023.Backend.Common.Core;
global using Makc2023.Backend.Common.Core.App;
global using Makc2023.Backend.Common.Core.Converting;
global using Makc2023.Backend.Common.Core.Exceptions;
global using Makc2023.Backend.Common.Core.Operation;
global using Makc2023.Backend.Common.Core.Operation.Handlers;
global using Makc2023.Backend.Common.Core.Operations;
global using Makc2023.Backend.Common.Core.Operations.Item.Get;
global using Makc2023.Backend.Common.Core.Operations.Item.Get.Inputs;
global using Makc2023.Backend.Common.Core.Operations.List.Get;
global using Makc2023.Backend.Common.Core.Operations.Tree.Node.Get;
global using Makc2023.Backend.Common.Core.Operations.Tree.Path.Get;
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

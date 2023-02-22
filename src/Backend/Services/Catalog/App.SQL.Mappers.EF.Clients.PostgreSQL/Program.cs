// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.Catalog.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

using var appHandler = new WebAppHandler();

try
{
    var appEnvironment = new AppEnvironment();

    appHandler.OnStart(appEnvironment);

    var appBuilder = WebApplication.CreateBuilder(args);

    appBuilder.Configure();

    appBuilder.AddAppModules(appEnvironment);

    // Additional configuration is required to successfully run gRPC on macOS.
    // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

    appBuilder.Services.AddGrpc();

    var app = appBuilder.Build();

    await app.UseAppModules(appEnvironment).ConfigureAwait(false);

    app.MapGrpcService<ArticleGrpcService>();
    app.MapGrpcService<TopicGrpcService>();

    app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

    app.Run();
}
catch (Exception exception)
{
    appHandler.OnError(exception);

    throw;
}

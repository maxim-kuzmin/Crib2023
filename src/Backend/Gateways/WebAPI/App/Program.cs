// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using var appHandler = new WebAppHandler();

try
{
    var appEnvironment = new AppEnvironment();

    appHandler.HandleStart(appEnvironment);

    var appBuilder = WebApplication.CreateBuilder(args);

    appBuilder.AddAppModules(appEnvironment);

    var app = appBuilder.Build();

    await app.UseAppModules(appEnvironment).ConfigureAwait(false);

    app.Run();
}
catch (Exception exception)
{
    appHandler.HandleError(exception);

    throw;
}
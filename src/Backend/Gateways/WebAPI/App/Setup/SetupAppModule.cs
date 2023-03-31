// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Fields

    private readonly IAppEnvironment _appEnvironment;

    private readonly IConfigurationSection _configurationSection;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <param name="configurationSection">Раздел конфигурации.</param>
    public SetupAppModule(IAppEnvironment appEnvironment, IConfigurationSection configurationSection)
    {
        _appEnvironment = appEnvironment;
        _configurationSection = configurationSection;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.Configure<SetupOptions>(_configurationSection);

        services.AddSingleton(x => _appEnvironment);

        services.AddLocalization(x => x.ConfigureLocalization());

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblyContaining<ModuleOfCommonDomain>()
                .RegisterServicesFromAssemblyContaining<ModuleOfGatewayDomainsCatalogArticle>()
                .RegisterServicesFromAssemblyContaining<ModuleOfGatewayDomainsCatalogTopic>();
        });

        // Add services to the container.

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        var setupOptions = _configurationSection.Get<SetupOptions>() ?? new SetupOptions();

        if (setupOptions.CorsPolicyIsEnabled)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        if (setupOptions.CorsPolicyOrigins.Any())
                        {
                            policy.WithOrigins(setupOptions.CorsPolicyOrigins)
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials();
                        }
                        else
                        {
                            policy.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                        }
                    });
            });
        }
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(IAppEnvironment),
                typeof(IConfiguration),
                typeof(ILogger),
                typeof(IMediator),
                typeof(IStringLocalizer),
            };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
            {
                typeof(CatalogArticleDomainItemGetOperationRequestHandler),
                typeof(CatalogArticleDomainListGetOperationRequestHandler),
                typeof(CatalogTopicDomainItemGetOperationRequestHandler),
                typeof(CatalogTopicDomainListGetOperationRequestHandler),
            };
    }

    #endregion Protected methods
}

// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Clients.PostgreSQL;

/// <summary>
/// Параметры типов клиента.
/// </summary>
public class ClientTypesOptions : TypesOptions
{
    #region Fields

    private static readonly Lazy<TypesOptions> _lazy = new(() => new ClientTypesOptions());

    #endregion Fields

    #region Properties

    /// <summary>
    /// Экземпляр.
    /// </summary>
    public static TypesOptions Instance => _lazy.Value;

    #endregion Properties

    #region Constructors

    private ClientTypesOptions()
    {
        var defaults = new ClientDefaults();

        string dbColumnForExternalId = "external_id";

        Topic = new TopicTypeOptions(
            defaults: defaults,
            dbColumnForExternalId: dbColumnForExternalId,
            dbTable: "topic");

        Article = new ArticleTypeOptions(
            topicTypeOptions: Topic,
            defaults: defaults,
            dbColumnForExternalId: dbColumnForExternalId,
            dbColumnForTitle: "title",
            dbTable: "article")
        {
            DbColumnForHash = "hash",
            DbColumnForPath = "path"
        };
    }

    #endregion Constructors     
}

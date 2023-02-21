// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;

/// <summary>
/// Загрузчик типа "Статья".
/// </summary>
public class ArticleTypeLoader : Loader<ArticleTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public ArticleTypeLoader(ArticleTypeEntity? target = null)
        : base(target ?? new ArticleTypeEntity())
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override HashSet<string> Load(
        ArticleTypeEntity source,
        HashSet<string>? loadableProperties = null)
    {
        var result = base.Load(source, loadableProperties);

        if (result.Contains(nameof(Target.Body)))
        {
            Target.Body = source.Body;
        }

        if (result.Contains(nameof(Target.Id)))
        {
            Target.Id = source.Id;
        }

        if (result.Contains(nameof(Target.RowGuid)))
        {
            Target.RowGuid = source.RowGuid;
        }

        if (result.Contains(nameof(Target.Title)))
        {
            Target.Title = source.Title;
        }

        if (result.Contains(nameof(Target.TopicId)))
        {
            Target.TopicId = source.TopicId;
        }

        return result;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override HashSet<string> CreateAllPropertiesToLoad()
    {
        return new HashSet<string>
        {
            nameof(Target.Body),
            nameof(Target.Id),
            nameof(Target.RowGuid),
            nameof(Target.Title),
            nameof(Target.TopicId)            
        };
    }

    #endregion Protected methods
}

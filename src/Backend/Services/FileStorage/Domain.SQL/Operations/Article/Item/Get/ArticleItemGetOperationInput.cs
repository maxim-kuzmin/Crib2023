// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;

/// <summary>
/// Входные данные операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationInput : ItemWithInt64IdGetOperationInput
{
    #region Properties

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string Title { get; set; } = "";

    /// <summary>
    /// Идентификатор темы.
    /// </summary>
    public long TopicId { get; set; }

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (Id > 0)
        {
            Title = "";
            TopicId = 0;
        }
    }

    /// <inheritdoc/>
    public sealed override List<string> GetInvalidProperties()
    {
        var result = base.GetInvalidProperties();

        if (result.Any())
        {
            bool isInvalidTitle = string.IsNullOrWhiteSpace(Title);
            bool isInvalidTopicId = TopicId < 1;

            if (isInvalidTitle || isInvalidTopicId)
            {
                if (isInvalidTitle)
                {
                    result.Add(nameof(Title));
                }

                if (isInvalidTopicId)
                {
                    result.Add(nameof(TopicId));
                }
            }
            else
            {
                result.Clear();
            }
        }

        return result;
    }

    #endregion Public methods
}

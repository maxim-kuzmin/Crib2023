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
    public sealed override OperationInputInvalidProperties GetInvalidProperties(
        IOperationsResource operationsResource)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public OperationInputInvalidProperties GetInvalidProperties(
        IResource resource,
        IOperationsResource operationsResource)
    {
        var result = base.GetInvalidProperties(operationsResource);

        if (result.Any())
        {
            bool isTitleInvalid = string.IsNullOrWhiteSpace(Title);
            bool isTopicIdInvalid = TopicId < 1;

            if (isTitleInvalid || isTopicIdInvalid)
            {
                if (isTitleInvalid)
                {
                    var values = result.GetOrAdd(nameof(Title));

                    string value = resource.GetValidValueForTitle();

                    values.Add(value);
                }

                if (isTopicIdInvalid)
                {
                    var values = result.GetOrAdd(nameof(TopicId));

                    string value = resource.GetValidValueForTopicId();

                    values.Add(value);
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

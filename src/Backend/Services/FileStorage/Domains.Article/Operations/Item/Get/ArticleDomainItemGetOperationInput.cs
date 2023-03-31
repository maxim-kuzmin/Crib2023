// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;

/// <summary>
/// Входные данные операции получения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemGetOperationInput : ItemGetOperationInputWithInt64Id
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

    /// <summary>
    /// Создать предикат.
    /// </summary>
    /// <returns>Предикат.</returns>
    public ExpressionStarter<ClientMapperArticleTypeEntity> CreatePredicate()
    {
        var result = PredicateBuilder.New<ClientMapperArticleTypeEntity>(true);

        if (Id > 0)
        {
            result = result.And(x => x.Id == Id);
        }

        if (!string.IsNullOrWhiteSpace(Title))
        {
            result = result.And(x => x.Title == Title);
        }

        if (TopicId > 0)
        {
            result = result.And(x => x.TopicId == TopicId);
        }

        return result;
    }

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
        IArticleDomainResource domainResource,
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

                    string value = domainResource.GetValidValueForTitle();

                    values.Add(value);
                }

                if (isTopicIdInvalid)
                {
                    var values = result.GetOrAdd(nameof(TopicId));

                    string value = domainResource.GetValidValueForTopicId();

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

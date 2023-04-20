// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;

/// <summary>
/// Входные данные операции получения списка в домене "Статья".
/// </summary>
public class ArticleDomainListGetOperationInput : ListGetOperationInput
{
    #region Properties

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[] Ids { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string IdsString { get; set; } = "";

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string Title { get; set; } = "";

    /// <summary>
    /// Идентификатор экземпляра сущности "Тема".
    /// </summary>
    public long TopicId { get; set; }

    /// <summary>
    /// Идентификаторы экземпляров сущности "Тема".
    /// </summary>
    public long[] TopicIds { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов экземпляров сущности "Тема".
    /// </summary>
    public string TopicIdsString { get; set; } = "";

    /// <summary>
    /// Имя экземпляра сущности "Тема".
    /// </summary>
    public string TopicName { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <summary>
    /// Создать предикат.
    /// </summary>
    /// <returns>Предикат.</returns>
    public ExpressionStarter<ClientMapperArticleTypeEntity> CreatePredicate()
    {
        var result = PredicateBuilder.New<ClientMapperArticleTypeEntity>(true);

        if (!string.IsNullOrWhiteSpace(Title))
        {
            result = result.And(x => x.Title.Contains(Title));
        }

        if (Ids != null && Ids.Any())
        {
            if (Ids.Length > 1)
            {
                result = result.And(x => Ids.Contains(x.Id));
            }
            else
            {
                long entityId = Ids[0];

                result = result.And(x => x.Id == entityId);
            }
        }

        if (TopicId > 0)
        {
            result = result.And(x => x.TopicId == TopicId);
        }

        if (TopicIds != null && TopicIds.Any())
        {
            if (TopicIds.Length > 1)
            {
                result = result.And(x => TopicIds.Contains(x.TopicId));
            }
            else
            {
                long id = TopicIds[0];

                result = result.And(x => x.TopicId == id);
            }
        }

        if (!string.IsNullOrWhiteSpace(TopicName))
        {
            result = result.And(x => x.Topic!.Name!.Contains(TopicName));
        }

        return result;
    }

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (TopicId < 0)
        {
            TopicId = 0;
        }

        if (string.IsNullOrWhiteSpace(SortField))
        {
            SortField = nameof(ArticleTypeEntity.Id);
        }

        if (string.IsNullOrWhiteSpace(SortDirection))
        {
            SortDirection = OperationSortDirection.DESC;
        }

        if (!string.IsNullOrWhiteSpace(IdsString) && !Ids.Any())
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }

        if (!string.IsNullOrWhiteSpace(TopicIdsString) && !TopicIds.Any())
        {
            TopicIds = TopicIdsString.FromStringToNumericInt64Array();
        }
    }

    #endregion Public methods
}

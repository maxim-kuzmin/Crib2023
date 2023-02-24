// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
using Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

namespace Crib2023.Backend.Services.Catalog.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

/// <summary>
/// gRPC сервис "Статья".
/// </summary>
public class ArticleGrpcService : GrpcServerOfAtrticle
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="mediator">Посредник.</param>
    public ArticleGrpcService(IMediator mediator)
    {
        _mediator = mediator;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="request">Запрос.</param>
    /// <param name="context">Контекст.</param>
    /// <returns>Задача на получение элемента.</returns>
    public override async Task<CatalogArticleItemGetOperationReply> GetItem(
        CatalogArticleItemGetOperationRequest request,
        ServerCallContext context)
    {
        var input = request.Input ?? new CatalogArticleItemGetOperationInput();

        var operationInput = new ArticleItemGetOperationInput
        {
            Id = input.Id,
            Title = input.Title,
            TopicId = input.TopicId,
        };

        var operationRequest = new DomainItemGetOperationRequest(operationInput, request.OperationCode);

        var taskForItem = _mediator.Send(operationRequest);

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new CatalogArticleItemGetOperationReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new CatalogArticleItemGetOperationOutput
            {
                Item = CreateItem(operationOutput.Item),
                IsItemNotFound = operationOutput.IsItemNotFound
            }
        };

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(errorMessage);
        }

        return result;
    }

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="request">Запрос.</param>
    /// <param name="context">Контекст.</param>
    /// <returns>Задача на получение списка.</returns>
    public override async Task<CatalogArticleListGetOperationReply> GetList(
        CatalogArticleListGetOperationRequest request,
        ServerCallContext context)
    {
        var input = request.Input ?? new CatalogArticleListGetOperationInput();

        var operationInput = new ArticleListGetOperationInput
        {
            PageNumber = input.PageNumber,
            PageSize = input.PageSize,
            SortDirection = input.SortDirection,
            SortField = input.SortField,
            Ids = input.Ids.ToArray(),
            TopicId = input.TopicId,
            TopicIds = input.TopicIds.ToArray(),
            TopicName = input.TopicName,
            Title = input.Title,
        };

        var taskForItem = _mediator.Send(new DomainListGetOperationRequest(operationInput, request.OperationCode));

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new CatalogArticleListGetOperationReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new CatalogArticleListGetOperationOutput
            {
                TotalCount = operationOutput.TotalCount
            }
        };

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(errorMessage);
        }

        foreach (var operationOutputItem in operationOutput.Items)
        {
            var item = CreateItem(operationOutputItem);

            result.Output.Items.Add(item);
        }

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static CatalogArticleEntity CreateItem(ArticleEntity source)
    {
        CatalogArticleEntity result;

        var data = source.Data;

        var topicPathItems = source.TopicPathItems;

        result = new CatalogArticleEntity
        {
            Data = new CatalogArticleTypeEntity
            {
                Body = data.Body,
                Id = data.Id,
                RowGuid = data.RowGuid.ToString(),
                Title = data.Title,
                TopicId = data.TopicId,
            }
        };

        foreach (var topicPathItem in topicPathItems)
        {
            var option = new CatalogOptionValueObject
            {
                Id = topicPathItem.Id,
                Name = topicPathItem.Name,
            };

            result.TopicPathItems.Add(option);
        }

        return result;
    }

    #endregion Private methods
}
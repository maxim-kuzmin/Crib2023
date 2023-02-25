// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
using Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

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
    public override async Task<FileStorageArticleItemGetOperationReply> GetItem(
        FileStorageArticleItemGetOperationRequest request,
        ServerCallContext context)
    {
        FileStorageArticleItemGetOperationReply result;

        FileStorageArticleItemGetOperationInput input = request.Input ?? new();

        DomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Id = input.Id,
                Title = input.Title,
                TopicId = input.TopicId,
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        result = new()
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new()
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
    public override async Task<FileStorageArticleListGetOperationReply> GetList(
        FileStorageArticleListGetOperationRequest request,
        ServerCallContext context)
    {
        FileStorageArticleListGetOperationReply result;

        var input = request.Input ?? new FileStorageArticleListGetOperationInput();

        DomainListGetOperationRequest operationRequest = new(
            new()
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
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        result = new()
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new()
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

    private static FileStorageArticleEntity CreateItem(ArticleEntity item)
    {
        FileStorageArticleEntity result;

        var data = item.Data;

        var topicPathItems = item.TopicPathItems;

        result = new()
        {
            Data = new()
            {
                Id = data.Id,
                Hash = data.Hash,
                Path = data.Path,
                Title = data.Title,
                TopicId = data.TopicId,
                RowGuid = data.RowGuid.ToString()
            }
        };

        foreach (var topicPathItem in topicPathItems)
        {
            FileStorageOptionValueObject option = new()
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
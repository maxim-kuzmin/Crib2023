// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.App.GrpcServices;

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
        CatalogArticleItemGetOperationInput input = request.Input ?? new();

        ArticleDomainItemGetOperationRequest operationRequest = new(
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

        CatalogArticleItemGetOperationReply result = new()
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new()
            {
                Item = CreateItem(operationOutput.Item),
            }
        };

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(errorMessage);
        }

        foreach (var invalidInputProperty in operationResult.InvalidInputProperties)
        {
            CatalogInvalidInputProperty property = new()
            {
                Name = invalidInputProperty.Name
            };

            foreach (string propertyValue in invalidInputProperty.Values)
            {
                property.Values.Add(propertyValue);
            }

            result.InvalidInputProperties.Add(property);
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
        CatalogArticleListGetOperationInput input = request.Input ?? new();

        ArticleDomainListGetOperationRequest operationRequest = new(
            new()
            {
                PageNumber = input.PageNumber,
                PageSize = input.PageSize,
                SortDirection = input.SortDirection,
                SortField = input.SortField,
                Ids = input.Ids.ToArray(),
                IdsString = input.IdsString,
                TopicId = input.TopicId,
                TopicIds = input.TopicIds.ToArray(),
                TopicIdsString = input.TopicIdsString,
                TopicName = input.TopicName,
                Title = input.Title,
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        CatalogArticleListGetOperationReply result = new()
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
            var item = CreateItemForList(operationOutputItem);

            result.Output.Items.Add(item);
        }

        foreach (var invalidInputProperty in operationResult.InvalidInputProperties)
        {
            CatalogInvalidInputProperty property = new()
            {
                Name = invalidInputProperty.Name
            };

            foreach (string propertyValue in invalidInputProperty.Values)
            {
                property.Values.Add(propertyValue);
            }

            result.InvalidInputProperties.Add(property);
        }

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static CatalogArticleEntity CreateItem(ArticleDomainEntityForItem source)
    {
        CatalogArticleEntity result;

        var data = source.Data;

        var topicPathItems = source.TopicPathItems;

        result = new()
        {
            Data = new()
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
            CatalogOptionValueObject option = new()
            {
                Id = topicPathItem.Id,
                Name = topicPathItem.Name,
            };

            result.TopicPathItems.Add(option);
        }

        return result;
    }

    private static CatalogArticleEntityForList CreateItemForList(ArticleDomainEntityForList source)
    {
        CatalogArticleEntityForList result;

        var data = source.Data;

        var topicPathItems = source.TopicPathItems;

        result = new()
        {
            Data = new()
            {
                Id = data.Id,
                RowGuid = data.RowGuid.ToString(),
                Title = data.Title,
                TopicId = data.TopicId,
            }
        };

        foreach (var topicPathItem in topicPathItems)
        {
            CatalogOptionValueObject option = new()
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
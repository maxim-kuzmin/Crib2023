// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.Grpc.Services;

/// <summary>
/// GRPC сервис "Статья".
/// </summary>
public class ArticleGrpcService : Article.ArticleBase
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
    public override async Task<ArticleItemGetReply?> GetItem(
        ArticleItemGetRequest request,
        ServerCallContext context)
    {
        var input = new ArticleItemGetOperationInput
        {
            Id = request.Input.Id,
            Title = request.Input.Title,
        };

        var taskForItem = _mediator.Send(new DomainItemGetOperationRequest(input, request.OperationCode));

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;        

        var data = operationResult.Output.Item.Data;
        var path = operationResult.Output.Item.Path;

        var result = new ArticleItemGetReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new ArticleItemGetReplyOutput
            {
                Item = new ArticleItemGetReplyOutputItem
                {
                    Data = new ArticleItemGetReplyOutputItemData
                    {
                        Id = data.Id,
                        Title = data.Title,
                    }
                }
            }
        };

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(errorMessage);
        }

        foreach (var pathItem in path)
        {
            result.Output.Item.Path.Add(new ArticleItemGetReplyOutputItemPathItem
            {
                Id = pathItem.Id,
                Name = pathItem.Name,
            });
        }

        if (!result.IsOk)
        {
            var statusCode = operationResult.Output.IsItemNotFound
                ? StatusCode.NotFound
                : StatusCode.Internal;

            context.Status = new Status(statusCode, operationResult.CreateErrorMessage());
        }

        return result;
    }

    #endregion Public methods
}
// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.Grpc.Services;

/// <summary>
/// GRPC ������ "������".
/// </summary>
public class ArticleGrpcService : Article.ArticleBase
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// �����������.
    /// </summary>
    /// <param name="mediator">���������.</param>
    public ArticleGrpcService(IMediator mediator)
    {
        _mediator = mediator;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// �������� �������.
    /// </summary>
    /// <param name="request">������.</param>
    /// <param name="context">��������.</param>
    /// <returns>������ �� ��������� ��������.</returns>
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

        var entity = operationResult.Output.Entity;

        var result = new ArticleItemGetReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new ArticleItemGetReplyOutput
            {
                Entity = new ArticleItemGetReplyOutputEntity
                {
                    Data = new ArticleItemGetReplyOutputEntityData
                    {
                        Id = entity.Data.Id,
                        Title = entity.Data.Title,
                    }
                }
            }
        };

        foreach (string message in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(message);
        }

        foreach (string message in operationResult.SuccessMessages)
        {
            result.SuccessMessages.Add(message);
        }

        foreach (string message in operationResult.WarningMessages)
        {
            result.WarningMessages.Add(message);
        }

        foreach (var pathItem in entity.Path)
        {
            result.Output.Entity.Path.Add(new ArticleItemGetReplyOutputEntityPathItem
            {
                Id = pathItem.Id,
                Name = pathItem.Name,
            });
        }

        if (!result.IsOk)
        {
            var statusCode = operationResult.Output.IsEntityNotFound
                ? StatusCode.NotFound
                : StatusCode.Internal;

            context.Status = new Status(statusCode, operationResult.CreateErrorMessage());
        }

        return result;
    }

    #endregion Public methods
}
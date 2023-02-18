// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Grpc.Services;

/// <summary>
/// gRPC ������ �������� "������".
/// </summary>
public class ArticleGrpcService : ArticleGrpcProto.ArticleGrpcProtoBase
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
    public override async Task<ArticleItemGetOperationReplyGrpcProto> GetItem(
        ArticleItemGetOperationRequestGrpcProto request,
        ServerCallContext context)
    {
        var protoInput = request.Input ?? new ArticleItemGetOperationInputGrpcProto();

        var operationInput = new ArticleItemGetOperationInput
        {
            Id = protoInput.Id,
            Title = protoInput.Title,
            TopicId = protoInput.TopicId,
        };

        var operationRequest = new DomainItemGetOperationRequest(operationInput, request.OperationCode);

        var taskForItem = _mediator.Send(operationRequest);

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new ArticleItemGetOperationReplyGrpcProto
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new ArticleItemGetOperationOutputGrpcProto
            {
                Item = CreateProtoItem(operationOutput.Item),
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
    /// �������� ������.
    /// </summary>
    /// <param name="request">������.</param>
    /// <param name="context">��������.</param>
    /// <returns>������ �� ��������� ������.</returns>
    public override async Task<ArticleListGetOperationReplyGrpcProto> GetList(
        ArticleListGetOperationRequestGrpcProto request,
        ServerCallContext context)
    {
        var protoInput = request.Input ?? new ArticleListGetOperationInputGrpcProto();

        var operationInput = new ArticleListGetOperationInput
        {
            PageNumber = protoInput.PageNumber,
            PageSize = protoInput.PageSize,
            SortDirection = protoInput.SortDirection,
            SortField = protoInput.SortField,
            Ids = protoInput.Ids.ToArray(),
            TopicId = protoInput.TopicId,
            TopicIds = protoInput.TopicIds.ToArray(),
            TopicName = protoInput.TopicName,
            Title = protoInput.Title,
        };

        var taskForItem = _mediator.Send(new DomainListGetOperationRequest(operationInput, request.OperationCode));

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new ArticleListGetOperationReplyGrpcProto
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new ArticleListGetOperationOutputGrpcProto
            {
                TotalCount = operationOutput.TotalCount
            }
        };

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            result.ErrorMessages.Add(errorMessage);
        }

        foreach (var item in operationOutput.Items)
        {
            var protoItem = CreateProtoItem(item);

            result.Output.Items.Add(protoItem);
        }

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static ArticleEntityGrpcProto CreateProtoItem(ArticleEntity item)
    {
        ArticleEntityGrpcProto result;

        var data = item.Data;

        var topicPathItems = item.TopicPathItems;

        result = new ArticleEntityGrpcProto
        {
            Data = new ArticleTypeEntityGrpcProto
            {
                Id = data.Id,
                Title = data.Title,
            }
        };

        foreach (var topicPathItem in topicPathItems)
        {
            result.TopicPathItems.Add(new OptionValueObjectGrpcProto
            {
                Id = topicPathItem.Id,
                Name = topicPathItem.Name,
            });
        }

        return result;
    }

    #endregion Private methods
}
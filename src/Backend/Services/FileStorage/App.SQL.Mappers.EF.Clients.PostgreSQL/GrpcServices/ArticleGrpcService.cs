// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
using Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

/// <summary>
/// gRPC ������ "������".
/// </summary>
public class ArticleGrpcService : GrpcServerOfAtrticle
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
    public override async Task<FileStorageArticleItemGetOperationReply> GetItem(
        FileStorageArticleItemGetOperationRequest request,
        ServerCallContext context)
    {
        var input = request.Input ?? new FileStorageArticleItemGetOperationInput();

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

        var result = new FileStorageArticleItemGetOperationReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new FileStorageArticleItemGetOperationOutput
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
    /// �������� ������.
    /// </summary>
    /// <param name="request">������.</param>
    /// <param name="context">��������.</param>
    /// <returns>������ �� ��������� ������.</returns>
    public override async Task<FileStorageArticleListGetOperationReply> GetList(
        FileStorageArticleListGetOperationRequest request,
        ServerCallContext context)
    {
        var input = request.Input ?? new FileStorageArticleListGetOperationInput();

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

        var result = new FileStorageArticleListGetOperationReply
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new FileStorageArticleListGetOperationOutput
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

        result = new FileStorageArticleEntity
        {
            Data = new FileStorageArticleTypeEntity
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
            var option = new FileStorageOptionValueObject
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
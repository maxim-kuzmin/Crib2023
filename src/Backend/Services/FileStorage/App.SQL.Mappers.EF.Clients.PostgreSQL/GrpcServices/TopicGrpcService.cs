// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
using Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

/// <summary>
/// gRPC сервис "Тема".
/// </summary>
public class TopicGrpcService : GrpcServerOfTopic
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="mediator">Посредник.</param>
    public TopicGrpcService(IMediator mediator)
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
    public override async Task<FileStorageTopicItemGetOperationReply> GetItem(
        FileStorageTopicItemGetOperationRequest request,
        ServerCallContext context)
    {
        FileStorageTopicItemGetOperationReply result;

        FileStorageTopicItemGetOperationInput input = request.Input ?? new();

        DomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Axis = input.Axis.FromStringToEnum(TreeNodeGetOperationAxis.Self),
                Id = input.Id,
                Name = input.Name,
                ParentId = input.ParentId,
            },
            request.OperationCode);

        var taskForItem = _mediator.Send(operationRequest);

        var response = await taskForItem.ConfigureAwait(false);

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
    public override async Task<FileStorageTopicListGetOperationReply> GetList(
        FileStorageTopicListGetOperationRequest request,
        ServerCallContext context)
    {
        FileStorageTopicListGetOperationReply result;

        FileStorageTopicListGetOperationInput input = request.Input ?? new();

        DomainListGetOperationRequest operationRequest = new(
            new()
            {
                PageNumber = input.PageNumber,
                PageSize = input.PageSize,
                SortDirection = input.SortDirection,
                SortField = input.SortField,
                Axis = input.Axis.FromStringToEnum(TreePathGetOperationAxis.None),
                Ids = input.Ids.ToArray(),
                Name = input.Name,
                TreePath = input.TreePath,
            },
            request.OperationCode);

        var taskForItem = _mediator.Send(operationRequest);

        var response = await taskForItem.ConfigureAwait(false);

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

    private static FileStorageTopicEntity CreateItem(TopicEntity item)
    {
        FileStorageTopicEntity result;

        var data = item.Data;

        result = new FileStorageTopicEntity
        {
            Data = new()
            {
                Id = data.Id,
                Name = data.Name,
                ParentId = data.ParentId ?? 0,
                RowGuid = data.RowGuid.ToString()
            },
            TreeHasChildren = item.TreeHasChildren,
            TreeLevel = item.TreeLevel,
            TreePath = item.TreePath,
        };

        return result;
    }

    #endregion Private methods
}
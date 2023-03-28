// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.GrpcServices;

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

        TopicDomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Axis = input.Axis.FromStringToEnum(TreeNodeGetOperationAxis.Self),
                Id = input.Id,
                Name = input.Name,
                ParentId = input.ParentId,
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

        TopicDomainListGetOperationRequest operationRequest = new(
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

    private static FileStorageTopicEntity CreateItem(TopicDomainEntityForItem source)
    {
        FileStorageTopicEntity result;

        var data = source.Data;

        var treeAncestors = source.TreeAncestors;

        result = new()
        {
            Data = new()
            {
                Id = data.Id,
                Name = data.Name,
                ParentId = data.ParentId ?? 0,
                RowGuid = data.RowGuid.ToString()
            },
            TreeHasChildren = source.TreeHasChildren,
            TreeLevel = source.TreeLevel,
            TreePath = source.TreePath,
        };

        foreach (var treeAncestor in treeAncestors)
        {
            FileStorageOptionValueObject option = new()
            {
                Id = treeAncestor.Id,
                Name = treeAncestor.Name,
            };

            result.TreeAncestors.Add(option);
        }

        return result;
    }

    #endregion Private methods
}
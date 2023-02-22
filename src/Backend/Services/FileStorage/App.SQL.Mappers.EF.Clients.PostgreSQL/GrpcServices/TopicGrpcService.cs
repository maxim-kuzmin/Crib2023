// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;
using Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.GrpcServices;

/// <summary>
/// gRPC сервис "Тема".
/// </summary>
public class TopicGrpcService : TopicGrpcProto.TopicGrpcProtoBase
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
    public override async Task<TopicItemGetOperationReplyGrpcProto> GetItem(
        TopicItemGetOperationRequestGrpcProto request,
        ServerCallContext context)
    {
        var protoInput = request.Input ?? new TopicItemGetOperationInputGrpcProto();

        var operationInput = new TopicItemGetOperationInput
        {
            Axis = protoInput.Axis.FromStringToEnum(TreeNodeGetOperationAxis.Self),
            Id = protoInput.Id,
            Name = protoInput.Name,
            ParentId = protoInput.ParentId,
        };

        var operationRequest = new DomainItemGetOperationRequest(operationInput, request.OperationCode);

        var taskForItem = _mediator.Send(operationRequest);

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new TopicItemGetOperationReplyGrpcProto
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new TopicItemGetOperationOutputGrpcProto
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
    /// Получить список.
    /// </summary>
    /// <param name="request">Запрос.</param>
    /// <param name="context">Контекст.</param>
    /// <returns>Задача на получение списка.</returns>
    public override async Task<TopicListGetOperationReplyGrpcProto> GetList(
        TopicListGetOperationRequestGrpcProto request,
        ServerCallContext context)
    {
        var protoInput = request.Input ?? new TopicListGetOperationInputGrpcProto();

        var operationInput = new TopicListGetOperationInput
        {
            PageNumber = protoInput.PageNumber,
            PageSize = protoInput.PageSize,
            SortDirection = protoInput.SortDirection,
            SortField = protoInput.SortField,
            Axis = protoInput.Axis.FromStringToEnum(TreePathGetOperationAxis.None),
            Ids = protoInput.Ids.ToArray(),
            Name = protoInput.Name,
            TreePath = protoInput.TreePath,
        };

        var taskForItem = _mediator.Send(new DomainListGetOperationRequest(operationInput, request.OperationCode));

        var response = await taskForItem.ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        var result = new TopicListGetOperationReplyGrpcProto
        {
            IsOk = operationResult.IsOk,
            OperationCode = operationResult.OperationCode,
            Output = new TopicListGetOperationOutputGrpcProto
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

    private static TopicEntityGrpcProto CreateProtoItem(TopicEntity item)
    {
        TopicEntityGrpcProto result;

        var data = item.Data;

        result = new TopicEntityGrpcProto
        {
            Data = new TopicTypeEntityGrpcProto
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
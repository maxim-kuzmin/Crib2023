// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.App.GrpcServices;

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
    public override async Task<CatalogTopicItemGetOperationReply> GetItem(
        CatalogTopicItemGetOperationRequest request,
        ServerCallContext context)
    {
        CatalogTopicItemGetOperationInput input = request.Input ?? new();

        TopicDomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Axis = input.Axis.FromStringToEnum(TreeGetOperationAxisForItem.Self),
                Id = input.Id,
                Name = input.Name,
                ParentId = input.ParentId,
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        CatalogTopicItemGetOperationReply result = new()
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
    public override async Task<CatalogTopicListGetOperationReply> GetList(
        CatalogTopicListGetOperationRequest request,
        ServerCallContext context)
    {
        CatalogTopicListGetOperationInput input = request.Input ?? new();

        TopicDomainListGetOperationRequest operationRequest = new(
            new()
            {
                PageNumber = input.PageNumber,
                PageSize = input.PageSize,
                SortDirection = input.SortDirection,
                SortField = input.SortField,
                Axis = input.Axis.FromStringToEnum(TreeGetOperationAxisForList.None),
                ExpandedNodeIds = input.ExpandedNodeIds.ToArray(),
                ExpandedNodeIdsString = input.ExpandedNodeIdsString,
                RootNodeId = input.RootNodeId,
                RootNodeTreePath = input.RootNodeTreePath,
                Ids = input.Ids.ToArray(),
                IdsString = input.IdsString,
                Name = input.Name
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        CatalogTopicListGetOperationReply result = new()
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
    /// Получить дерево.
    /// </summary>
    /// <param name="request">Запрос.</param>
    /// <param name="context">Контекст.</param>
    /// <returns>Задача на получение дерева.</returns>
    public override async Task<CatalogTopicTreeGetOperationReply> GetTree(
        CatalogTopicTreeGetOperationRequest request,
        ServerCallContext context)
    {
        CatalogTopicTreeGetOperationInput input = request.Input ?? new();

        TopicDomainTreeGetOperationRequest operationRequest = new(
            new()
            {
                PageNumber = input.PageNumber,
                PageSize = input.PageSize,
                SortDirection = input.SortDirection,
                SortField = input.SortField,
                Axis = input.Axis.FromStringToEnum(TreeGetOperationAxisForList.None),
                ExpandedNodeIds = input.ExpandedNodeIds.ToArray(),
                ExpandedNodeIdsString = input.ExpandedNodeIdsString,
                RootNodeId = input.RootNodeId,
                RootNodeTreePath = input.RootNodeTreePath
            },
            request.OperationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        var operationOutput = operationResult.Output;

        CatalogTopicTreeGetOperationReply result = new()
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

        foreach (var operationOutputNode in operationOutput.Nodes)
        {
            var node = CreateNode(operationOutputNode);

            result.Output.Nodes.Add(node);
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

    private static CatalogTopicEntityForItem CreateItem(TopicDomainEntityForItem source)
    {
        CatalogTopicEntityForItem result;

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
            CatalogOptionValueObject ancestor = new()
            {
                Id = treeAncestor.Id,
                Name = treeAncestor.Name,
            };

            result.TreeAncestors.Add(ancestor);
        }

        return result;
    }

    private static CatalogTopicEntityForTree CreateNode(TopicDomainEntityForTree source)
    {
        CatalogTopicEntityForTree result;

        var data = source.Data;

        var treeChildren = source.TreeChildren;

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

        foreach (var treeChild in treeChildren)
        {
            var child = CreateNode(treeChild);

            result.TreeChildren.Add(child);
        }

        return result;
    }

    #endregion Private methods
}
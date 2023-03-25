// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.App.GrpcServices;

/// <summary>
/// gRPC ������ "����".
/// </summary>
public class TopicGrpcService : GrpcServerOfTopic
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// �����������.
    /// </summary>
    /// <param name="mediator">���������.</param>
    public TopicGrpcService(IMediator mediator)
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
    public override async Task<CatalogTopicItemGetOperationReply> GetItem(
        CatalogTopicItemGetOperationRequest request,
        ServerCallContext context)
    {
        CatalogTopicItemGetOperationInput input = request.Input ?? new();

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
    /// �������� ������.
    /// </summary>
    /// <param name="request">������.</param>
    /// <param name="context">��������.</param>
    /// <returns>������ �� ��������� ������.</returns>
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
                Axis = input.Axis.FromStringToEnum(TreePathGetOperationAxis.None),
                Ids = input.Ids.ToArray(),
                Name = input.Name,
                TreePath = input.TreePath,
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

    #endregion Public methods

    #region Private methods

    private static CatalogTopicEntity CreateItem(TopicDomainEntity source)
    {
        CatalogTopicEntity result;

        var data = source.Data;

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

        return result;
    }

    #endregion Private methods
}
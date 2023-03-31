// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Входные данные операции получения элемента в домене "Тема".
/// </summary>
public class TopicDomainItemGetOperationInput : ItemGetOperationInputWithInt64Id
{
    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreeGetOperationAxisForItem Axis { get; set; }

    /// <summary>
    /// Имя.
    /// </summary>
    public string Name { get; set; } = "";

    /// <summary>
    /// Идентификатор родителя.
    /// </summary>
    public long ParentId { get; set; }

    #endregion Properties

    #region Public methods

    /// <summary>
    /// Создать предикат.
    /// </summary>
    /// <returns>Предикат.</returns>
    public ExpressionStarter<ClientMapperTopicTypeEntity> CreatePredicate()
    {
        var result = PredicateBuilder.New<ClientMapperTopicTypeEntity>(true);

        if (Id > 0)
        {
            result = result.And(x => x.Id == Id);
        }

        if (!string.IsNullOrWhiteSpace(Name))
        {
            result = result.And(x => x.Name == Name);
        }

        if (ParentId > 0)
        {
            result = result.And(x => x.ParentId == ParentId);
        }

        return result;
    }

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (Axis == TreeGetOperationAxisForItem.Parent && ParentId > 0)
        {
            Axis = TreeGetOperationAxisForItem.Self;
            Id = ParentId;
        }

        if (Id > 0)
        {
            Name = "";
            ParentId = 0;
        }
    }

    /// <inheritdoc/>
    public sealed override OperationInputInvalidProperties GetInvalidProperties(
        IOperationsResource operationsResource)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public OperationInputInvalidProperties GetInvalidProperties(
        ITopicDomainResource domainResource,
        IOperationsResource operationsResource)
    {
        var result = base.GetInvalidProperties(operationsResource);

        if (result.Any())
        {
            bool isNameInvalid = string.IsNullOrWhiteSpace(Name);
            bool isParentIdInvalid = ParentId < 1;

            if (isNameInvalid || isParentIdInvalid)
            {
                if (isNameInvalid)
                {
                    var values = result.GetOrAdd(nameof(Name));

                    string value = domainResource.GetValidValueForName();

                    values.Add(value);
                }

                if (isParentIdInvalid)
                {
                    var values = result.GetOrAdd(nameof(ParentId));

                    string value = domainResource.GetValidValueForParentId();

                    values.Add(value);
                }
            }
            else
            {
                result.Clear();
            }
        }

        return result;
    }

    #endregion Public methods
}

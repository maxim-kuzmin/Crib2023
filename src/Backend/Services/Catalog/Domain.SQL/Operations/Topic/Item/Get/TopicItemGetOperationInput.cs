// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.Item.Get;

/// <summary>
/// Входные данные операции получения элемента "Тема".
/// </summary>
public class TopicItemGetOperationInput : ItemWithInt64IdGetOperationInput
{
    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreeNodeGetOperationAxis Axis { get; set; }

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

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (Axis == TreeNodeGetOperationAxis.Parent && ParentId > 0)
        {
            Axis = TreeNodeGetOperationAxis.Self;
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
        IResourceOfCommonDataSQL resourceOfCommonDataSQL)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public OperationInputInvalidProperties GetInvalidProperties(
        IResource resource,
        IResourceOfCommonDataSQL resourceOfCommonDataSQL)
    {
        var result = base.GetInvalidProperties(resourceOfCommonDataSQL);

        if (result.Any())
        {            
            bool isNameInvalid = string.IsNullOrWhiteSpace(Name);
            bool isParentIdInvalid = ParentId < 1;

            if (isNameInvalid || isParentIdInvalid)
            {
                if (isNameInvalid)
                {
                    var values = result.GetOrAdd(nameof(Name));

                    string value = resource.GetValidValueForName();

                    values.Add(value);
                }

                if (isParentIdInvalid)
                {
                    var values = result.GetOrAdd(nameof(ParentId));

                    string value = resource.GetValidValueForParentId();

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

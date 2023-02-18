// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Data.SQL.Operations.Tree.Node.Get;

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.Item.Get;

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

        if (Id > 0)
        {
            Name = "";
            ParentId = 0;
        }
    }

    /// <inheritdoc/>
    public sealed override List<string> GetInvalidProperties()
    {
        var result = base.GetInvalidProperties();

        if (result.Any())
        {
            bool isNameInvalid = string.IsNullOrWhiteSpace(Name);
            bool isParentIdInvalid = ParentId < 1;

            if (isNameInvalid || isParentIdInvalid)
            {
                if (isNameInvalid)
                {
                    result.Add(nameof(Name));
                }

                if (isParentIdInvalid)
                {
                    result.Add(nameof(ParentId));
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

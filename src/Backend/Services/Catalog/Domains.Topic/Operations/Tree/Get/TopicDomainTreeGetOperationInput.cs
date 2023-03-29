// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Входные данные операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationInput : TreeGetOperationInputWithInt64NodeId
{
    #region Fields

    private readonly TopicDomainListGetOperationInput _listInput = new();

    #endregion Fields

    #region Operators

    /// <summary>
    /// Неявное преобразование к входным данным операции получения списка.
    /// </summary>
    /// <param name="input"></param>
    public static implicit operator TopicDomainListGetOperationInput(
        TopicDomainTreeGetOperationInput input
        ) => input._listInput;

    #endregion Operators

    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreeGetOperationAxisForList Axis => _listInput.Axis;

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[] Ids => _listInput.Ids;

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string IdsString => _listInput.IdsString;

    /// <summary>
    /// Имя.
    /// </summary>
    public string Name => _listInput.Name;

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string TreePath => _listInput.TreePath;

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        _listInput.Normalize();
    }

    #endregion Public methods
}

// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.List.Get;

/// <summary>
/// Входные данные операции получения списка в домене "Тема".
/// </summary>
public class TopicDomainListGetOperationInput : TopicDomainTreeGetOperationInput
{
    #region Properties

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[] Ids { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string IdsString { get; set; } = "";

    /// <summary>
    /// Имя.
    /// </summary>
    public string Name { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (!string.IsNullOrWhiteSpace(IdsString) && !Ids.Any())
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }

        if (Ids.Any() || !string.IsNullOrEmpty(Name))
        {
            Axis = TreeGetOperationAxisForList.None;

            ExpandedNodeId = 0;
            ExpandedNodeIds = Array.Empty<long>();
            ExpandedNodeIdsString = "";
        }
    }

    /// <summary>
    /// Создать предикат.
    /// </summary>
    /// <returns>Предикат.</returns>
    public sealed override ExpressionStarter<ClientMapperTopicTypeEntity> CreatePredicate()
    {
        ExpressionStarter<ClientMapperTopicTypeEntity> result;

        if (Axis == TreeGetOperationAxisForList.None)
        {
            result = PredicateBuilder.New<ClientMapperTopicTypeEntity>(true);

            if (!string.IsNullOrWhiteSpace(Name))
            {
                result = result.And(x => x.Name.Contains(Name));
            }

            if (Ids != null && Ids.Any())
            {
                if (Ids.Length > 1)
                {
                    result = result.And(x => Ids.Contains(x.Id));
                }
                else
                {
                    long id = Ids[0];

                    result = result.And(x => x.Id == id);
                }
            }
        }
        else
        {
            result = base.CreatePredicate();
        }

        return result;
    }

    #endregion Public methods
}

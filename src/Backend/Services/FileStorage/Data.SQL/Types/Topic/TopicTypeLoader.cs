// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;

/// <summary>
/// Загрузчик типа "Тема".
/// </summary>
public class TopicTypeLoader : Loader<TopicTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public TopicTypeLoader(TopicTypeEntity? target = null)
        : base(target ?? new TopicTypeEntity())
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override HashSet<string> Load(
        TopicTypeEntity source,
        HashSet<string>? loadableProperties = null)
    {
        var result = base.Load(source, loadableProperties);

        if (result.Contains(nameof(Target.Id)))
        {
            Target.Id = source.Id;
        }

        if (result.Contains(nameof(Target.Name)))
        {
            Target.Name = source.Name;
        }

        if (result.Contains(nameof(Target.ParentId)))
        {
            Target.ParentId = source.ParentId;
        }

        if (result.Contains(nameof(Target.RowGuid)))
        {
            Target.RowGuid = source.RowGuid;
        }

        return result;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override HashSet<string> CreateAllPropertiesToLoad()
    {
        return new HashSet<string>
        {
            nameof(Target.Id),
            nameof(Target.Name),
            nameof(Target.ParentId),
            nameof(Target.RowGuid),
        };
    }

    #endregion Protected methods
}

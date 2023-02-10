// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.Item.Get;

/// <summary>
/// Входные данные операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationInput : ItemGetOperationInput
{
    #region Properties

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string Title { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (Id > 0)
        {
            Title = "";
        }
    }

    /// <inheritdoc/>
    public sealed override List<string> GetInvalidProperties()
    {
        var result = base.GetInvalidProperties();

        if (result.Any())
        {
            if (string.IsNullOrWhiteSpace(Title))
            {
                result.Add(nameof(Title));                
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

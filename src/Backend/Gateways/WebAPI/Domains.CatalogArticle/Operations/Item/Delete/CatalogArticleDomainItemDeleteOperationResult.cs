﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Delete;

/// <summary>
/// Результат операции удаления элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemDeleteOperationResult : OperationResult
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<NamedValues<string>> InvalidInputProperties { get; } = new();

    #endregion Properties
}

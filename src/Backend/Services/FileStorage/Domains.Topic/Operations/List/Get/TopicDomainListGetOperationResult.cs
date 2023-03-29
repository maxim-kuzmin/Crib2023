﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Core;

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.List.Get;

/// <summary>
/// Результат операции получения списка в домене "Тема".
/// </summary>
public class TopicDomainListGetOperationResult : OperationResultWithOutput<TopicDomainListGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<NamedValues<string>> InvalidInputProperties { get; } = new();

    #endregion Properties
}

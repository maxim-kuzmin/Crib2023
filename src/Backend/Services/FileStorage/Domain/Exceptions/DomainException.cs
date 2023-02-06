// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Exceptions;

/// <summary>
/// Доменное исключение.
/// </summary>
public class DomainException : Exception
{
    public DomainException()
    { }

    public DomainException(string message)
        : base(message)
    { }

    public DomainException(string message, Exception innerException)
        : base(message, innerException)
    { }
}
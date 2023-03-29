// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic
{
    /// <summary>
    /// Интерфейс ресурса домена "Тема".
    /// </summary>
    public interface ITopicDomainResource
    {
        #region Methods

        /// <summary>
        /// Получить имя операции получения элемента.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetItemGetOperationName();

        /// <summary>
        /// Получить имя операции получения списка.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetListGetOperationName();

        /// <summary>
        /// Получить имя операции получения дерева.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetTreeGetOperationName();

        /// <summary>
        /// Получить корректное значение свойства "Name".
        /// </summary>
        /// <returns>Корректное значение.</returns>
        string GetValidValueForName();

        /// <summary>
        /// Получить корректное значение свойства "ParentId".
        /// </summary>
        /// <returns>Корректное значение.</returns>
        string GetValidValueForParentId();

        #endregion Methods
    }
}

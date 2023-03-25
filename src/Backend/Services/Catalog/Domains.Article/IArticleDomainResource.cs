// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article
{
    /// <summary>
    /// Интерфейс ресурса домена "Статья".
    /// </summary>
    public interface IArticleDomainResource
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
        /// Получить корректное значение свойства "Title".
        /// </summary>
        /// <returns>Корректное значение.</returns>
        string GetValidValueForTitle();

        /// <summary>
        /// Получить корректное значение свойства "TopicId".
        /// </summary>
        /// <returns>Корректное значение.</returns>
        string GetValidValueForTopicId();

        #endregion Methods
    }
}

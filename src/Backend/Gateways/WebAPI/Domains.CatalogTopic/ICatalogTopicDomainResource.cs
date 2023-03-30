// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic
{
    /// <summary>
    /// Интерфейс ресурса домена.
    /// </summary>
    public interface ICatalogTopicDomainResource
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

        #endregion Methods
    }
}

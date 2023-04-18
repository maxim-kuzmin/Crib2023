// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle
{
    /// <summary>
    /// Интерфейс ресурса домена.
    /// </summary>
    public interface ICatalogArticleDomainResource
    {
        #region Methods

        /// <summary>
        /// Получить имя операции удаления элемента.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetItemDeleteOperationName();

        /// <summary>
        /// Получить имя операции получения элемента.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetItemGetOperationName();

        /// <summary>
        /// Получить имя операции сохранения элемента.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetItemSaveOperationName();

        /// <summary>
        /// Получить имя операции получения списка.
        /// </summary>
        /// <returns>Имя операции.</returns>
        string GetListGetOperationName();

        #endregion Methods
    }
}

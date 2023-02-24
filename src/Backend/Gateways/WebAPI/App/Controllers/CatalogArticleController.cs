// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers;

/// <summary>
/// Контроллер статьи в каталоге.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CatalogArticleController : ControllerBase
{
    #region Fields

    private readonly GrpcClientOfCatalogArticle _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="client">Клиент.</param>
    public CatalogArticleController(GrpcClientOfCatalogArticle client)
    {
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение списка.</returns>
    [HttpGet]
    public async Task<ActionResult<CatalogArticleListGetOperationReply>> GetList(
        [FromQuery] CatalogArticleListGetOperationInput input,
        [FromHeader(Name = nameof(CatalogArticleListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleListGetOperationRequest request = new()
        {
            Input = input,
            OperationCode = operationCode,
        };

        var response = await _client.GetListAsync(request).ConfigureAwait(false);

        if (response.IsOk)
        {
            return Ok(response);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    // GET api/<CatalogArticleItemController>/5
    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CatalogArticleItemGetOperationReply>> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(CatalogArticleListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleItemGetOperationRequest request = new()
        {
            Input = new()
            {
                Id = id
            },
            OperationCode = operationCode,
        };

        var response = await _client.GetItemAsync(request).ConfigureAwait(false);

        if (response.IsOk)
        {
            return Ok(response);
        }
        else if (response.Output.IsItemNotFound)
        {
            return NotFound(response);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    #endregion Public methods
}

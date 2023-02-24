// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers;

/// <summary>
/// Контроллер "Тема в каталоге".
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CatalogTopicController : ControllerBase
{
    #region Fields

    private readonly GrpcClientOfCatalogTopic _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="client">Клиент.</param>
    public CatalogTopicController(GrpcClientOfCatalogTopic client)
    {
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CatalogTopicItemGetOperationReply>> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(CatalogTopicItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogTopicItemGetOperationRequest request = new()
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

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение списка.</returns>
    [HttpGet]
    public async Task<ActionResult<CatalogTopicListGetOperationReply>> GetList(
        [FromQuery] CatalogTopicListGetOperationInput input,
        [FromHeader(Name = nameof(CatalogTopicListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogTopicListGetOperationRequest request = new()
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

    #endregion Public methods
}

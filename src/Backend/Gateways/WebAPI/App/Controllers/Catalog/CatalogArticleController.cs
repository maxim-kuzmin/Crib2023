// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers.Catalog;

/// <summary>
/// Контроллер "Статья в каталоге".
/// </summary>
[Route("api")]
[ApiController]
public class CatalogArticleController : ControllerBase
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="mediator">Посредник.</param>
    public CatalogArticleController(IMediator mediator)
    {
        _mediator = mediator;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Удалить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpDelete("[controller]Item-{id}")]
    [ProducesResponseType(typeof(CatalogArticleItemGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(CatalogArticleDomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleDomainItemDeleteOperationRequest operationRequest = new(
            new()
            {
                Id = id,
            },
            operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            WebAppResponse response = new(operationResult.OperationCode);

            return Ok(response);
        }
        else if (operationResult.InvalidInputProperties.Any())
        {
            WebAppResponseWithDetails response = new(
                operationResult.OperationCode,
                new(operationResult.InvalidInputProperties, operationResult.ErrorMessages.FromSentencesToText()));

            return BadRequest(response);
        }
        else
        {
            WebAppResponseWithMessages response = new(
                operationResult.OperationCode,
                new(operationResult.ErrorMessages));

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpGet("[controller]Item-{id}")]
    [ProducesResponseType(typeof(CatalogArticleItemGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(CatalogArticleDomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleDomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Id = id,
            },
            operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Item.Data.Id > 0)
            {
                CatalogArticleItemGetResponse response = new(
                    operationResult.OperationCode,
                    operationResult.Output);

                return Ok(response);
            }
            else
            {
                WebAppResponse response = new(operationResult.OperationCode);

                return NotFound(response);
            }
        }
        else if (operationResult.InvalidInputProperties.Any())
        {
            WebAppResponseWithDetails response = new(
                operationResult.OperationCode,
                new(operationResult.InvalidInputProperties, operationResult.ErrorMessages.FromSentencesToText()));

            return BadRequest(response);
        }
        else
        {
            WebAppResponseWithMessages response = new(
                operationResult.OperationCode,
                new(operationResult.ErrorMessages));

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    /// <summary>
    /// Обновить элемент.
    /// </summary>
    /// <param name="input">Входные данные</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpPost("[controller]Item")]
    [ProducesResponseType(typeof(CatalogArticleItemGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> InsertItem(
        [FromBody] CatalogArticleTypeEntity input,
        [FromHeader(Name = nameof(CatalogArticleDomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleDomainItemSaveOperationRequest operationRequest = new(
            input,
            operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Item.Data.Id > 0)
            {
                CatalogArticleItemGetResponse response = new(
                    operationResult.OperationCode,
                    operationResult.Output);

                return Ok(response);
            }
            else
            {
                WebAppResponse response = new(operationResult.OperationCode);

                return NotFound(response);
            }
        }
        else if (operationResult.InvalidInputProperties.Any())
        {
            WebAppResponseWithDetails response = new(
                operationResult.OperationCode,
                new(operationResult.InvalidInputProperties, operationResult.ErrorMessages.FromSentencesToText()));

            return BadRequest(response);
        }
        else
        {
            WebAppResponseWithMessages response = new(
                operationResult.OperationCode,
                new(operationResult.ErrorMessages));

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    /// <summary>
    /// Обновить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="input">Входные данные</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpPut("[controller]Item-{id}")]
    [ProducesResponseType(typeof(CatalogArticleItemGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateItem(
        [FromRoute] long id,
        [FromBody] CatalogArticleTypeEntity input,
        [FromHeader(Name = nameof(CatalogArticleDomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        if (id > 0 && input.Id != id)
        {
            input.Id = id;
        }

        CatalogArticleDomainItemSaveOperationRequest operationRequest = new(
            input,
            operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Item.Data.Id > 0)
            {
                CatalogArticleItemGetResponse response = new(
                    operationResult.OperationCode,
                    operationResult.Output);

                return Ok(response);
            }
            else
            {
                WebAppResponse response = new(operationResult.OperationCode);

                return NotFound(response);
            }
        }
        else if (operationResult.InvalidInputProperties.Any())
        {
            WebAppResponseWithDetails response = new(
                operationResult.OperationCode,
                new(operationResult.InvalidInputProperties, operationResult.ErrorMessages.FromSentencesToText()));

            return BadRequest(response);
        }
        else
        {
            WebAppResponseWithMessages response = new(
                operationResult.OperationCode,
                new(operationResult.ErrorMessages));

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение списка.</returns>
    [HttpGet("[controller]List")]
    [ProducesResponseType(typeof(CatalogArticleListGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetList(
        [FromQuery] CatalogArticleListGetOperationInput input,
        [FromHeader(Name = nameof(CatalogArticleDomainListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogArticleDomainListGetOperationRequest operationRequest = new(input, operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Items.Any())
            {
                CatalogArticleListGetResponse response = new(
                    operationResult.OperationCode,
                    operationResult.Output);

                return Ok(response);
            }
            else
            {
                WebAppResponse response = new(operationResult.OperationCode);

                return NotFound(response);
            }
        }
        else if (operationResult.InvalidInputProperties.Any())
        {
            WebAppResponseWithDetails response = new(
                operationResult.OperationCode,
                new(operationResult.InvalidInputProperties, operationResult.ErrorMessages.FromSentencesToText()));

            return BadRequest(response);
        }
        else
        {
            WebAppResponseWithMessages response = new(
                operationResult.OperationCode,
                new(operationResult.ErrorMessages));

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    #endregion Public methods
}

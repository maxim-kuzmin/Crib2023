// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Get;
using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.List.Get;
using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;
using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers;

/// <summary>
/// Контроллер "Статья в каталоге".
/// </summary>
[Route("api/[controller]")]
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
    /// Получить элемент.
    /// </summary>
    /// <param name="id">Идентификатор.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение элемента.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<CatalogArticleItemGetOperationResult>> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(DomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        DomainItemGetOperationRequest operationRequest = new(
            new()
            {
                Id = id,
            },
            operationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        if (operationResult.IsOk)
        {
            return Ok(operationResult);
        }
        else if (operationResult.Output.IsItemNotFound)
        {
            return NotFound(operationResult);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError, operationResult);
        }
    }

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение списка.</returns>
    [HttpGet]
    public async Task<ActionResult<CatalogArticleListGetOperationResult>> GetList(
        [FromQuery] CatalogArticleListGetOperationInput input,
        [FromHeader(Name = nameof(DomainListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        DomainListGetOperationRequest operationRequest = new(input, operationCode);

        var response = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = response.OperationResult;

        if (operationResult.IsOk)
        {
            return Ok(operationResult);
        }
        else
        {
            return StatusCode(StatusCodes.Status500InternalServerError, operationResult);
        }
    }

    #endregion Public methods
}

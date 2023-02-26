﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;
using Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers;

/// <summary>
/// Контроллер "Статья в каталоге".
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class CatalogTopicController : ControllerBase
{
    #region Fields

    private readonly IMediator _mediator;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="mediator">Посредник.</param>
    public CatalogTopicController(IMediator mediator)
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
    [ProducesResponseType(typeof(CatalogTopicItemGetDataResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppInputValidationErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(DomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        DomainItemGetOperationRequest operationRequest = new(
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
                CatalogTopicItemGetDataResponse response = new(
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
            WebAppInputValidationErrorResponse response = new(
                operationResult.OperationCode,
                operationResult.ErrorMessages,
                operationResult.InvalidInputProperties);

            return BadRequest(response);
        }
        else
        {
            WebAppErrorResponse response = new(
                operationResult.OperationCode,
                operationResult.ErrorMessages);

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение списка.</returns>
    [HttpGet]
    [ProducesResponseType(typeof(CatalogTopicListGetDataResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppInputValidationErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetList(
        [FromQuery] CatalogTopicListGetOperationInput input,
        [FromHeader(Name = nameof(DomainListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        DomainListGetOperationRequest operationRequest = new(input, operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Items.Any())
            {
                CatalogTopicListGetDataResponse response = new(
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
            WebAppInputValidationErrorResponse response = new(
                operationResult.OperationCode,
                operationResult.ErrorMessages,
                operationResult.InvalidInputProperties);

            return BadRequest(response);
        }
        else
        {
            WebAppErrorResponse response = new(
                operationResult.OperationCode,
                operationResult.ErrorMessages);

            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }
    }

    #endregion Public methods
}

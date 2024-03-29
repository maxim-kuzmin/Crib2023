﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Controllers.Catalog;

/// <summary>
/// Контроллер "Тема в каталоге".
/// </summary>
[Route("api")]
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
    [HttpGet("[controller]Item-{id}")]
    [ProducesResponseType(typeof(CatalogTopicItemGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetItem(
        [FromRoute] long id,
        [FromHeader(Name = nameof(CatalogTopicDomainItemGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogTopicDomainItemGetOperationRequest operationRequest = new(
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
                CatalogTopicItemGetResponse response = new(
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
    [ProducesResponseType(typeof(CatalogTopicListGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetList(
        [FromQuery] CatalogTopicListGetOperationInput input,
        [FromHeader(Name = nameof(CatalogTopicDomainListGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogTopicDomainListGetOperationRequest operationRequest = new(input, operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Items.Any())
            {
                CatalogTopicListGetResponse response = new(
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
    /// Получить дерево.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    /// <returns>Задача на получение дерева.</returns>
    [HttpGet("[controller]Tree")]
    [ProducesResponseType(typeof(CatalogTopicTreeGetResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WebAppResponseWithDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WebAppResponse), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WebAppResponseWithMessages), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTree(
        [FromQuery] CatalogTopicTreeGetOperationInput input,
        [FromHeader(Name = nameof(CatalogTopicDomainTreeGetOperationRequest.OperationCode))] string operationCode = "")
    {
        CatalogTopicDomainTreeGetOperationRequest operationRequest = new(input, operationCode);

        var operationResponse = await _mediator.Send(operationRequest).ConfigureAwait(false);

        var operationResult = operationResponse.OperationResult;

        if (operationResult.IsOk)
        {
            if (operationResult.Output.Nodes.Any())
            {
                CatalogTopicTreeGetResponse response = new(
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

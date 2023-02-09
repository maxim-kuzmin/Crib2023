// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.Grpc.Services;

public class ArticleGrpcService : Article.ArticleBase
{
    private readonly ILogger _logger;

    private readonly IMediator _mediator;

    public ArticleGrpcService(ILogger<ArticleGrpcService> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    public override async Task<ArticleItemGetReply?> GetItem(ArticleItemGetRequest request, ServerCallContext context)
    {
        var input = new ArticleItemGetOperationInput
        {
            Id = request.Input.Id,
            Title = request.Input.Title,
        };

        var response = await _mediator.Send(new DomainItemGetOperationRequest(input));

        var operationResult = response.OperationResult;

        if (operationResult is null)
        {
            context.Status = new Status(StatusCode.Unknown, "Operation result does not exist");

            return null;
        }

        if (operationResult.IsOk)
        {
            var output = operationResult.Output;

            if (output is null)
            {
                context.Status = new Status(StatusCode.Unknown, "Output does not exist");

                return null;
            }

            var entity = output.Entity;

            if (entity is null)
            {
                context.Status = new Status(StatusCode.NotFound, "Entity does not exist");

                return null;
            }

            var result = new ArticleItemGetReply
            {
                Entity = new ArticleItemGetReplyEntity
                {
                    Data = new ArticleItemGetReplyEntityData
                    {
                        Id = entity.Data.Id,
                        Title = entity.Data.Title,                        
                    }
                }                
            };

            foreach (var pathItem in entity.Path)
            {
                result.Entity.Path.Add(new ArticleItemGetReplyEntityPathItem
                {
                    Id = pathItem.Id,
                    Name = pathItem.Name,
                });
            }

            return result;
        }
        else
        {
            var errorMessages = operationResult.ErrorMessages;

            if (errorMessages is null || !errorMessages.Any())
            {
                context.Status = new Status(StatusCode.NotFound, "Error messages do not exist");

                return null;
            }

            context.Status = new Status(StatusCode.Internal, string.Join(". ", errorMessages));

            return null;
        }
    }
}
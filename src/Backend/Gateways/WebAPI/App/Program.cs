// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options =>
    {
        options.RouteTemplate = "api/swagger/{documentName}/swagger.json";
    });

    app.UseSwaggerUI(c =>
    {
        c.RoutePrefix = "api/swagger";
        c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "My API V1");        
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();

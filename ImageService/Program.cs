using System.Globalization;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Rewrite;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddSimpleConsole();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpLogging(o =>
{
    o.LoggingFields = HttpLoggingFields.RequestProperties;
});

WebApplication app = builder.Build();
var options = new RewriteOptions();
// Remove double slashes
options.AddRewrite("/*(.*)", "$1", false);
app.UseRewriter(options);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRequestLocalization(o =>
{
    o.DefaultRequestCulture = new RequestCulture(CultureInfo.InvariantCulture);
});

app.MapControllers();

app.Run();

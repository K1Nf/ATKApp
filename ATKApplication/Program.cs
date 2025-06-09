using ATKApplication.DataBase;
using ATKApplication.Services;
using Newtonsoft.Json.Converters;
using System.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ATKApplication.Extensions;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPasswordHash, PasswordHasher>();

builder.Services.AddDbContext<DataBaseContext>();
builder.Services.AddHttpContextAccessor();


builder.Services.Configure<JWTConfiguration>(builder.Configuration.GetSection(nameof(JWTConfiguration)));



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, o =>
    {
        var jwt = builder.Configuration.GetSection(nameof(JWTConfiguration));

        var key = jwt.GetSection(nameof(JWTConfiguration.SecretKey));
        var issuer = jwt.GetSection(nameof(JWTConfiguration.Issuer));
        var audience = jwt.GetSection(nameof(JWTConfiguration.Audience));

        o.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidIssuer = issuer.Value,

            ValidateAudience = true,
            ValidAudience = audience.Value,

            ValidateLifetime = true,
            RequireExpirationTime = true,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key.Value!))
        };


        o.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                string? token = context.Request.Cookies["tokenATK"] ??
                context.Request.Headers.Authorization
                .ToString()
                .Replace("Bearer ", "");

                if (!string.IsNullOrWhiteSpace(token))
                {
                    context.Token = token.Replace("Bearer ", "");
                }

                return Task.CompletedTask;
            }
        };
    });



builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });



builder.Services.AddScoped<EventService>();
builder.Services.AddScoped<AuthService>();



var app = builder.Build();


app.UseHsts();
app.UseHttpsRedirection();

app.UseRouting();

app.UseStatusCodePages(async context => {

    var request = context.HttpContext.Request;
    var response = context.HttpContext.Response;

    if (response.StatusCode == (int)HttpStatusCode.Unauthorized)
    {
        response.Redirect("/login");
    }

    if (response.StatusCode == (int)HttpStatusCode.NotFound)
    {
        response.ContentType = "text/html; charset=utf-8";

        string responseHTML = "<!DOCTYPE html>\r\n" +
                    "<html>\r\n" +
                    "<head>\r\n    " +
                        "<meta charset=\"utf-8\" />\r\n    " +
                        "<title>Страница не найдена!</title>\r\n" +
                    "</head>\r\n" +
                    "<body>\r\n    " +
                        "<div>\r\n       " +
                            "<h1 style=\"font-size:300%; color: black; text-align: center;\">Содержимое, которое вы ищете, не найдено</h1>\r\n       " +
                            "<h1 style=\"font-size:200%; color: black; text-align: center;\">Убедитесь, что ввели правильный адрес</h1>\r\n       " +
                            //$"<h1 style=\"font-size:150%; color: red; text-align: center;\">{responseText}</h1>\r\n    " +
                        "</div>\r\n\r\n\r\n    " +
                        "<script>\r\n\r\n        " +
                        "function openPreviousPage() {\r\n            " +
                        "window.location.href = window.history.go(-1);\r\n        }\r\n\r\n        " +
                        "setTimeout(openPreviousPage, 3000);\r\n\r\n\r\n    " +
                        "</script>\r\n" +
                    "</body>\r\n" +
                "</html>\r\n";

        await response.WriteAsync(responseHTML);
    }
    else
    {
        response.ContentType = "text/plain; charset=utf-8";
        await response.WriteAsync("Unexpected error with code: " + response.StatusCode);
    }

    //if (response.StatusCode == (int)HttpStatusCode.Redirect)
    //{
    //    response.StatusCode = 403;
    //}
});


app.UseStaticFiles();
app.UseDefaultFiles();


app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();


app.MapGet("/authorize/login", async (context) =>
{
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.StatusCode = 401;
    await context.Response.SendFileAsync("wwwroot/html/LoginPage.html");
});


app.Run();
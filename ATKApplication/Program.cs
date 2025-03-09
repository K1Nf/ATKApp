using ATKApplication.DataBase;
using ATKApplication.Services;
using System.Security.Cryptography.X509Certificates;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddDbContext<DataBaseContext>();


builder.Services.AddScoped<EventService>();
builder.Services.AddScoped<PlanService>();
builder.Services.AddScoped<ReportService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();
//app.MapGet("/", () => "Hello World!");

app.Run();

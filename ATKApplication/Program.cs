using ATKApplication.DataBase;
using ATKApplication.Services;
using System.Security.Cryptography.X509Certificates;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    // ��������� ������� ��� ������ � SSL
    serverOptions.ConfigureHttpsDefaults(httpsOptions =>
    {
        httpsOptions.ServerCertificate = new X509Certificate2("path-to-your-certificate.pfx", "your-cert-password");
    });
});


builder.Services.AddControllers();

//builder.Services.AddDbContext<DataBaseContext>();


//builder.Services.AddScoped<EventService>();
//builder.Services.AddScoped<PlanService>();
//builder.Services.AddScoped<ReportService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
// ���������� CORS
app.UseCors("AllowAll");
app.MapControllers();
//app.MapGet("/", () => "Hello World!");

app.Run();

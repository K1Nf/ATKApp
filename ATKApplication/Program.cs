using ATKApplication.DataBase;
using ATKApplication.Services;
using Newtonsoft.Json.Converters;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });


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

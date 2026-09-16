using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.Services;
using SriKumaranHospital.API.Services.Interfaces;
using SriKumaranHospital.API.Exceptions;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//configuring our Hospital DBcontext here by using the sql server
builder.Services.AddDbContext<HospitalDbcontext>
(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//configuring the department service
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
//configuring the doctor service
builder.Services.AddScoped<IDoctorService, DoctorService>();
//adding the service for Service that have in Hospital
builder.Services.AddScoped<IServiceService, ServiceService>();
//service for swagger end point api testing
builder.Services.AddSwaggerGen();
//adding the controller
builder.Services.AddControllers();
//configuring the cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow reactfrontend", policy =>
    {
        policy
        .WithOrigins("http://localhost:5173")
           .AllowAnyHeader()
           .AllowAnyMethod();
    });
});
//configuring the global exception handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.MapControllers();
app.UseExceptionHandler();
app.UseCors("AllowFrontend");
app.Run();


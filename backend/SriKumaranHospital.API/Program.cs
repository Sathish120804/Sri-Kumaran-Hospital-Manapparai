using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.Services;
using SriKumaranHospital.API.Services.Interfaces;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//configuring our Hospital DBcontext here by using the sql server
builder.Services.AddDbContext<HospitalDbcontext>
(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
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
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.MapControllers();
app.Run();


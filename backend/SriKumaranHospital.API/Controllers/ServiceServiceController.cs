using Microsoft.AspNetCore.Mvc;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _serviceService;

    public ServicesController(IServiceService serviceService)
    {
        _serviceService = serviceService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ServiceDto>>> GetAll()
    {
        var services = await _serviceService.GetAllAsync();

        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceDto>> GetById(int id)
    {
        var service = await _serviceService.GetByIdAsync(id);

        if (service == null)
        {
            return NotFound();
        }

        return Ok(service);
    }
}
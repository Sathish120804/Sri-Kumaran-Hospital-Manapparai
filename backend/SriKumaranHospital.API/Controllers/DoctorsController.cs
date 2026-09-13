using Microsoft.AspNetCore.Mvc;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Models;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly IDoctorService _doctorService;

    public DoctorsController(IDoctorService doctorService)
    {
        _doctorService = doctorService;
    }

    [HttpGet]
    public async Task<ActionResult<List<DoctorDto>>> GetAll()
    {
        var doctors = await _doctorService.GetAllAsync();

        return Ok(doctors);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DoctorDto>> GetById(int id)
    {
        var doctor = await _doctorService.GetByIdAsync(id);

        if (doctor == null)
        {
            return NotFound();
        }

        return Ok(doctor);
    }
}
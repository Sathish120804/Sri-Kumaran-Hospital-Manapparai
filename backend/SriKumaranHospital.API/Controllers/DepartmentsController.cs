using Microsoft.AspNetCore.Mvc;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentsController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    [HttpGet]
    public async Task<ActionResult<List<DepartmentDto>>> GetAll()
    {
        var departments = await _departmentService.GetAllAsync();//saying the service to do the work

        return Ok(departments);
    }
    // ActionResult: Unga specific method (GetAll()) client-ku response-a anupum pothu
    //  enna 'data type' and 'status' anupanum-nu confirm pannuthu.

    [HttpGet("{id}")]//rread
    public async Task<ActionResult<DepartmentDto>> GetById(int id)
    {
        var department = await _departmentService.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return Ok(department);
    }
    
}
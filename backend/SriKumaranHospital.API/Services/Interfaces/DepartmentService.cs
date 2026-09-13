using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Services;

public class DepartmentService : IDepartmentService
{
    private readonly HospitalDbcontext _context;

    public DepartmentService(HospitalDbcontext context)
    {
        _context = context;
    }

    public async Task<List<DepartmentDto>> GetAllAsync()
    {
        //entity-dto mapping..
        return await _context.Departments
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                NameEnglish = d.NameEnglish,
                NameTamil = d.NameTamil,
                DescriptionEnglish = d.DescriptionEnglish,
                DescriptionTamil = d.DescriptionTamil
            })
            .ToListAsync();
    }//epolam namakku getall method solli kekurangalo
    //nama avangaluku dto la irukura data va send pannuovm

    public async Task<DepartmentDto?> GetByIdAsync(int id)
    {
        return await _context.Departments
            .Where(d => d.Id == id)
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                NameEnglish = d.NameEnglish,
                NameTamil = d.NameTamil,
                DescriptionEnglish = d.DescriptionEnglish,
                DescriptionTamil = d.DescriptionTamil
            })
            .FirstOrDefaultAsync();
    }
}
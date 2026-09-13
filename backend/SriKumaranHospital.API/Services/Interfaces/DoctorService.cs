using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Models;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Services;

public class DoctorService : IDoctorService
{
    private readonly HospitalDbcontext _context;

    public DoctorService(HospitalDbcontext context)
    {
        _context = context;
    }

    public async Task<List<DoctorDto>> GetAllAsync()
    {
        return await _context.Doctors
            .Include(d => d.Department)
            .Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Qualification = d.Qualification,
                Specialization = d.Specialization,
                Experience = d.Experience,
                DepartmentName = d.Department.NameEnglish
            })
            .ToListAsync();
    }

    public async Task<DoctorDto?> GetByIdAsync(int id)
    {
        return await _context.Doctors
            .Include(d => d.Department)
            .Where(d => d.Id == id)
            .Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Qualification = d.Qualification,
                Specialization = d.Specialization,
                Experience = d.Experience,
                DepartmentName = d.Department.NameEnglish
            })
            .FirstOrDefaultAsync();
    }
}
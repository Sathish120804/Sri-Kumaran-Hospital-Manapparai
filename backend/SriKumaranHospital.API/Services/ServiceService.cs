using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Services.Interfaces;

namespace SriKumaranHospital.API.Services;

public class ServiceService : IServiceService
{
    private readonly HospitalDbcontext _context;

    public ServiceService(HospitalDbcontext context)
    {
        _context = context;
    }

    public async Task<List<ServiceDto>> GetAllAsync()
    {
        return await _context.Services
            .Select(s => new ServiceDto
            {
                Id = s.Id,
                NameEnglish = s.NameEnglish,
                NameTamil = s.NameTamil,
                DescriptionEnglish = s.DescriptionEnglish,
                DescriptionTamil = s.DescriptionTamil
            })
            .ToListAsync();
    }

    public async Task<ServiceDto?> GetByIdAsync(int id)
    {
        return await _context.Services
            .Where(s => s.Id == id)
            .Select(s => new ServiceDto
            {
                Id = s.Id,
                NameEnglish = s.NameEnglish,
                NameTamil = s.NameTamil,
                DescriptionEnglish = s.DescriptionEnglish,
                DescriptionTamil = s.DescriptionTamil
            })
            .FirstOrDefaultAsync();
    }
}
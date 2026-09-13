using SriKumaranHospital.API.DTOs;
using SriKumaranHospital.API.Models;

namespace SriKumaranHospital.API.Services.Interfaces;

public interface IDoctorService
{
    Task<List<DoctorDto>> GetAllAsync();

    Task<DoctorDto?> GetByIdAsync(int id);
}
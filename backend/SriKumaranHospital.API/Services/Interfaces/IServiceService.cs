using SriKumaranHospital.API.DTOs;

namespace SriKumaranHospital.API.Services.Interfaces;

public interface IServiceService
{
    Task<List<ServiceDto>> GetAllAsync();

    Task<ServiceDto?> GetByIdAsync(int id);
}
using SriKumaranHospital.API.DTOs;

namespace SriKumaranHospital.API.Services.Interfaces;

public interface IDepartmentService
{
    Task<List<DepartmentDto>> GetAllAsync();

    Task<DepartmentDto?> GetByIdAsync(int id);
}

//"Any class that implements IDepartmentService must provide a method called GetAllAsync() 
// which returns a list of DepartmentDto."
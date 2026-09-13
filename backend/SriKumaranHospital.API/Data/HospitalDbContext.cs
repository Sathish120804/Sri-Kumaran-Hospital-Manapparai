using Microsoft.EntityFrameworkCore;

using SriKumaranHospital.API.Models;
namespace SriKumaranHospital.API.Data;
public class HospitalDbcontext : DbContext
{
    public HospitalDbcontext(DbContextOptions<HospitalDbcontext> options) : base(options)
    {
        
    }

     public DbSet<Department> Departments { get; set; }

    public DbSet<Doctor> Doctors { get; set; }

    public DbSet<Service> Services { get; set; }
}
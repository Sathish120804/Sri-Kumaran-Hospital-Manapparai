using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.Models;
using SriKumaranHospital.API.Services;

namespace SriKumaranHospital.API.Tests;

public class DoctorServiceTests
{
    private HospitalDbcontext CreateContext()
    {
        var options = new DbContextOptionsBuilder<HospitalDbcontext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new HospitalDbcontext(options);
    }

    // Test 1
    [Fact]
    public async Task GetAllAsync_ReturnsAllDoctors()
    {
        // Arrange
        await using var context = CreateContext();

        var department = new Department
        {
            Id = 1,
            NameEnglish = "Orthopaedics",
            NameTamil = "எலும்பு, மூட்டு"
        };

        context.Departments.Add(department);

        context.Doctors.AddRange(
            new Doctor
            {
                Id = 1,
                Name = "Dr. Test Doctor 1",
                Qualification = "MBBS",
                Specialization = "Orthopaedics",
                Experience = 10,
                DepartmentId = 1
            },
            new Doctor
            {
                Id = 2,
                Name = "Dr. Test Doctor 2",
                Qualification = "MBBS, MS",
                Specialization = "Orthopaedics",
                Experience = 8,
                DepartmentId = 1
            }
        );

        await context.SaveChangesAsync();

        var service = new DoctorService(context);

        // Act
        var result = await service.GetAllAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
    }

    // Test 2
    [Fact]
    public async Task GetByIdAsync_ReturnsCorrectDoctor()
    {
        // Arrange
        await using var context = CreateContext();

        var department = new Department
        {
            Id = 1,
            NameEnglish = "Cardiology",
            NameTamil = "இருதய சிகிச்சை"
        };

        context.Departments.Add(department);

        context.Doctors.Add(
            new Doctor
            {
                Id = 1,
                Name = "Dr. Test Doctor",
                Qualification = "MBBS, MD",
                Specialization = "Cardiology",
                Experience = 12,
                DepartmentId = 1
            }
        );

        await context.SaveChangesAsync();

        var service = new DoctorService(context);

        // Act
        var result = await service.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Dr. Test Doctor", result.Name);
        Assert.Equal("Cardiology", result.DepartmentName);
    }

    // Test 3
    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenDoctorDoesNotExist()
    {
        // Arrange
        await using var context = CreateContext();

        var service = new DoctorService(context);

        // Act
        var result = await service.GetByIdAsync(999);

        // Assert
        Assert.Null(result);
    }
}
using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.Models;
using SriKumaranHospital.API.Services;

namespace SriKumaranHospital.API.Tests;

public class DepartmentServiceTests
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
    public async Task GetAllAsync_ReturnsAllDepartments()
    {
        // Arrange
        await using var context = CreateContext();

        context.Departments.AddRange(
            new Department
            {
                Id = 1,
                NameEnglish = "Orthopaedics",
                NameTamil = "எலும்பு, மூட்டு"
            },
            new Department
            {
                Id = 2,
                NameEnglish = "Cardiology",
                NameTamil = "இருதய சிகிச்சை"
            }
        );

        await context.SaveChangesAsync();

        var service = new DepartmentService(context);

        // Act
        var result = await service.GetAllAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
    }

    // Test 2
    [Fact]
    public async Task GetByIdAsync_ReturnsCorrectDepartment()
    {
        // Arrange
        await using var context = CreateContext();

        context.Departments.Add(
            new Department
            {
                Id = 1,
                NameEnglish = "Orthopaedics",
                NameTamil = "எலும்பு, மூட்டு"
            }
        );

        await context.SaveChangesAsync();

        var service = new DepartmentService(context);

        // Act
        var result = await service.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Orthopaedics", result.NameEnglish);
    }

    // Test 3
    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenDepartmentDoesNotExist()
    {
        // Arrange
        await using var context = CreateContext();

        var service = new DepartmentService(context);

        // Act
        var result = await service.GetByIdAsync(999);

        // Assert
        Assert.Null(result);
    }
}
using Microsoft.EntityFrameworkCore;
using SriKumaranHospital.API.Data;
using SriKumaranHospital.API.Models;
using SriKumaranHospital.API.Services;

namespace SriKumaranHospital.API.Tests;

public class ServiceServiceTests
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
    public async Task GetAllAsync_ReturnsAllServices()
    {
        // Arrange
        await using var context = CreateContext();

        context.Services.AddRange(
            new Service
            {
                Id = 1,
                NameEnglish = "Spiral CT Scan",
                NameTamil = "ஸ்பைரல் CT ஸ்கேன்",
                DescriptionEnglish = "Advanced CT imaging service.",
                DescriptionTamil = "அதிநவீன CT படப்பரிசோதனை சேவை."
            },
            new Service
            {
                Id = 2,
                NameEnglish = "ECG",
                NameTamil = "ECG",
                DescriptionEnglish = "Heart electrical activity test.",
                DescriptionTamil = "இருதய மின்சார செயல்பாட்டை பரிசோதிக்கும் சேவை."
            }
        );

        await context.SaveChangesAsync();

        var service = new ServiceService(context);

        // Act
        var result = await service.GetAllAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
    }

    // Test 2
    [Fact]
    public async Task GetByIdAsync_ReturnsCorrectService()
    {
        // Arrange
        await using var context = CreateContext();

        context.Services.Add(
            new Service
            {
                Id = 1,
                NameEnglish = "Robotic Surgery",
                NameTamil = "ரோபோடிக் அறுவை சிகிச்சை",
                DescriptionEnglish = "Advanced robotic-assisted surgical procedures.",
                DescriptionTamil = "ரோபோடிக் உதவி தொழில்நுட்பத்தைப் பயன்படுத்தும் அதிநவீன அறுவை சிகிச்சை."
            }
        );

        await context.SaveChangesAsync();

        var service = new ServiceService(context);

        // Act
        var result = await service.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Robotic Surgery", result.NameEnglish);
        Assert.Equal(
            "ரோபோடிக் அறுவை சிகிச்சை",
            result.NameTamil);
    }

    // Test 3
    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenServiceDoesNotExist()
    {
        // Arrange
        await using var context = CreateContext();

        var service = new ServiceService(context);

        // Act
        var result = await service.GetByIdAsync(999);

        // Assert
        Assert.Null(result);
    }
}
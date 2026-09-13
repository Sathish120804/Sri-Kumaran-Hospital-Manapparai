namespace SriKumaranHospital.API.DTOs;

public class ServiceDto
{
    public int Id { get; set; }

    public string NameEnglish { get; set; } = string.Empty;

    public string NameTamil { get; set; } = string.Empty;

    public string DescriptionEnglish { get; set; } = string.Empty;

    public string DescriptionTamil { get; set; } = string.Empty;
}
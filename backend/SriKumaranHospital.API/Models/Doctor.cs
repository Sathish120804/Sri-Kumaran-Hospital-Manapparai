namespace SriKumaranHospital.API.Models;

public class Doctor
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Qualification { get; set; } = string.Empty;

    public string Specialization { get; set; } = string.Empty;

    public int Experience { get; set; }

    public int DepartmentId { get; set; }
}
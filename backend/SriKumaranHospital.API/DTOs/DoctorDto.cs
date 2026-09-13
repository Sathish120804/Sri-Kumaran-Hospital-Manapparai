namespace SriKumaranHospital.API.DTOs;

public class DoctorDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Qualification { get; set; } = string.Empty;

    public string Specialization { get; set; } = string.Empty;

    public int Experience { get; set; }

    public string DepartmentName { get; set; } = string.Empty;
}

// Model:
// public int DepartmentId { get; set; }
// DTO:
// public string DepartmentName { get; set; } = string.Empty;
// Database-ku DepartmentId useful.
// Frontend-ku "Cardiology" madhiri actual department name useful.
// So DTO is designed according to what the API consumer needs, not necessarily exactly according to the database table.

// Doctor
// Name: Dr. Kumar
// DepartmentId: 1
//        ↓
// Department
// Id: 1
// Name: Cardiology
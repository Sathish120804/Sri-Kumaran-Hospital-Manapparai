namespace SriKumaranHospital.API.DTOs;

public class DepartmentDto
{
    public int Id { get; set; }

    public string NameEnglish { get; set; } = string.Empty;

    public string NameTamil { get; set; } = string.Empty;

    public string DescriptionEnglish { get; set; } = string.Empty;

    public string DescriptionTamil { get; set; } = string.Empty;
}
//yean nama dto poromna adhu dhaan nama api contract but model vandhu data entity dhaan 
//so idhu vandhu important
// Entity
//    │
//    │ contains application/database data
//    ▼
// DTO
//    │
//    │ exposes only required data
//    ▼
// React
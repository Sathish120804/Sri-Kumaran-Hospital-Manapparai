using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SriKumaranHospital.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBilingualDepartmentFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Departments",
                newName: "NameTamil");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Departments",
                newName: "NameEnglish");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEnglish",
                table: "Departments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionTamil",
                table: "Departments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEnglish",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "DescriptionTamil",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "NameTamil",
                table: "Departments",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "NameEnglish",
                table: "Departments",
                newName: "Description");
        }
    }
}

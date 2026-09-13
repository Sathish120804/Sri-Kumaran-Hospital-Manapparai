using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SriKumaranHospital.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBilingualServiceFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Services",
                newName: "NameTamil");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Services",
                newName: "NameEnglish");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEnglish",
                table: "Services",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionTamil",
                table: "Services",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEnglish",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "DescriptionTamil",
                table: "Services");

            migrationBuilder.RenameColumn(
                name: "NameTamil",
                table: "Services",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "NameEnglish",
                table: "Services",
                newName: "Description");
        }
    }
}

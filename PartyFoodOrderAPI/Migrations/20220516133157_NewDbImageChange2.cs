using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PartyFoodOrderAPI.Migrations
{
    public partial class NewDbImageChange2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageHeader",
                table: "Product",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageHeader",
                table: "Product");
        }
    }
}

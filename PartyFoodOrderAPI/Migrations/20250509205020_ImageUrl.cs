using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PartyFoodOrderAPI.Migrations
{
    public partial class ImageUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Product");

            migrationBuilder.RenameColumn(
                name: "ImageHeader",
                table: "Product",
                newName: "ImageUrl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Product",
                newName: "ImageHeader");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Product",
                type: "BLOB",
                nullable: true);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PartyFoodOrderAPI.Migrations
{
    public partial class NewDbImageChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Product");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Product",
                type: "BLOB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Product",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}

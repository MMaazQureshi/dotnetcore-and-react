using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class seedingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "value" },
                values: new object[] { 1, "Value 101" });

            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "value" },
                values: new object[] { 2, "Value 102" });

            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "value" },
                values: new object[] { 3, "Value 103" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}

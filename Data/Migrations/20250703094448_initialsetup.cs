using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ACWebApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class initialsetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Idea",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdeaTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdeaDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdeaPros = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdeaCons = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Idea", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Idea");
        }
    }
}

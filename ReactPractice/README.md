React assignment

webapp where user can order products.

Uses a database to store orders, products and users.
If user doesn't have a database running, the site will display an error.

In startup.cs (line 53) it's possible to edit the settings for the PostgreSQL database.

To start the project:
-dotnet run
    optional:
    -(dotnet restore)
    -(yarn install)

Initialize database:
-(dotnet ef database drop)
-dotnet ef database update

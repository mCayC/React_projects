React assignment

This is a react.js webapp using the MVC structure and TypeScript. Made during school course with help from mentor.
In this webapp you can simulate ordering products.
It uses a PostgreSQL database to store users, products and orders.
<br />
![react_prac](https://user-images.githubusercontent.com/79923428/129359255-cf937a55-d8c0-4199-8992-b5796f28621e.PNG)

Site can display error if no database is found.
In startup.cs (line 53) it's possible to edit the settings for the PostgreSQL database to connect to own database.

To start the project:
-> dotnet run.
<br />
If that doesn't work try this:
-> (dotnet restore).
-> (yarn install).
<br />
Initialize database:
-> (dotnet ef database drop).
-> dotnet ef database update.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SimpleModelsAndRelations.Models;



namespace SimpleModelsAndRelations.Controllers
{
  public partial class HomeController : Controller
  {
    private readonly SimpleModelsAndRelationsContext _context;
    private readonly ProjectNameOptions _projectNameOptions;
    

    public HomeController(SimpleModelsAndRelationsContext context, IOptions<ProjectNameOptions> projectNameOptions )
    {
      _context = context;
      _projectNameOptions = projectNameOptions.Value;
    }


    [HttpGet("{*slug}")]
    public IActionResult Index(string slug)
    {
      
      ViewData["Page"] = "Home/Index";
      ViewData["ProjectName"] = _projectNameOptions.Value;
      return View();
    }  
  }
}

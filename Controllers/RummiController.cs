using Microsoft.AspNetCore.Mvc;

namespace ACWebApp.Controllers
{
    public class RummiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

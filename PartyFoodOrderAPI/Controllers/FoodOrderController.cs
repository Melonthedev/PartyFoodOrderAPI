using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PartyFoodOrderAPI.Controllers
{
    public class FoodOrderController : Controller
    {
        // GET: FoodOrderController
        public ActionResult Index()
        {
            return View();
        }

        // GET: FoodOrderController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FoodOrderController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FoodOrderController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FoodOrderController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FoodOrderController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FoodOrderController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FoodOrderController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}

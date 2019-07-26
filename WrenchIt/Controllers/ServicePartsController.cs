using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WrenchIt.Data;
using WrenchIt.Models;

namespace WrenchIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicePartsController : ControllerBase
    {
        readonly ServicePartRepository _repository;

        public ServicePartsController(ServicePartRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddServicePart(ServicePart servicePart)
        {
            var newServicePart = _repository.AddServicePart(servicePart.ServiceId, servicePart.PartId, servicePart.InstallDate);

            return Created($"api/serviceparts/{newServicePart.Id}", newServicePart);
        }

        //[HttpGet]
        //public ActionResult GetAllMachineParts()
        //{
        //    var machineParts = _repository.GetAllMachineParts();

        //    return Ok(machineParts);
        //}

        //[HttpGet("{id}")]
        //public ActionResult GetSingleMachinePart(int id)
        //{
        //    var machinePart = _repository.GetSingleMachinePart(id);

        //    return Ok(machinePart);
        //}

        //[HttpPut("{id}")]
        //public ActionResult UpdateMachinePart(int id, MachinePart machinePartToUpdate)
        //{
        //    if (id != machinePartToUpdate.Id)
        //    {
        //        return BadRequest();
        //    }
        //    var machinePart = _repository.UpdateMachinePart(id, machinePartToUpdate);

        //    return Ok(machinePart);
        //}

        //[HttpDelete("{id}")]
        //public ActionResult DeleteMachinePart(int id)
        //{
        //    _repository.DeleteMachinePart(id);

        //    return Ok("MachinePart Deleted");
        //}
    }
}
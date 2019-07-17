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
    public class MachinePartsController : ControllerBase
    {
        readonly MachinePartRepository _repository;

        public MachinePartsController(MachinePartRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddMachinePart(MachinePart machinePart)
        {
            var newMachinePart = _repository.AddMachinePart(machinePart.MachineId, machinePart.PartId);

            return Created($"api/machineparts/{newMachinePart.Id}", newMachinePart);
        }

        [HttpGet]
        public ActionResult GetAllMachineParts()
        {
            var machineParts = _repository.GetAllMachineParts();

            return Ok(machineParts);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleMachinePart(int id)
        {
            var machinePart = _repository.GetSingleMachinePart(id);

            return Ok(machinePart);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateMachinePart(int id, MachinePart machinePartToUpdate)
        {
            if (id != machinePartToUpdate.Id)
            {
                return BadRequest();
            }
            var machinePart = _repository.UpdateMachinePart(id, machinePartToUpdate);

            return Ok(machinePart);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteMachinePart(int id)
        {
            _repository.DeleteMachinePart(id);

            return Ok("MachinePart Deleted");
        }
    }
}
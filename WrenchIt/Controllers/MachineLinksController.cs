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
    public class MachineLinksController : ControllerBase
    {
        readonly MachineLinkRepository _repository;

        public MachineLinksController(MachineLinkRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult AddMachineLink(MachineLink machineLink)
        {
            var newMachineLink = _repository.AddMachineLink(machineLink.MachineId, machineLink.LinkId);

            return Created($"api/machinelinks/{newMachineLink.Id}", newMachineLink);
        }

        [HttpGet]
        public ActionResult GetAllMachineLinks()
        {
            var machineLinks = _repository.GetAllMachineLinks();

            return Ok(machineLinks);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleMachineLink(int id)
        {
            var machineLink = _repository.GetSingleMachineLink(id);

            return Ok(machineLink);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateMachineLink(int id, MachineLink machineLinkToUpdate)
        {
            if (id != machineLinkToUpdate.Id)
            {
                return BadRequest();
            }
            var machineLink = _repository.UpdateMachineLink(id, machineLinkToUpdate);

            return Ok(machineLink);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteMachineLink(int id)
        {
            _repository.DeleteMachineLink(id);

            return Ok("MachineLink Deleted");
        }
    }
}
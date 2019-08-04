using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WrenchIt.Data;
using WrenchIt.Models;
using WrenchIt.Validators;

namespace WrenchIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        readonly MachineRepository _repository;
        readonly CreateMachineRequestValidator _validator;

        public MachinesController (MachineRepository repository)
        {
            _repository = repository;
            _validator = new CreateMachineRequestValidator();
        }

        [HttpPost]
        public ActionResult AddMachine(CreateMachineRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Please Enter All Fields." });
            }

            var newMachine = _repository.AddMachine(createRequest.OwnerId, createRequest.Year, createRequest.Make, createRequest.Model,
                createRequest.Trim, createRequest.TypeId, createRequest.OilType, createRequest.OilQuantity,
                createRequest.TireSize, createRequest.TirePressure, createRequest.ServiceInterval);

            return Created($"api/machines/{newMachine.Id}", newMachine);
        }

        [HttpGet]
        public ActionResult GetAllMachines()
        {
            var machines = _repository.GetAllMachines();

            return Ok(machines);
        }

        [HttpGet("{id}")]
        public ActionResult GetAllMachinesById(int id)
        {
            var machines = _repository.GetAllMachinesByUserId(id);

            return Ok(machines);
        }

        [HttpGet("yore/{id}")]
        public ActionResult GetAllInactiveMachinesById(int id)
        {
            var machines = _repository.GetAllInactiveMachinesByUserId(id);

            return Ok(machines);
        }

        [HttpGet("machine/{id}")]
        public ActionResult GetSingleMachine(int id)
        {
            var machine = _repository.GetSingleMachine(id);

            return Ok(machine);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateMachine(int id, Machine machineToUpdate)
        {
            if (id != machineToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedMachine = _repository.UpdateMachine(id, machineToUpdate);
            return Ok(updatedMachine);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteMachine(int id)
        {
            _repository.DeleteMachine(id);

            return Ok("IsActive status set to false.");
        }
    }
}
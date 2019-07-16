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

            var newMachine = _repository.AddMachine(createRequest.Year, createRequest.Make, createRequest.Model,
                createRequest.Trim, createRequest.TypeId, createRequest.OilType, createRequest.OilQuantity,
                createRequest.TireSize, createRequest.TirePressure, createRequest.ServiceInterval);

            return Created($"api/machines/{newMachine.Id}", newMachine);
        }
    }
}
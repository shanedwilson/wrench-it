using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WrenchIt.Data;

namespace WrenchIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineTypesController : ControllerBase
    {
        readonly MachineTypeRepository _machineTypeRepository;

        public MachineTypesController(MachineTypeRepository machineTypeRepository)
        {
            _machineTypeRepository = machineTypeRepository;
        }

        [HttpGet]
        public ActionResult GetAllMachineTypes()
        {
            var machineTypeNames = _machineTypeRepository.GetAllMachineTypes();

            return Ok(machineTypeNames);
        }
    }
}
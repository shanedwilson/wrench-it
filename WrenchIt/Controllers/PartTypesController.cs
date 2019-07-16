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
    public class PartTypesController : ControllerBase
    {
        readonly PartTypeRepository _partTypeRepository;

        public PartTypesController(PartTypeRepository partTypeRepository)
        {
            _partTypeRepository = partTypeRepository;
        }

        [HttpGet]
        public ActionResult GetAllPartTypes()
        {
            var partTypeNames = _partTypeRepository.GetAllPartTypes();

            return Ok(partTypeNames);
        }
    }
}
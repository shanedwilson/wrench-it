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
    public class PartsController : ControllerBase
    {
        readonly PartRepository _repository;
        readonly CreatePartRequestValidator _validator;

        public PartsController(PartRepository repository)
        {
            _repository = repository;
            _validator = new CreatePartRequestValidator();
        }

        [HttpPost]
        public ActionResult AddPart(CreatePartRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Please Enter All Fields." });
            }

            var newPart = _repository.AddPart(createRequest.TypeId, createRequest.Brand, createRequest.PartNumber);

            return Created($"api/parts/{newPart.Id}", newPart);
        }

        [HttpGet]
        public ActionResult GetAllParts()
        {
            var parts = _repository.GetAllParts();

            return Ok(parts);
        }

        [HttpGet("{id}")]
        public ActionResult GetSinglePart(int id)
        {
            var part = _repository.GetSinglePart(id);

            return Ok(part);
        }

        [HttpPut("{id}")]
        public ActionResult UpdatePart(int id, Part partToUpdate)
        {
            if(id != partToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedMachine = _repository.UpdatePart(id, partToUpdate);
            return Ok(partToUpdate);
        }
    }
}
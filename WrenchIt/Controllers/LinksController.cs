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
    public class LinksController : ControllerBase
    {
        readonly LinkRepository _repository;
        readonly CreateLinkRequestValidator _validator;

        public LinksController(LinkRepository repository)
        {
            _repository = repository;
            _validator = new CreateLinkRequestValidator();
        }

        [HttpPost]
        public ActionResult AddLink(CreateLinkRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Please Enter All Fields" });
            }

            var newLink = _repository.AddLink(createRequest.Name, createRequest.YouTubeId, createRequest.MachineId);

            return Created($"api/links/{ newLink.Id }", newLink);
        }

        [HttpGet]
        public ActionResult GetAllLinks()
        {
            var links = _repository.GetAllLinks();

            return Ok(links);
        }

        [HttpGet("machine/{id}")]
        public ActionResult GetAllLinksByMachineId(int id)
        {
            var links = _repository.GetAllLinksByMachineId(id);

            return Ok(links);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleLink(int id)
        {
            var link = _repository.GetSingleLink(id);

            return Ok(link);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateLink(int id, Link linkToUpdate)
        {
            if (id != linkToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedLink = _repository.UpdateLink(id, linkToUpdate);
            return Ok(updatedLink);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteLink(int id)
        {
            _repository.DeleteLink(id);

            return Ok("Is Active Status Set To False.");
        }
    }
}
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

        public LinksController (LinkRepository repository)
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

            var newLink = _repository.AddLink(createRequest.Name, createRequest.Url);

            return Created($"api/links/{ newLink.Id }", newLink);
        }
    }
}
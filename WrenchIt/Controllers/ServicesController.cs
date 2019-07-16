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
    public class ServicesController : ControllerBase
    {
        readonly ServiceRepository _repository;
        readonly CreateServiceRequestValidator _validator;

        public ServicesController(ServiceRepository repository)
        {
            _repository = repository;
            _validator = new CreateServiceRequestValidator();
        }

        [HttpPost]
        public ActionResult AddService(CreateServiceRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Please Enter All Fields." });
            }

            var newService = _repository.AddService(createRequest.UserMachineId, createRequest.Mileage,
                createRequest.ServiceDate, createRequest.Notes);

            return Created($"api/services/{newService.Id}", newService);
        }
    }
}
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

            var newService = _repository.AddService(createRequest.MachineId, createRequest.Oil, 
                                createRequest.OilQuantity, createRequest.TirePressure, createRequest.Mileage,
                createRequest.TireRotation, createRequest.ServiceDate, createRequest.Notes);

            return Created($"api/services/{newService.Id}",newService);
        }

        [HttpGet]
        public ActionResult GetAllServices()
        {
            var services = _repository.GetAllServices();

            return Ok(services);
        }

        [HttpGet("machine/{id}")]
        public ActionResult GetAllServicesByMachineId(int id)
        {
            var machineServices = _repository.GetAllServicesByMachineId(id);

            return Ok(machineServices);
        }

        [HttpGet("owner/{id}")]
        public ActionResult GetAllServicesByOwnerId(string id)
        {
            var ownerServices = _repository.GetAllServicesByOwnerId(id);

            return Ok(ownerServices);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleService(int id)
        {
            var service = _repository.GetSingleService(id);

            return Ok(service);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateService(int id, Service serviceToUpdate)
        {
            if (id != serviceToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedService = _repository.UpdateService(id, serviceToUpdate);

            return Ok(updatedService);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteService(int id)
        {
            _repository.DeleteService(id);

            return Ok("Service Record Deleted");
        }
    }
}
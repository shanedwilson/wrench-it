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
    public class UsersController : ControllerBase
    {
        readonly UserRepository _repository;
        readonly CreateUserRequestValidator _validator;

        public UsersController(UserRepository repository)
        {
            _repository = repository;
            _validator = new CreateUserRequestValidator();
        }

        [HttpPost]
        public ActionResult AddUser(CreateUserRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "please enter all fields" });
            }

            var newUser = _repository.AddUser(createRequest.FirebaseId, createRequest.Email,
                createRequest.Name, createRequest.Street, createRequest.City, createRequest.State,
                createRequest.PostalCode, createRequest.PhoneNumber);

            return Created($"api/users/{newUser.Id}", newUser);
        }
    }
}
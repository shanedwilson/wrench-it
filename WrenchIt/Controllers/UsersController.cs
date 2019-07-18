using Microsoft.AspNetCore.Mvc;
using WrenchIt.Data;
using WrenchIt.Models;
using WrenchIt.Validators;

namespace WrenchIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : SecureControllerBase
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
                return BadRequest(new { error = "Please Enter All Fields." });
            }

            var newUser = _repository.AddUser(createRequest.FirebaseId, createRequest.Email,
                createRequest.Name, createRequest.Street, createRequest.City, createRequest.State,
                createRequest.PostalCode, createRequest.PhoneNumber);

            return Created($"api/users/{newUser.Id}", newUser);
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUser(string id)
        {
            var user = _repository.GetSingleUser(id);

            return Ok(user);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(int id, User userToUpdate)
        {
            if (id != userToUpdate.Id)
            {
                return BadRequest();
            }
            var updatedUser = _repository.UpdateUser(id, userToUpdate);
            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUser(int id)
        {
            _repository.DeleteUser(id);

            return Ok("IsActive status set to false.");
        }
    }
}
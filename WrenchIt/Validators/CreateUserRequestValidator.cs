using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Validators
{
    public class CreateUserRequestValidator
    {
        public bool Validate(CreateUserRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Email)
                || string.IsNullOrEmpty(requestToValidate.FirebaseId)
                || string.IsNullOrEmpty(requestToValidate.Name)
                || string.IsNullOrEmpty(requestToValidate.Street)
                || string.IsNullOrEmpty(requestToValidate.City)
                || string.IsNullOrEmpty(requestToValidate.State)
                || string.IsNullOrEmpty(requestToValidate.PostalCode)
                || string.IsNullOrEmpty(requestToValidate.PhoneNumber)
                );
        }
    }
}

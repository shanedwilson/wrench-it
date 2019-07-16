using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Validators
{
    public class CreateLinkRequestValidator
    {
        public bool Validate(CreateLinkRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Name)
                    || string.IsNullOrEmpty(requestToValidate.Url));
        }
    }
}

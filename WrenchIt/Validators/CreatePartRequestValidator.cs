using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Validators
{
    public class CreatePartRequestValidator
    {
        public bool Validate(CreatePartRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Brand)
                   || string.IsNullOrEmpty(requestToValidate.TypeId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.PartNumber)
                   );
        }
    }
}

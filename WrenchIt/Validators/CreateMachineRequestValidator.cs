using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Validators
{
    public class CreateMachineRequestValidator
    {
        public bool Validate(CreateMachineRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Make)
                   || string.IsNullOrEmpty(requestToValidate.Year.ToString())
                   || string.IsNullOrEmpty(requestToValidate.Model)
                   || string.IsNullOrEmpty(requestToValidate.Trim)
                   || string.IsNullOrEmpty(requestToValidate.TypeId.ToString())
                   || string.IsNullOrEmpty(requestToValidate.OilType)
                   || string.IsNullOrEmpty(requestToValidate.OilQuantity.ToString())
                   || string.IsNullOrEmpty(requestToValidate.TireSize)
                   || string.IsNullOrEmpty(requestToValidate.ServiceInterval.ToString())
                   || string.IsNullOrEmpty(requestToValidate.OwnerId.ToString())
                   );
        }
    }
}

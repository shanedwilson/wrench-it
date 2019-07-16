using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Validators
{
    public class CreateServiceRequestValidator
    {
        public bool Validate(CreateServiceRequest createRequest)
        {
            return (string.IsNullOrEmpty(createRequest.UserMachineId.ToString())
                || string.IsNullOrEmpty(createRequest.Mileage.ToString())
                || string.IsNullOrEmpty(createRequest.ServiceDate.ToString())
                || string.IsNullOrEmpty(createRequest.Notes)
                );
        }
    }
}

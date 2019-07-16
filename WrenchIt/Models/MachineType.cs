using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class MachineType
    {
        public int Id { get; set; }
        public TypeName Type { get; set; }
    }

    public enum TypeName
    {
        Automobile,
        Truck,
        Motorcycle,
        ATV,
        LawnMachine,
    }
}

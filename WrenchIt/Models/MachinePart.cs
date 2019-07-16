using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class MachinePart
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public int PartId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class MachineLink
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public int LinkId { get; set; }
    }
}

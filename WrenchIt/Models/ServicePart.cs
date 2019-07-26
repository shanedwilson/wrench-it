using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class ServicePart
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int PartId { get; set; }
        public DateTime InstallDate { get; set; }
    }
}

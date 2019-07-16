using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class Service
    {
        public int Id { get; set; }
        public int UserMachineId { get; set; }
        public int Mileage { get; set; }
        public DateTime ServiceDate { get; set; }
        public string Notes { get; set; }
    }
}

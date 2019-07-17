using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class Machine    
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public int Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Trim { get; set; }
        public int TypeId { get; set; }
        public string OilType { get; set; }
        public int OilQuantity { get; set; }
        public string TireSize { get; set; }
        public int TirePressure { get; set; }
        public int ServiceInterval { get; set; }
        public bool IsActive { get; set; }
    }


}

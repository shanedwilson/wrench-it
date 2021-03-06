﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class CreateServiceRequest
    {
        public int MachineId { get; set; }
        public string Oil { get; set; }
        public int OilQuantity { get; set; }
        public int TirePressure { get; set; }
        public int Mileage { get; set; }
        public bool TireRotation { get; set; }
        public DateTime ServiceDate { get; set; }
        public string Notes { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class CreatePartRequest
    {
        public int TypeId { get; set; }
        public string Brand { get; set; }
        public string PartNumber { get; set; }
    }
}

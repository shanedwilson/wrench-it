﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class CreateLinkRequest
    {
        public String Name { get; set; }
        public String YouTubeId { get; set; }
        public int MachineId { get; set; }
    }
}

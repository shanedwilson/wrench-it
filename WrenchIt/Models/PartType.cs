using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WrenchIt.Models
{
    public class PartType
    {
        public int Id { get; set; }
        public PartTypeName Type { get; set; }
    }

    public enum PartTypeName
    {
        oil,
        oilFilter,
        sparkPlug,
        airFilter,
        cabinFilter,
        brakePads,
        battery,
        belt,
        wiperLeft,
        wiperRight,
        headlightBulb,
        turnLightBulb,
        tailLightBulb,
    }
}

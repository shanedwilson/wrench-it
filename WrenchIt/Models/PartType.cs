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
        Oil,
        OilFilter,
        SparkPlug,
        AirFilter,
        CabinFilter,
        BrakePads,
        Battery,
        Belt,
        WiperLeft,
        WiperRight,
        HeadlightBulb,
        TurnLightBulb,
        TailLightBulb,
    }
}

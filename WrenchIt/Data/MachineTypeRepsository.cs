using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;

namespace WrenchIt.Data
{
    public class MachineTypeRepository
    {
        readonly string _connectionString;

        public MachineTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public List<string> GetAllMachineTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machineTypes = db.Query<MachineType>("Select * from MachineTypes").ToList();
                var typeNames = new List<string>();

                for (int i = 0; i < machineTypes.Count; i++)
                {
                    var typeName = Enum.GetName(typeof(TypeName), i);
                    typeNames.Add(typeName);
                };

                return typeNames;

            }
        }
    }
}

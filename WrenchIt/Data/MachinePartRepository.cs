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
    public class MachinePartRepository
    {
        readonly string _connectionString;

        public MachinePartRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public MachinePart AddMachinePart(int machineId, int partId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newMachinePart = db.QueryFirstOrDefault<MachinePart>(@"
                    insert into machineparts (machineId, partId)
                    output inserted.*
                    values (@machineId, @partId)",
                    new { machineId, partId });

                if(newMachinePart != null)
                {
                    return newMachinePart;
                }

                throw new Exception("No MachinePart Created.");
            }
        }
    }
}

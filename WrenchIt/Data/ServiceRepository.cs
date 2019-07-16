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
    public class ServiceRepository
    {
        readonly string _connectionString;

        public ServiceRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Service AddService(int userMachineId, int mileage, DateTime serviceDate, string notes)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newService = db.QueryFirstOrDefault<Service>(@"
                    insert into services (userMachineId, mileage, serviceDate, notes)
                    output inserted.*
                    values (@userMachineId, @mileage, @serviceDate, @notes)",
                    new { userMachineId, mileage, serviceDate, notes }
                    );
                if(newService != null)
                {
                    return newService;
                }
                throw new Exception("No Service Created.");
            }

        }
    }
}

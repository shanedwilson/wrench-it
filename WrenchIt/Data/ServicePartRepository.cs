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
    public class ServicePartRepository
    {
        readonly string _connectionString;

        public ServicePartRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public ServicePart AddServicePart(int serviceId, int partId, DateTime installDate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newServicePart = db.QueryFirstOrDefault<ServicePart>(@"
                    insert into serviceparts (serviceId, partId, installDate)
                    output inserted.*
                    values (@serviceId, @partId, @installDate)",
                    new { serviceId, partId, installDate });

                if (newServicePart != null)
                {
                    return newServicePart;
                }

                throw new Exception("No ServicePart Created.");
            }
        }

        public IEnumerable<ServicePart> GetAllServicePartsByServiceId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var serviceParts = db.Query<ServicePart>(@"
                    select *
                    from serviceparts sp
                    where sp.serviceId = @id",
                    new { Id = id}).ToList();

                return serviceParts;
            }
        }

        public void DeleteServicePart(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete 
                            from serviceParts
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if (rowsAffected != 1)
                    throw new Exception("Could Not Delete Service Part.");
            }
        }
    }
}

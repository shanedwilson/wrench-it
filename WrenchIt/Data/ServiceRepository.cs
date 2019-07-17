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
                    insert into services (machineId, mileage, serviceDate, notes)
                    output inserted.*
                    values (@machineId, @mileage, @serviceDate, @notes)",
                    new { userMachineId, mileage, serviceDate, notes }
                    );
                if(newService != null)
                {
                    return newService;
                }
                throw new Exception("No Service Created.");
            }

        }

        public IEnumerable<Service> GetAllServices()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var services = db.Query<Service>(@"
                    select *
                    from services
                    ").ToList();

                return services;
            }

        }

        public Service GetSingleService(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var service = db.QueryFirstOrDefault<Service>(@"
                    select *
                    from services
                    where id = @id",
                    new { id });

                return service;
            }

        }

        public Service UpdateService(int id, Service serviceToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                    update services
                    set machineid = @machineid,
                        mileage = @mileage,
                        servicedate = @servicedate,
                        notes = notes
                    where id = @id";

                var rowsAffected = db.Execute(sql, serviceToUpdate);

                if(rowsAffected >= 1)
                {
                    return serviceToUpdate;
                }
                throw new Exception("Could Not Update Service.");
            }
        }

        public void DeleteUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete
                            from services
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if (rowsAffected != 1)
                    throw new Exception("Could Not Delete Service.");
            }
        }
    }
}

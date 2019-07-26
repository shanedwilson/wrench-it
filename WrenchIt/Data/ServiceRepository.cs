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

        public Service AddService(int machineId, string oil, int oilQuantity, int tirePressure, int mileage,
                                    bool tireRotation, DateTime serviceDate, string notes)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newService = db.QueryFirstOrDefault<Service>(@"
                    insert into services (machineId, oil, oilQuantity, tirePressure, mileage, tireRotation, serviceDate, notes)
                    output inserted.*
                    values (@machineId, @oil, @oilQuantity, @tirePressure, @mileage, @tireRotation, @serviceDate, @notes)",
                    new { machineId, oil, oilQuantity, tirePressure, mileage, tireRotation, serviceDate, notes }
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

        public IEnumerable<Service> GetAllServicesByMachineId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machineServices = db.Query<Service>(@"
                    select *
                    from services
                    where services.machineId = @id
                    and isactive = 1",
                    new { Id = id }).ToList();

                return machineServices;
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
                        oil = @oil,
                        oilQuantity = @oilQuantity,
                        tirePressure = @tirePressure,
                        mileage = @mileage,
                        tireRotation = @tireRotation,
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

        public void DeleteService(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update services
                            set isactive = 0
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if (rowsAffected != 1)
                    throw new Exception("Could Not Delete Service.");
            }
        }
    }
}

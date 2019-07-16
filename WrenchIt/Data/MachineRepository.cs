using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WrenchIt.Models;
using Dapper;

namespace WrenchIt.Data
{
    public class MachineRepository
    {
        readonly string _connectionString;

        public MachineRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Machine AddMachine(int year, string make, string model, string trim, int typeId, string oilType,
                        int oilQuantity, string tireSize, int tirePressure, int serviceInterval)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newMachine = db.QueryFirstOrDefault<Machine>(@"
                    insert into machines (year, make, model, trim, typeId, oilType, oilQuantity, tireSize,
                    tirePressure, serviceInterval)
                    output inserted.*
                    values(@year, @make, @model, @trim, @typeId, @oilType, @oilQuantity, @tireSize,
                    @tirePressure, @serviceInterval)",
                    new
                    {
                        year,
                        make,
                        model,
                        trim,
                        typeId,
                        oilType,
                        oilQuantity,
                        tireSize,
                        tirePressure,
                        serviceInterval
                    }
                    );

                if (newMachine != null)
                {
                    return newMachine;
                }
                throw new Exception("No machine created");
            }
        }

        public IEnumerable<Machine> GetAllMachines()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machines = db.Query<Machine>(@"
                    select *
                    from machines
                    where isActive = 1
                    ").ToList();

                return machines;
            }
        }

        public Machine GetSingleMachine(string id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machine = db.QueryFirstOrDefault<Machine>(@"
                    select *
                    from machines
                    where id = @id",
                   new { id });

                return machine;
            }
        }

        public Machine UpdateMachine(int id, Machine machineToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update Machines
                            Set year = @year,
                                make = @make,
                                model = @model,
                                trim = @trim,
                                typeId = @typeId,
                                oilType = @oilType,
                                oilQuantity = @oilQuantity,
                                tireSize = @tireSize,
                                tirePressure = @tirePressure,
                                serviceInterval = @serviceInterval,
                                isActive = 1
                            Where id = @id";

                var rowsAffected = db.Execute(sql, machineToUpdate);

                if (rowsAffected >= 1)
                    return machineToUpdate;
            }

            throw new Exception("Could not update machine");
        }

        public void DeleteMachine(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"Update Machines
                            Set isActive = 0
                            Where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if (rowsAffected != 1)
                    throw new Exception("Could not delete machine");
            }
        }
    }
}

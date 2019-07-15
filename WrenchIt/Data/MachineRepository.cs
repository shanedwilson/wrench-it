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

        public Machine AddMachine(int year, string make, string model, string trim, int type, string oilType,
                        int oilQuantity, string tireSize, int tirePressure, int serviceInterval)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newMachine = db.QueryFirstOrDefault<Machine>(@"
                    insert into machines (year, make, model, trim, type, oilType, oilQuantity, tireSize,
                    tirePressure, serviceInterval)
                    output inserted.*
                    values(@year, @make, @model, @trim, @type, @oilType, @oilQuantity, @tireSize,
                    @tirePressure, @serviceInterval)",
                    new
                    {
                        year,
                        make,
                        model,
                        trim,
                        type,
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
    }
}

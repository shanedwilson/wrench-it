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

        //public IEnumerable<MachinePart> GetAllMachineParts()
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var machineParts = db.Query<MachinePart>(@"
        //            select *
        //            from machineparts").ToList();

        //        return machineParts;
        //    }
        //}

        //public MachinePart GetSingleMachinePart(int id)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var machinePart = db.QueryFirstOrDefault<MachinePart>(@"
        //            select *
        //            from machineParts
        //            where id = @id",
        //            new { id });

        //        return machinePart;
        //    }
        //}

        //public MachinePart UpdateMachinePart(int id, MachinePart machinePartToUpdate)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"
        //            update machineParts
        //            set machineId = @machineId,
        //                partId = @partId,
        //                isactive = 1
        //            where id = @id";

        //        var rowsAffected = db.Execute(sql, machinePartToUpdate);

        //        if (rowsAffected >= 1)
        //        {
        //            return machinePartToUpdate;
        //        }
        //        throw new Exception("Could Not Update Machine Part");
        //    }
        //}

        //public void DeleteMachinePart(int id)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"update machineParts
        //                    set isactive = 0
        //                    where id = @id";

        //        var rowsAffected = db.Execute(sql, new { Id = id });

        //        if (rowsAffected != 1)
        //            throw new Exception("Could Not Delete MachinePart.");
        //    }
        //}
    }
}

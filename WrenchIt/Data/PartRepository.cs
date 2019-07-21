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
    public class PartRepository
    {
        readonly string _connectionString;

        public PartRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Part AddPart(int typeId, string brand, string partNumber)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newPart = db.QueryFirstOrDefault<Part>(@"
                    insert into parts (typeId, brand, partNumber)
                    output inserted.*
                    values(@typeId, @brand, @partNumber)",
                    new { typeId, brand, partNumber }
                    );

                if (newPart != null)
                {
                    return newPart;
                }
                throw new Exception("No part created");
            }
        }

        public IEnumerable<Part> GetAllParts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var parts = db.Query<Part>(@"
                    select *
                    from parts
                    where isactive = 1"
                    ).ToList();

                return parts;
            }
        }

        public IEnumerable<Part> GetAllPartsByMachineId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machineParts = db.Query<Part>(@"
                    select *
                    from parts p
                    join machineParts mp
                    on p.id = mp.partId
                    where mp.machineId = @id
                    and mp.isactive = 1",
                    new { id }).ToList();

                return machineParts;
            }

        }

        public Part GetSinglePart(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var part = db.QueryFirstOrDefault<Part>(@"
                    select *
                    from parts
                    where id = @id",
                    new { id });

                return part;
            }
        }

        public Part UpdatePart(int id, Part partToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update parts
                            set typeid = @typeid,
                                brand = @brand,
                                partNumber = @partNumber,
                                isActive = 1
                            where id = @id";

                var rowsAffected = db.Execute(sql, partToUpdate);

                if (rowsAffected >= 1)
                    return partToUpdate;
            }

            throw new Exception("Could Not Update Part.");
        }

        public void DeletePart(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update parts
                            set isactive = 0
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if(rowsAffected != 1)
                    throw new Exception("Could Not Delete Part.");
            }

        }
    }
}

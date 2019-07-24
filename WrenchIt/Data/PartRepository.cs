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
        readonly PartTypeRepository _partTypeRepository;


        public PartRepository(IOptions<DbConfiguration> dbConfig, PartTypeRepository partTypeRepository)
        {
            _connectionString = dbConfig.Value.ConnectionString;
            _partTypeRepository = partTypeRepository;
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

        public IEnumerable<Object> GetAllParts()
        {
            var partTypeNames = _partTypeRepository.GetAllPartTypes();

            using (var db = new SqlConnection(_connectionString))
            {
                var parts = db.Query<Part>(@"
                    select *
                    from parts
                    where isactive = 1"
                    ).ToList();

                for (int i = 0; i < partTypeNames.Count; i++)
                {
                        parts.ForEach(p =>
                        {
                            if (p.TypeId == i + 1)
                            {
                                p.NameType = partTypeNames[i];
                            };
                        });
                };

                return parts;
            }
        }

        public IEnumerable<Part> GetAllPartsByMachineId(int id)
        {
            var partTypeNames = _partTypeRepository.GetAllPartTypes();

            using (var db = new SqlConnection(_connectionString))
            {
                var machineParts = db.Query<Part>(@"
                    select p.*, mp.id as machinePartId
                    from machineParts mp
                    join parts p
                    on p.id = mp.partId
                    where mp.machineId = @id
                    and mp.isactive = 1",
                    new { Id = id }).ToList();

                for (int i = 0; i < partTypeNames.Count; i++)
                {
                    machineParts.ForEach(p =>
                    {
                        if (p.TypeId == i + 1)
                        {
                            p.NameType = partTypeNames[i];
                        };
                    });
                };

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
                    new { Id =id });

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

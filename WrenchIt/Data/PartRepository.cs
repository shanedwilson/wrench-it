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
    }
}

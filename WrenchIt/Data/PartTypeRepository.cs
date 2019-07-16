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
    public class PartTypeRepository
    {
        readonly string _connectionString;

        public PartTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public List<string> GetAllPartTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var partTypes = db.Query<PartType>("Select * from PartTypes").ToList();
                var typeNames = new List<string>();

                for (int i = 0; i < partTypes.Count; i++)
                {
                    var typeName = Enum.GetName(typeof(PartTypeName), i);
                    typeNames.Add(typeName);
                };

                return typeNames;

            }
        }
    }
}

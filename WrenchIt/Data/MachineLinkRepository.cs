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
    public class MachineLinkRepository
    {
        readonly string _connectionString;

        public MachineLinkRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public MachineLink AddMachineLink(int machineId, int linkId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newMachineLink = db.QueryFirstOrDefault<MachineLink>(@"
                    insert into machinelinks (machineId, linkId)
                    output inserted.*
                    values (@machineId, @linkId)",
                    new { machineId, linkId });

                if (newMachineLink != null)
                {
                    return newMachineLink;
                }

                throw new Exception("No MachineLink Created.");
            }
        }

        public IEnumerable<MachineLink> GetAllMachineLinks()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machineLinks = db.Query<MachineLink>(@"
                    select *
                    from machinelinks").ToList();

                return machineLinks;
            }
        }

        public MachineLink GetSingleMachineLink(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var machineLink = db.QueryFirstOrDefault<MachineLink>(@"
                    select *
                    from machineLinks
                    where id = @id",
                    new { id });

                return machineLink;
            }
        }

        public MachineLink UpdateMachineLink(int id, MachineLink machineLinkToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                    update machineLinks
                    set machineId = @machineId,
                        linkId = @linkId
                    where id = @id";

                var rowsAffected = db.Execute(sql, machineLinkToUpdate);

                if (rowsAffected >= 1)
                {
                    return machineLinkToUpdate;
                }
                throw new Exception("Could Not Update Machine Link");
            }
        }

        public void DeleteMachineLink(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete
                            from machineLinks
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { id });

                if (rowsAffected != 1)
                    throw new Exception("Could Not Delete MachineLink.");
            }
        }
    }
}

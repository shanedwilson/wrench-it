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
    public class LinkRepository
    {
        readonly String _connectionString;

        public LinkRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Link AddLink(string name, string youtubeid, int machineId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newLink = db.QueryFirstOrDefault<Link>(@"
                    insert into links (name, youtubeid, machineId)
                    output inserted.*
                    values(@name, @youtubeid, @machineId)",
                    new { name, youtubeid, machineId });

                if(newLink != null)
                {
                    return newLink;
                }
                throw new Exception("No Link Created");
            }

        }

        public IEnumerable<Link> GetAllLinks()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var links = db.Query<Link>(@"
                    select *
                    from links"
                    ).ToList();

                return links;
            }
        }

        public IEnumerable<Link> GetAllLinksByMachineId(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var links = db.Query<Link>(@"
                    select l.*
                    from links l
                    where l.machineid = @id",
                    new { id }).ToList();

                return links;
            }
        }

        public Link GetSingleLink(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var link = db.QueryFirstOrDefault<Link>(@"
                    select *
                    from links
                    where id = @id",
                    new { id });

                return link;
            }
        }

        public Link UpdateLink(int id, Link linkToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"
                    update links
                    set name = @name,
                        url = @url,
                        isactive = 1
                    where id = @id";

                var rowsAffected = db.Execute(sql, linkToUpdate);

                if (rowsAffected >= 1)
                {
                    return linkToUpdate;
                }
                throw new Exception("Could Not Update Link.");
            }

        }

        public void DeleteLink(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete from links
                            where id = @id";

                var rowsAffected = db.Execute(sql, new { Id = id });

                if(rowsAffected != 1)
                {
                    throw new Exception("Could Not Delete Link.");
                }
            }
        }
    }
}

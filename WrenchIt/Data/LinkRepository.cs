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

        public Link AddLink(string name, string url)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newLink = db.QueryFirstOrDefault<Link>(@"
                    insert into links (name, url)
                    output inserted.*
                    values(@name, @url)",
                    new { name, url });

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
    }
}

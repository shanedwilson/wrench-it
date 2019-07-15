using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using WrenchIt.Models;
using Dapper;

namespace WrenchIt.Data
{
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public User AddUser(string firebaseId, string email, string name, string street,
                    string city, string state, string postalCode, string phoneNumber)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(@"
                    insert into users (firebaseId, email, name, street, 
                    city, state, postalCode, phoneNumber)
                    output inserted.*
                    values(@firebaseId, @email, @name, @street, @city, @state,
                    @postalCode, @phoneNumber)",
                    new { firebaseId, email, name, street, city, state, postalCode, phoneNumber }
                    );
                
                if(newUser != null)
                {
                    return newUser;
                }
                throw new Exception("No user created");
            }

        }

        public IEnumerable<User> GetAllUsers()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"
                    select *
                    from users
                    where isActive = 1
                    ").ToList();

                return users;
            }
        }

        public User GetSingleUser(string id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var user = db.QueryFirstOrDefault<User>(@"
                    select *
                    from users
                    where firebaseid = @id",
                   new { id });

                return user;
            }
        }
    }
}

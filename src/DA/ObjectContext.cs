using Aether.DA.Repositories.ObjectConfig;
using Aether.DA.Repositories.ObjectValue;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA
{
    class ObjectContext
    {
        public const string CONNECTION_STRING_NAME = "ObjectContext";
        public const string DATABASE_NAME = "Aether";
        public const string CONFIG_COLLECTION_NAME = "objectConfig";
        public const string VALUE_COLLECTION_NAME = "objectValues";

        // This is ok... Normally, they would be put into
        // an IoC container.
        private static readonly IMongoClient _client;
        private static readonly IMongoDatabase _database;

        static ObjectContext()
        {
            var connectionString = ConfigurationManager.ConnectionStrings[CONNECTION_STRING_NAME].ConnectionString;
            _client = new MongoClient(connectionString);
            _database = _client.GetDatabase(DATABASE_NAME);
        }

        public IMongoClient Client
        {
            get { return _client; }
        }

        public IMongoCollection<ObjectConfig> ObjectConfigs
        {
            get { return _database.GetCollection<ObjectConfig>(CONFIG_COLLECTION_NAME); }
        }

        public IMongoCollection<ObjectValue> ObjectValues
        {
            get { return _database.GetCollection<ObjectValue>(VALUE_COLLECTION_NAME); }
        }
    }
}

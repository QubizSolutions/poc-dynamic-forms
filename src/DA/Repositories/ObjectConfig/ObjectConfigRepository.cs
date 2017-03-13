using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Aether.DA.Repositories.ObjectConfig
{
    public class ObjectConfigRepository
    {
        ObjectContext objectContext;

        public ObjectConfigRepository()
        {
            
        }

        public async Task<ObjectConfigContract[]> ListAll()
        {
            objectContext = new ObjectContext();
            List<ObjectConfig> configs = await objectContext.ObjectConfigs.Find(x => true).ToListAsync();

            return configs.Select(x => x.ToContract()).ToArray();
        }

        public async Task Create(ObjectConfigContract objectConfig)
        {
            objectContext = new ObjectContext();
            await objectContext.ObjectConfigs.InsertOneAsync(objectConfig.ToMongoEntity());
        }

        public async Task Update(ObjectConfigContract objectConfig)
        {
            objectContext = new ObjectContext();
            await objectContext.ObjectConfigs.ReplaceOneAsync(Builders<ObjectConfig>.Filter.Eq("Id", objectConfig.Id), objectConfig.ToMongoEntity());
        }

        public async Task<ObjectConfigContract> GetById(Guid id)
        {
            objectContext = new ObjectContext();
            ObjectConfig configs = await objectContext.ObjectConfigs.Find(x => x.Id == id).SingleOrDefaultAsync();

            return configs.ToContract();
        }

    }
}

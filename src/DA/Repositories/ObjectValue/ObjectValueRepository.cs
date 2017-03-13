using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectValue
{
    public class ObjectValueRepository
    {
        ObjectContext objectContext;

        public async Task<ObjectValueContract[]> ListAll()
        {
            objectContext = new ObjectContext();
            List<ObjectValue> values = await objectContext.ObjectValues.Find(x => true).ToListAsync();

            return values.Select(x => x.ToContract()).ToArray();
        }

        public async Task Create(ObjectValueContract objectValue)
        {
            objectContext = new ObjectContext();
            await objectContext.ObjectValues.InsertOneAsync(objectValue.ToMongoEntity());
        }

        public async Task Update(ObjectValueContract objectValue)
        {
            objectContext = new ObjectContext();

            ObjectValue mongoEntity = objectValue.ToMongoEntity();
            await objectContext.ObjectValues.ReplaceOneAsync(Builders<ObjectValue>.Filter.Eq("Id", objectValue.Id), mongoEntity);
        }

        public async Task<ObjectValueContract> GetById(Guid id)
        {
            objectContext = new ObjectContext();
            ObjectValue configs = await objectContext.ObjectValues.Find(x => x.Id == id).SingleOrDefaultAsync();

            return configs.ToContract();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectValue
{
    public static class ObjectValueMapper
    {
        public static ObjectValueContract ToContract(this ObjectValue objectValue)
        {
            return new ObjectValueContract
            {
                Id = objectValue.Id,
                ObjectConfigId = objectValue.ObjectConfigId,
                Properties = objectValue.Properties
            };
        }
        
        public static ObjectValue ToMongoEntity(this ObjectValueContract objectValue)
        {
            ObjectValue ret = new ObjectValue
            {
                Id = objectValue.Id,
                ObjectConfigId = objectValue.ObjectConfigId,
            };

            Dictionary<Guid, object> properties = new Dictionary<Guid, object>();

            foreach(var item in objectValue.Properties)
            {
                if (item.Value is Newtonsoft.Json.Linq.JArray)
                {
                    properties[item.Key] = ((Newtonsoft.Json.Linq.JArray)item.Value).ToObject<string[]>();
                }
                properties[item.Key] = item.Value;
            }
            ret.Properties = properties;

            return ret;
        }
    }
}

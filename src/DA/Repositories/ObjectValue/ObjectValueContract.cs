using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectValue
{
    public class ObjectValueContract
    {
        public Guid Id { get; set; }

        public Guid ObjectConfigId { get; set; }

        public Dictionary<Guid, object> Properties { get; set; }
    }
}

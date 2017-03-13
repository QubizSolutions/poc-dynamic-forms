using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectConfig
{
    public class ObjectConfigContract
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public ObjectPropertyContract[] Properties { get; set; }
    }

    public class ObjectPropertyContract
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public PropertyType Type { get; set; }

        public bool IsRequired { get; set; }

        public string IsRequiredErrorMessage { get; set; }

        public string Regex { get; set; }

        public string RegexErrorMessage { get; set; }

        public object MinValue { get; set; }

        public string MinValueErrorMessage { get; set; }

        public object MaxValue { get; set; }

        public string MaxValueErrorMessage { get; set; }

        public bool IsMultiSelect { get; set; }

        public Dictionary<Guid, string> ListItems { get; set; }
    }
}

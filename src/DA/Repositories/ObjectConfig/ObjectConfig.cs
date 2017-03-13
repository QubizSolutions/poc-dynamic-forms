using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectConfig
{
    public class ObjectConfig
    {
        [BsonId]
        public Guid Id { get; set; }
        
        public string Title { get; set; }

        public ObjectProperty[] Properties { get; set; }
    }

    public class ObjectProperty
    {
        [BsonId]
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

        [BsonDictionaryOptions(DictionaryRepresentation.ArrayOfDocuments)]
        public Dictionary<Guid, string> ListItems { get; set; }
    }

    public enum PropertyType
    {
        None,
        Number,
        String,
        Boolean,
        Date,
        Object,
        List
    }
}

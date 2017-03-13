using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aether.DA.Repositories.ObjectConfig
{
    public static class ObjectConfigMapper
    {
        public static ObjectConfigContract ToContract(this ObjectConfig objectConfig)
        {
            return new ObjectConfigContract
            {
                Id = objectConfig.Id,
                Title = objectConfig.Title,
                Properties = objectConfig.Properties.Select(x=> x.ToContract()).ToArray()
            };
        }

        public static ObjectPropertyContract ToContract(this ObjectProperty objectProperty)
        {
            return new ObjectPropertyContract
            {
                Id = objectProperty.Id,
                Name = objectProperty.Name,
                Type = objectProperty.Type,
                IsRequired = objectProperty.IsRequired,
                IsRequiredErrorMessage = objectProperty.IsRequiredErrorMessage,
                MinValue = objectProperty.MinValue,
                MinValueErrorMessage = objectProperty.MinValueErrorMessage,
                MaxValue = objectProperty.MaxValue,
                MaxValueErrorMessage = objectProperty.MaxValueErrorMessage,
                Regex = objectProperty.Regex,
                RegexErrorMessage = objectProperty.RegexErrorMessage,
                IsMultiSelect = objectProperty.IsMultiSelect,
                ListItems = objectProperty.ListItems
                
            };
        }

        public static ObjectConfig ToMongoEntity(this ObjectConfigContract objectConfig)
        {
            return new ObjectConfig
            {
                Id = objectConfig.Id,
                Title = objectConfig.Title,
                Properties = objectConfig.Properties.Select(x => x.ToMongoEntity()).ToArray()
            };
        }

        public static ObjectProperty ToMongoEntity(this ObjectPropertyContract objectProperty)
        {
            return new ObjectProperty
            {
                Id = objectProperty.Id,
                Name = objectProperty.Name,
                Type = objectProperty.Type,
                IsRequired = objectProperty.IsRequired,
                IsRequiredErrorMessage = objectProperty.IsRequiredErrorMessage,
                MinValue = objectProperty.MinValue,
                MinValueErrorMessage = objectProperty.MinValueErrorMessage,
                MaxValue = objectProperty.MaxValue,
                MaxValueErrorMessage = objectProperty.MaxValueErrorMessage,
                Regex = objectProperty.Regex,
                RegexErrorMessage = objectProperty.RegexErrorMessage,
                IsMultiSelect = objectProperty.IsMultiSelect,
                ListItems = objectProperty.ListItems
            };
        }

    }
}

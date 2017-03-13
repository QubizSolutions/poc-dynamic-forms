using Aether.DA.Repositories.ObjectConfig;
using Aether.DA.Repositories.ObjectValue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.Api
{
    public class ConfigController : ApiController
    {
        private ObjectConfigRepository objectConfigRepository;
        private ObjectValueRepository objectValueRepository;

        public ConfigController()
        {
            objectConfigRepository = new ObjectConfigRepository();
            objectValueRepository = new ObjectValueRepository();
        }
        
        [HttpGet]
        public async Task<IHttpActionResult> GetObjectConfigs()
        {
            ObjectConfigContract[] objectConfigs = await objectConfigRepository.ListAll();

            return Ok(objectConfigs);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetObjectConfigById(Guid id)
        {
            ObjectConfigContract objectConfig = await objectConfigRepository.GetById(id);

            return Ok(objectConfig);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateObjectConfig(ObjectConfigContract objectConfig)
        {
            await objectConfigRepository.Update(objectConfig);
            return Ok();
        }

        [HttpPut]
        public async Task<IHttpActionResult> CreateObjectConfig(ObjectConfigContract objectConfig)
        {
            await objectConfigRepository.Create(objectConfig);
            return Ok();
        }
        
        [HttpGet]
        public async Task<IHttpActionResult> GetObjectValues()
        {
            ObjectValueContract[] objectValues = await objectValueRepository.ListAll();

            return Ok(objectValues);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetObjectValueById(Guid id)
        {
            ObjectValueContract objectValue = await objectValueRepository.GetById(id);

            return Ok(objectValue);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateObjectValue(ObjectValueContract objectValue)
        {
            await objectValueRepository.Update(objectValue);
            return Ok();
        }

        [HttpPut]
        public async Task<IHttpActionResult> CreateObjectValue(ObjectValueContract objectValue)
        {
            await objectValueRepository.Create(objectValue);
            return Ok();
        }
    }
}
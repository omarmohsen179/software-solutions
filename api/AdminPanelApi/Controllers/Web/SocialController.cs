using AdminPanelApi.Core;
using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public SocialController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var objlist = this.unitOfWork.SocialManager.Get(filter:e=>e.Type!="Video");
            if (objlist != null)
            {
                string JSONresult = JsonConvert.SerializeObject(objlist);
                return Ok(JSONresult);
            }
            else
            {
                return Ok();
            }
        }
        [HttpGet("admin")]
        public IActionResult Getadmin()
        {
            try
            {

                var objlist = this.unitOfWork.SocialManager.Get(filter: e => e.Type != "Video");
                string JSONresult = JsonConvert.SerializeObject(objlist);
                return Ok(
                     JSONresult
                );
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }


        }
        [HttpGet("admin/Video")]
        public IActionResult Getadmixn()
        {
            try
            {

                var objlist = this.unitOfWork.SocialManager.Get(filter: e => e.Type == "Video");
                string JSONresult = JsonConvert.SerializeObject(objlist);
                return Ok(
                     JSONresult
                );
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }


        }
        [HttpPost]
        public IActionResult Insert([FromBody] Social Temp)
        {

            try
            {

                var Object = this.unitOfWork.SocialManager.Add(Temp);
                if (Object.Id > 0)
                {

                    string JSONresult = JsonConvert.SerializeObject(Object);
                    return Ok(JSONresult);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPut]

        public IActionResult Update([FromBody] List<Social> Temp)
        {
            try
            {


                var Object = this.unitOfWork.SocialManager.UpdateList(Temp);
                if (Object)
                {
                    string JSONresult = JsonConvert.SerializeObject(Temp);
                    return Ok(JSONresult);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {

            try
            {
                var Object = this.unitOfWork.SocialManager.RemoveById(id);
                if (Object)
                {
                    return Ok(200);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
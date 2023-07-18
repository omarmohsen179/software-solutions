
using AutoMapper;
using AdminPanelApi.Core;
using AdminPanelApi.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using AdminPanelApi.Models.Exist;
using System.Linq;
using System.Collections.Generic;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public static ImageUploder _imageUploder;

        public ServiceController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment enviroment)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            _imageUploder = new ImageUploder(enviroment);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var Members = this.unitOfWork.ServiceManager.Get(e => e.Active == true, orderBy: e => e.OrderBy(ex => ex.Rank));
            if (Members != null)
            {
                string JSONresult = JsonConvert.SerializeObject(Members);
                return Ok(JSONresult);
            }
            else
            {
                return Ok();
            }
        }
        [HttpGet("admin")]
        public IActionResult Getuser()
        {
            var objlist = this.unitOfWork.ServiceManager.Get(orderBy: e => e.OrderBy(ex => ex.Rank));
            if (objlist != null)
            {
                string JSONresult = JsonConvert.SerializeObject(objlist);
                return Ok(JSONresult);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("Order")]
        public IActionResult updateAll([FromBody] List<Service> Temp)
        {

            try
            {
                var Object = this.unitOfWork.ServiceManager.UpdateList(Temp.Select((e, idx) =>
                {
                    // e.Id = 0;
                    e.Rank = idx;
                    return e;
                }
                ).ToList());
                return Ok(Object);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPost]
        public IActionResult InsertMember([FromForm] IFormFile Image, [FromForm] Service Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploder.UplodeFile(Image);
                    if (result.isOk)
                    {
                        Temp.ImagePath = result.value;
                    }
                    else
                    {
                        return BadRequest(result);
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }



            try
            {

                var member = this.unitOfWork.ServiceManager.Add(Temp);
                if (member.Id > 0)
                {
                    string JSONresult = JsonConvert.SerializeObject(member);
                    return Ok(JSONresult);
                }
                else
                {
                    return BadRequest(member);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPut]

        public IActionResult UpdateMember([FromForm] IFormFile Image, [FromForm] Service Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploder.UplodeFile(Image);
                    if (result.isOk)
                    {
                        Temp.ImagePath = result.value;
                    }
                    else
                    {
                        return BadRequest("Image not valid");
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            try
            {
                var obj = this.unitOfWork.ServiceManager.Update(Temp);
                if (obj)
                {
                    string JSONresult = JsonConvert.SerializeObject(Temp);
                    return Ok(JSONresult);
                }
                else
                {
                    return BadRequest(obj);
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
                var obj = this.unitOfWork.ServiceManager.RemoveById(id);
                if (obj)
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

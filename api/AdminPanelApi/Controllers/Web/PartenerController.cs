
using AutoMapper;
using AdminPanelApi.Core;
using AdminPanelApi.Helpers;
using AdminPanelApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartenerController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public static ImageUploder _imageUploder;

        public PartenerController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment enviroment)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            _imageUploder = new ImageUploder(enviroment);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var Members = this.unitOfWork.PartenerManager.Get(e => e.Active == true, orderBy: e => e.OrderBy(ex => ex.Rank));
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
            var objlist = this.unitOfWork.PartenerManager.Get(orderBy: e => e.OrderBy(ex => ex.Rank));
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
        public IActionResult updateAll([FromBody] List<Partener> Temp)
        {

            try
            {
                var Object = this.unitOfWork.PartenerManager.UpdateList(Temp.Select((e, idx) =>
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
        public IActionResult InsertMember([FromForm] IFormFile Image, [FromForm] Partener Temp)
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

                var member = this.unitOfWork.PartenerManager.Add(Temp);
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

        public IActionResult UpdateMember([FromForm] IFormFile Image, [FromForm] Partener Temp)
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
                var obj = this.unitOfWork.PartenerManager.Update(Temp);
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
                var obj = this.unitOfWork.PartenerManager.RemoveById(id);
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

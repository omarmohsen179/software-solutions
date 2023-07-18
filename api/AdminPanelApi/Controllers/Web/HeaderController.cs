
using AutoMapper;
using AdminPanelApi.Core;
using AdminPanelApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using SU_API.Services.ImageUploader;
using System.Linq;
using System.Collections.Generic;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeaderController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        //   public static ImageUploder _imageUploder;
        private readonly IimageUploader _imageUploader;
        public HeaderController(IimageUploader imageUploader, IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment enviroment)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            _imageUploader = imageUploader;
        }
        [HttpGet]
        public IActionResult GetMembers()
        {
            var Members = this.unitOfWork.HeaderManager.Get(e => e.Active == true);
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
            var objlist = this.unitOfWork.HeaderManager.Get();
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
        public IActionResult updateAll([FromBody] List<Header> Temp)
        {

            try
            {
                var Object = this.unitOfWork.HeaderManager.UpdateList(Temp.Select((e, idx) =>
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
        public IActionResult InsertMember([FromForm] IFormFile Image, [FromForm] Header Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploader.UploadFormFile(Image);
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
                var member = this.unitOfWork.HeaderManager.Add(Temp);

                /*
                if (Temp.TempPostId != null && Temp.TempPostId != 0)
                {
                    member.HeaderPost = this.unitOfWork.HeaderPostManager.Add(new HeaderPost { HeaderId = member.Id, PostId = Temp.TempPostId });
                }*/
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

        public IActionResult UpdateMember([FromForm] IFormFile Image, [FromForm] Header Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploader.UploadFormFile(Image);
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
                var member = this.unitOfWork.HeaderManager.Update(Temp);
                /*

                                if (Temp.TempPostId != null && Temp.TempPostId != 0)
                                {
                                    var posts = this.unitOfWork.HeaderPostManager.Get(e => e.HeaderId == Temp.Id);
                                    if (posts.Count() > 0)
                                    {
                                        posts.ElementAt(0).PostId = Temp.TempPostId;
                                        this.unitOfWork.HeaderPostManager.Update(posts.ElementAt(0));
                                    //    Temp.HeaderPost = posts.ElementAt(0);

                                    }
                                    else
                                    {
                                      //  Temp.HeaderPost = this.unitOfWork.HeaderPostManager.Add(new HeaderPost { HeaderId = Temp.Id, PostId = Temp.TempPostId });
                                    }

                                }
                                if (Temp.TempPostId == 0)
                                {
                                    var posts = this.unitOfWork.HeaderPostManager.Get(e => e.HeaderId == Temp.Id);
                                    //  Temp.TempPostId = 0;
                                    if (posts.Count() > 0)
                                    {
                                        this.unitOfWork.HeaderPostManager.RemoveById(posts.ElementAt(0).Id);
                                    }
                                }*/
                if (member)
                {
                    string JSONresult = JsonConvert.SerializeObject(Temp);
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
        [HttpDelete("{id}")]

        public IActionResult DeleteMempers(int id)
        {

            try
            {
                var member = this.unitOfWork.HeaderManager.RemoveById(id);
                if (member)
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

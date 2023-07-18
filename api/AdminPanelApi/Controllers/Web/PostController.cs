
using AutoMapper;
using AdminPanelApi.Core;
using AdminPanelApi.Helpers;
using AdminPanelApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using SU_API.Services.ImageUploader;
using AdminPanelApi.Models.Exist.Posts;
using System.Linq;
namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public static IimageUploader _imageUploder;

        public PostController(IUnitOfWork unitOfWork, IMapper mapper, IimageUploader uploader)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            _imageUploder = uploader;
        }
        [HttpGet("all/{IsArticle}")]
        public IActionResult GetMembers(bool IsArticle)
        {
            var Members = this.unitOfWork.PostManager.Get(e => e.Active == true && e.IsArticle == IsArticle
          
                ).OrderByDescending(e => e.Rank);
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
        [HttpGet]
        public IActionResult GetALl()
        {
            var Members = this.unitOfWork.PostManager.Get(e => e.Active == true).OrderByDescending(e=>e.Rank);
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
        [HttpGet("{id}")]
        public IActionResult GetALl(int id)
        {
            var Members = this.unitOfWork.PostManager.Get(e => e.Id==id).OrderByDescending(e => e.Rank)
       ;
            if (Members.Count()>0)
            {
                string JSONresult = JsonConvert.SerializeObject(Members.ElementAt(0));
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
            var objlist = this.unitOfWork.PostManager.Get(
orderBy: e => e.OrderByDescending(e=>e.Rank ));
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
        [HttpGet("SkipAndTake/{skip}")]

        public IActionResult GetPosts(int skip)
        {

            var Post = this.unitOfWork.PostManager.SkipAndTake(skip + 5);
            if (Post != null)
            {
                return Ok(JsonConvert.SerializeObject(Post));
            }
            else
            {
                return Ok();
            }
        }
        [HttpPost]
        public IActionResult InsertMember([FromForm] IFormFile Image, [FromForm] Post Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploder.UploadFormFile(Image);
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
  
                var member = this.unitOfWork.PostManager.Add(Temp);
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

        public IActionResult UpdateMember([FromForm] IFormFile Image, [FromForm] Post Temp)
        {

            try
            {
                if (Image != null)
                {
                    var result = _imageUploder.UploadFormFile(Image);
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
                var member = this.unitOfWork.PostManager.Update(Temp);
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
                var member = this.unitOfWork.PostManager.RemoveById(id);
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

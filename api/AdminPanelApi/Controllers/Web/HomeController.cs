using AdminPanelApi.Core;
using AdminPanelApi.Helpers;
using AdminPanelApi.Models.Exist;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public static ImageUploder _imageUploder;
        public HomeController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment enviroment)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            _imageUploder = new ImageUploder(enviroment);
        }


        [HttpGet("All")]
        public IActionResult aboutUs()
        {


            string JSONresult = JsonConvert.SerializeObject(new
            {
                Headers = this.unitOfWork.HeaderManager.Get(filter: e => e.Active, includeProperties: "HeaderPost"),
                Benefits = this.unitOfWork.BenefitsManager.Get(filter: e => e.Active),
                Member = this.unitOfWork.MemberManager.Get(filter: e => e.Active),
                Partners = this.unitOfWork.PartenerManager.Get(filter: e => e.Active),
                Services = this.unitOfWork.ServiceManager.Get(filter: e => e.Active),
                Questions = this.unitOfWork.QuestionManager.Get(filter: e => e.Active),
                Branches = this.unitOfWork.BranchManager.Get(filter: e => e.Active, includeProperties: "Numbers"),
                Social = this.unitOfWork.SocialManager.Get(),
                Sections = this.unitOfWork.SectionManager.Get(includeProperties: "Text"),
            });
            return Ok(JSONresult);


        }
        [HttpGet("admin")]
        public IActionResult Getuser()
        {
            var objlist = this.unitOfWork.BenefitsManager.GetAll();
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
        //[HttpGet("All")]
        //public IActionResult Get()
        //{


        //    string JSONresult = JsonConvert.SerializeObject(new
        //    {
        //        Headers = this.unitOfWork.HeaderManager.Get(filter: e => e.Active, includeProperties: "HeaderPost"),
        //        Benefits = this.unitOfWork.BenefitsManager.Get(filter: e => e.Active),
        //        Member = this.unitOfWork.MemberManager.Get(filter: e => e.Active),
        //        Partners = this.unitOfWork.PartenerManager.Get(filter: e => e.Active),
        //        Service = this.unitOfWork.ServiceManager.Get(filter: e => e.Active),
        //        Questions = this.unitOfWork.QuestionManager.Get(filter: e => e.Active),
        //        Branches = this.unitOfWork.BranchManager.Get(filter: e => e.Active, includeProperties: "Numbers"),
        //        Social = this.unitOfWork.SocialManager.Get(),
        //        Sections = this.unitOfWork.SectionManager.Get(includeProperties: "Text,Image"),
        //    });
        //    return Ok(JSONresult);


        //}
        [HttpPost]
        public IActionResult Insert([FromForm] IFormFile Image, [FromForm] Benefit Temp)
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
                var Object = this.unitOfWork.BenefitsManager.Add(Temp);
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

        public IActionResult Update([FromForm] IFormFile Image, [FromForm] Benefit Temp)
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
                var Object = this.unitOfWork.BenefitsManager.Update(Temp);
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
                var Object = this.unitOfWork.BenefitsManager.RemoveById(id);
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

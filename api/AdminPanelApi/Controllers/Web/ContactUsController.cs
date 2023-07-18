using AdminPanelApi.Core;
using AdminPanelApi.EmailSender;
using AdminPanelApi.Models;
using AdminPanelApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class ContactUsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        private readonly IMailService mailService;
        public ContactUsController(IUnitOfWork unitOfWork, IMapper mapper, IMailService _mailService)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
            mailService = _mailService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var objlist = this.unitOfWork.ContactUsManager.Get(e => e.Active == true);
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
        [HttpGet("SkipAndTake/{skip}")]

        public IActionResult GetPosts(int skip)
        {
        
            var Post = this.unitOfWork.ContactUsManager.SkipAndTake(skip + 5 );
            if (Post != null)
            {
               
                return Ok(JsonConvert.SerializeObject(Post));
            }
            else
            {
                return Ok();
            }
        }
        [HttpGet("admin")]
        [Authorize(Roles = RolesHelpers.Admin)]
        public IActionResult Getadmin()
        {
            try
            {

                var objlist = this.unitOfWork.ContactUsManager.GetAll();
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
        public async Task<IActionResult> Insert([FromBody] ContactUs Temp)
        {

            try
            {
                Temp.Date = DateTime.Now;
                var Object = this.unitOfWork.ContactUsManager.Add(Temp);
                if (Object.Id > 0)
                {
                    await mailService.ContactUsRequestEmailAsync(Temp);
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

        public IActionResult Update([FromBody] ContactUs Temp)
        {
            try
            {


                var Object = this.unitOfWork.ContactUsManager.Update(Temp);
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
                var Object = this.unitOfWork.ContactUsManager.RemoveById(id);
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
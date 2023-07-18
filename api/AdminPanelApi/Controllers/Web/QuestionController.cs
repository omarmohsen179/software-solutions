using AdminPanelApi.Core;
using AdminPanelApi.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public QuestionController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var objlist = this.unitOfWork.QuestionManager.Get(e => e.Active == true);
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
        [HttpPost("Order")]
        public IActionResult updateAll([FromBody] List<Question> Temp)
        {

            try
            {
                var Object = this.unitOfWork.QuestionManager.UpdateList(Temp.Select((e, idx) =>
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
        [HttpGet("admin")]
        public IActionResult Getadmin()
        {
            try
            {

                var objlist = this.unitOfWork.QuestionManager.GetAll();
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
        public IActionResult Insert([FromForm] Question Temp)
        {

            try
            {

                var Object = this.unitOfWork.QuestionManager.Add(Temp);
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

        public IActionResult Update([FromForm] Question Temp)
        {
            try
            {


                var Object = this.unitOfWork.QuestionManager.Update(Temp);
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
                var Object = this.unitOfWork.QuestionManager.RemoveById(id);
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
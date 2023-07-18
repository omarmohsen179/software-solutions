    using AdminPanelApi.Core;
using AdminPanelApi.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
namespace AdminPanelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public BranchController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var objlist = this.unitOfWork.BranchManager.Get(e => e.Active == true, includeProperties: "Numbers");
            if (objlist != null)
            {
                return Ok(JsonConvert.SerializeObject(objlist));
            }
            else
            {
                return Ok();
            }
        }
        [HttpGet("/testhome")]
        public IActionResult Getxx()
        {
            return Ok("done 2023");

        }
        [HttpGet("admin")]
        public IActionResult Getuser()
        {
            var objlist = this.unitOfWork.BranchManager.Get(includeProperties: "Numbers");
            if (objlist != null)
            {
                return Ok(JsonConvert.SerializeObject(objlist));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("Order")]
        public IActionResult updateAll([FromBody] List<Branch> Temp)
        {

            try
            {
                var Object = this.unitOfWork.BranchManager.UpdateList(Temp.Select((e, idx) =>
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
        public IActionResult Insert([FromBody] Branch Temp)
        {

            try
            {

                var numbers = Temp.Numbers;//this.unitOfWork.NumberManager.AddList(Temp.Numbers);
                Temp.Numbers = null;

                var Object = this.unitOfWork.BranchManager.Add(Temp);
                if (Object.Id > 0)
                {
                    if (numbers != null && numbers.Count() > 0)
                    {
                        foreach (var ele in numbers)
                        {
                            ele.Id = 0;
                            ele.BranchId = Object.Id;
                        }
                        numbers = this.unitOfWork.NumberManager.AddList(numbers);
                        if (numbers == null)
                        {
                            return BadRequest();
                        }
                        Object.Numbers = numbers;
                    }


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

        public IActionResult Update([FromBody] Branch Temp)
        {
            try
            {
                var numbers = Temp.Numbers;
                if (Temp.Numbers != null)
                {
                    var NewObjects = Temp.Numbers.Where(e => e.Id <= 0).ToList();
                    var OldObjects = Temp.Numbers.Where(e => e.Id > 0).ToList();
                    var myList = new List<Number>();

                    if (NewObjects.Count() > 0)
                    {
                        foreach (var ele in NewObjects)
                        {
                            ele.Id = 0;
                            ele.BranchId = Temp.Id;
                        }
                        var add = this.unitOfWork.NumberManager.AddList(NewObjects);
                        NewObjects = add.ToList();
                    }
                    myList.AddRange(OldObjects.ToList());
                    myList.AddRange(NewObjects.ToList());
                    var Update = this.unitOfWork.NumberManager.UpdateList(myList);
                    numbers = myList;
                }


                Temp.Numbers = null;
                var Object = this.unitOfWork.BranchManager.Update(Temp);
                if (Object)
                {
                    Temp.Numbers = numbers;
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
                var Object = this.unitOfWork.BranchManager.RemoveById(id);
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
        [HttpDelete("number/{id}")]

        public IActionResult Deletze(int id)
        {

            try
            {
                var Object = this.unitOfWork.NumberManager.RemoveById(id);
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

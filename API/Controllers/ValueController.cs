using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.Extensions.Logging;
using Data;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValueController : ControllerBase
    {
        private readonly DataContext _context;
        public ValueController(DataContext context)
        {
            this._context = context;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get(){
            var values = await _context.values.ToListAsync();
            return Ok(values) ; 
        }
        [ HttpGet("{id}") ] 
        public async Task<ActionResult<Value>> Get(int id){
            var values = await _context.values.FindAsync(id);
            return Ok(values) ; 
        }

    }
}
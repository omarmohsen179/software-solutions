using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Core.Manager
{
    public class ServiceManager
: Repository<Service, AppDbContext>
    {
        public ServiceManager(AppDbContext context) : base(context)
        {

        }
    }
}

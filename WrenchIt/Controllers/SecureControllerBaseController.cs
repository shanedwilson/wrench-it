﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WrenchIt.Controllers
{
        [Route("api/[controller]")]
        [ApiController, Authorize]
        public class SecureControllerBase : ControllerBase
        {
            protected string UserId => User.FindFirst(u => u.Type == "user_id").Value;
        }
}
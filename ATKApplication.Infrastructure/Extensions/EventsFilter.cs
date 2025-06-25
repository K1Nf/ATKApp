//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;

//namespace ATKApplication.Extensions
//{
//    [AttributeUsage(AttributeTargets.All)]
//    public class EventsFilter : Attribute, IAsyncActionFilter
//    {
//        private readonly ILogger<EventsFilter> _logger;
//        public EventsFilter(/*[FromServices] ILogger<EventsFilter> logger*/)
//        {
            
//            //_logger = logger;
//        }
//        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
//        {
//            //await Task.Delay(2000);
//            //await next();

//            Console.WriteLine(context.RouteData.Values);
            
//            //context.Result = new NotFoundResult();

//            ILogger<EventsFilter> _logger = context.HttpContext.RequestServices.GetService<ILogger<EventsFilter>>();
//                //?.LogInformation("Executed async before action");

//            Console.WriteLine("Executed async before action");
//            _logger.LogInformation("Executed async before action");
//            await next();
//            Console.WriteLine("Executed async after action");
//            _logger.LogInformation("Executed async after action");

//            //context.Result = new BadRequestResult();
//        }
//    }



//    public class EventsFilterNonAsync : Attribute, IActionFilter
//    {
//        public void OnActionExecuted(ActionExecutedContext context)
//        {
//            context.HttpContext.RequestServices
//                .GetService<ILogger<EventsFilterNonAsync>>()
//                ?.LogInformation("Executed non async after action");
//        }

//        public void OnActionExecuting(ActionExecutingContext context)
//        {
//            context.HttpContext.RequestServices
//                .GetService<ILogger<EventsFilterNonAsync>>()
//                ?.LogInformation("Executed non async before action");
//        }
//    }
//}

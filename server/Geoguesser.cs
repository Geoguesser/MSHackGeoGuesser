using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlayFab;
using PlayFab.ClientModels;

namespace Hack.Geoguesser
{
    public static class Geoguesser
    {
        [FunctionName("Geoguesser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            PlayFabSettings.TitleId = Environment.GetEnvironmentVariable("PlayFabTitleId");
            log.LogInformation("C# HTTP trigger function processed a request.");

            var request = new LoginWithCustomIDRequest
            {
                CustomId = "Getting Started"
            };

            var login = await PlayFabClientAPI.LoginWithCustomIDAsync(request);
            Console.WriteLine($"Login: {JsonConvert.SerializeObject(login)}");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            return name != null
                ? (ActionResult)new OkObjectResult($"May the force be with you, {name}. Always")
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }
    }
}

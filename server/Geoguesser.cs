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
using System.Collections.Generic;

namespace Hack.Geoguesser
{
    public static class Geoguesser
    {
        [FunctionName("Geoguesser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            PlayFabSettings.staticSettings.TitleId = Environment.GetEnvironmentVariable("PlayFabTitleId");
            log.LogInformation("C# HTTP trigger function processed a request.");

            var request = new LoginWithCustomIDRequest
            {
                CustomId = req.Query["name"]
            };

            var login = await PlayFabClientAPI.LoginWithCustomIDAsync(request);
            var updateStatisticsResponse = await PlayFabClientAPI.UpdatePlayerStatisticsAsync(new UpdatePlayerStatisticsRequest
            {
                Statistics = new List<StatisticUpdate>
                {
                    new StatisticUpdate
                    {
                        StatisticName = "Headshots",
                        Value = Convert.ToInt32(req.Query["score"])
                    }
                }
            });

            Console.WriteLine($"statistics response: {JsonConvert.SerializeObject(updateStatisticsResponse)}");

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

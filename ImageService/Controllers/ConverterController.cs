using System.ComponentModel.DataAnnotations;
using System.Drawing;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using Microsoft.AspNetCore.Mvc;

namespace ImageService.Controllers;

[ApiController]
[Route("convert")]
public class ConverterController : ControllerBase
{
    private readonly ILogger<ConverterController> _logger;

    public ConverterController(ILogger<ConverterController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "ConvertImage")]
    public async Task<IActionResult> Post([FromForm] [Required] IFormFile file)
    {
        Stream webpFileStream = new MemoryStream();
        await Task.Run(() =>
        {
            using ImageFactory factory = new();

            factory.Load(file.OpenReadStream())
                .Format(new WebPFormat())
                .Quality(70)
                .Resize(new Size(500, 500))
                .Save(webpFileStream);
        });

        return File(webpFileStream, "image/webp");
    }
}
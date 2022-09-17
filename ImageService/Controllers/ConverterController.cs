using System.ComponentModel.DataAnnotations;
using System.Drawing;
using ImageProcessor;
using ImageProcessor.Imaging.Formats;
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
    public async Task<IActionResult> Post([FromForm] [Required] IFormFile file, [FromForm] [Required] double top,
        [FromForm] [Required] double left, [FromForm] [Required] double scale)
    {
        Stream jpegFileStream = new MemoryStream();
        await Task.Run(() =>
        {
            using ImageFactory factory = new();
            factory.Load(file.OpenReadStream());

            double height = factory.Image.Width;
            double ratio = scale / 100;
            int viewSize = (int) (height / ratio);

            Rectangle crop = new((int) (left * height / ratio),
                (int) (top * height / ratio),
                viewSize,
                viewSize);

            factory.Crop(crop);
            double cropHeight = factory.Image.Height;
            if (cropHeight > 500)
                factory.Resize(new Size(500, 500));
            
            factory
                .Format(new JpegFormat())
                .Quality(80)
                .Save(jpegFileStream);
        });

        return File(jpegFileStream, "image/webp");
    }
}
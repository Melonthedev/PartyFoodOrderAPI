namespace PartyFoodOrderAPI.Services;

public class UploadService
{
    private readonly IConfiguration _configuration;

    public UploadService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary>
    /// Uploads an IFile to the "uploads" folder in the wwwroot
    /// </summary>
    /// <param name="file">The file to upload</param>
    /// <param name="cancellationToken">cancellation token for cancellations e.g. by the user</param>
    /// <returns>the relative http path to the file</returns>
    public async Task<string> UploadFile(IFormFile file)
    {
        var fileName = Guid.NewGuid() + System.IO.Path.GetExtension(file.Name);
        var relativeFilePath = "uploads/";
        var rootPath = System.IO.Path.Combine(Environment.CurrentDirectory, "wwwroot");
        var filePath = System.IO.Path.Combine(rootPath, relativeFilePath, fileName);
        if (!Directory.Exists(System.IO.Path.Combine(rootPath, relativeFilePath)))
            Directory.CreateDirectory(System.IO.Path.Combine(rootPath, relativeFilePath));
        await using var stream = File.Create(filePath);
        await file.CopyToAsync(stream);
        return relativeFilePath + fileName;
    }

    public string GetUrlFromUploadPath(string uploadPath)
    {
        return _configuration.GetValue<string>("Host:url") + uploadPath;
    }
}
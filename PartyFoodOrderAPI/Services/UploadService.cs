namespace PartyFoodOrderAPI.Services;

public class UploadService
{

    /// <summary>
    /// Uploads an IFile to the "uploads" folder in the wwwroot
    /// </summary>
    /// <param name="file">The file to upload</param>
    /// <param name="cancellationToken">cancellation token for cancellations e.g. by the user</param>
    /// <returns>the relative http path to the file</returns>
    public async Task<string> UploadFile(IFormFile file)
    {
        var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        var relativeFilePath = "uploads/";
        var rootPath = Path.Combine(Environment.CurrentDirectory, "wwwroot");
        var filePath = Path.Combine(rootPath, relativeFilePath, fileName);
        if (!Directory.Exists(Path.Combine(rootPath, relativeFilePath)))
            Directory.CreateDirectory(Path.Combine(rootPath, relativeFilePath));
        await using var stream = File.Create(filePath);
        await file.CopyToAsync(stream);
        return "/" + relativeFilePath + fileName;
    }
}
using PartyFoodOrderAPI.Schemas;

namespace PartyFoodOrderAPI.Services
{
    public class ImageProcessingService
    {

        private static HttpClient _client;

        public ImageProcessingService(HttpClient httpClient)
        {
            _client = httpClient;
        }


        public enum Status : byte
        {
            Success,
            InvalidUrl,
            TooLarge,
        }

        public record Result(Status Status);

        
        public static async Task<(Status, byte[], string)> ProcessImageStreamAsync(ProductData data)
        {
            if (data.Image is not null)
            {
                return (Status.Success, data.Image, $"data:image/{data.ImageFormat};base64,");
            }
            if (data.ImageUrl is null)
            {
                return (Status.InvalidUrl, Array.Empty<byte>(), null);
            }
            using HttpClient httpClient = new HttpClient();
            Uri uri;
            try
            {
                uri = new Uri(data.ImageUrl);
            }
            catch (UriFormatException)
            {
                return (Status.InvalidUrl, Array.Empty<byte>(), null);
            }
            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(uri);
            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                return (Status.InvalidUrl, Array.Empty<byte>(), null);
            }
            Stream stream = await httpResponseMessage.Content.ReadAsStreamAsync();
            (Status, byte[]) bytes = await GetBytes(stream);
            return (bytes.Item1, bytes.Item2, $"data:image/{data.ImageFormat};base64,");
        }

        public static async Task<(Status, byte[])> GetBytes(Stream stream)
        {
            byte[] buffer = new byte[512];
            using MemoryStream ms = new MemoryStream();
            int read;
            while ((read = await stream.ReadAsync(buffer, 0, buffer.Length)) > 0)
            {
                if (stream.Length < read || read > 50000) return (Status.TooLarge, Array.Empty<byte>());
                ms.Write(buffer, 0, read);
            }
            return (Status.Success, ms.ToArray());
        }

    }
}

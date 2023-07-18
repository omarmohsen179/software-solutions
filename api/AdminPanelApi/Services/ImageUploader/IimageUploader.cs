
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Expressions;

namespace SU_API.Services.ImageUploader
{
    public interface IimageUploader
    {
        public ImageUpladerReturn UploadFormFile(IFormFile File);
        public ImageUpladerReturn UploadByteArray(string File);
        public string NextImageNumber(IFormFile File);
        public string base64getextention(string data);
        public List<T> UploadImagesList<T>(List<IFormFile> ImagesList, Func<string, T> implement = null);
    }
}

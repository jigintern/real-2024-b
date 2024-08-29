function previewIcon(event) {
  const imageFile = event.files[0];
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
  };

  imageCompression(imageFile, options)
    .then(function (compressedFile) {
      console.log(
        `元画像のサイズ: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`
      );
      console.log(
        `圧縮した画像のサイズ: ${(compressedFile.size / 1024 / 1024).toFixed(
          2
        )} MB`
      );
      const img = URL.createObjectURL(compressedFile);
      document.getElementById("iconImg").src = img;
      localStorage.setItem("icon", img);
      document.getElementById("uploadIconError").style.display = "none";
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function activeIcon(event) {
  const imageFile = event.files[0];
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
  };
  imageCompression(imageFile, options)
    .then(function (compressedFile) {
      console.log(
        `元画像のサイズ: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`
      );
      console.log(
        `圧縮した画像のサイズ: ${(compressedFile.size / 1024 / 1024).toFixed(
          2
        )} MB`
      );
      const img = URL.createObjectURL(compressedFile);
      document.getElementById("activeImg").src = img;
      localStorage.setItem("activeImg", img);
      document.getElementById("uploadActiveError").style.display = "none";
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

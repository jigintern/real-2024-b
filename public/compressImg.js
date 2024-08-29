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
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("iconImg").src = e.target.result;
        localStorage.setItem("icon", e.target.result);
        document.getElementById("uploadIconError").style.display = "none";
      };
      // ここでBlobオブジェクトを読み込み、読み込みが完了したタイミングでreader.onloadに定義した関数が実行される
      reader.readAsDataURL(compressedFile);
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
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("activeImg").src = e.target.result;
        localStorage.setItem("activeImg", e.target.result);
        document.getElementById("uploadIconError").style.display = "none";
      };
      // ここでBlobオブジェクトを読み込み、読み込みが完了したタイミングでreader.onloadに定義した関数が実行される
      reader.readAsDataURL(compressedFile); //
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

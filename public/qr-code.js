function canvas() {
  $("canvas").attr("id", "canvas"); //canvasにidをつける
}

function hidden() {
  $("#op-qrcode").empty(); //#op-qrcodeの子要素削除
}

$("#make").on("click", function () { //makeボタンが押された場合の処理
  hidden(); //二回目にmakeがクリックされた場合の処理
  var input = $("#ip-qrcode").val(); //テキストを取得
  var size = $("#size").val(); //サイズを取得
  var text = unescape(encodeURIComponent(input)); //日本語対応
  if (input == "") { //テキストが入力されていなかった場合の処理
    alert("文字を入力してください。\nPlease enter the characters.");
  } else if (size > 0) { //サイズが指定されている場合の処理
    $("#op-qrcode").qrcode({ text: text, width: size, height: size });
    canvas();
  } else { //サイズが指定されていない場合の処理
    $("#op-qrcode").qrcode({ text: text, width: 1000, height: 1000 });
    canvas();
  }
});

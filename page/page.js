/**
 * ロードが終わったら 「GET /home-page」でサーバーにアクセスする
 */
window.onload = async () => {
    const response = await fetch('/home-page');
    document.querySelector('#home-page-title').innerText = await response.text();
}
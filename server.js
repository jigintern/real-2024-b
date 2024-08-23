// https://deno.land/std@0.194.0/http/server.ts?s=serve
import { serve } from 'http/server.ts'
// https://deno.land/std@0.194.0/http/file_server.ts?s=serveDir
import { serveDir } from 'http/file_server.ts'

/**
 * APIリクエストを処理する
 */
serve((req) => {
  // URLのパスを取得
  const pathname = new URL(req.url).pathname;
  console.log(pathname);
  // パスが'/welcome-message'だったら「'jigインターンへようこそ！'」の文字を返す
  if (req.method === 'GET' && pathname === '/home-page') {
    return new Response('Hello World!');
  }

  // publicフォルダ内にあるファイルを返す
  return serveDir(req, {
    fsRoot: './page',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
# Packages

1. morgan (in ra các logs khi user chạy 1 request)
   npm i morgan --save-dev
2. helmet (bảo vệ những thông tin riêng tư, ngăn chặn các trang thứ 3 truy cập vào cookie của chúng ta)
   VD: khi curl http:localhost:3055 --include (--include: cho phép xem header của hệ thống chúng ta)

```js
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 139
Date: Sat, 05 Oct 2024 11:45:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

=> Nó sẽ hiển thị X-Powered-By: Express => Tìm những lỗ hổng của express và đục vào đó
Khi sử dụng helmet nó sẽ ko hiển thị những thông tin riêng tư

```js
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/"b-Ck1VqNd45QIvq3AZd8XYQLvEhtA"
Date: Sat, 05 Oct 2024 11:48:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

3. compression (khi vận chuyển dữ liệu(payload) đến mobile, be, web,... thì tốn băng thông của cả người dùng và chúng ta (server)) => dùng compression để giảm nó đi
   npm i compression

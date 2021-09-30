---
date: 2021-09-30
author_profile: true
categories:
  - network
title: "Application Layer 4"
---

## Chapter 2. Application Layer

### 2.2 The Web and HTTP

#### 2.2.2 Non-Persistant and Persistant Connections

* Non-Persistant connections : each request/response pair가 separate TCP connection 사이에서 이루어짐.

* Persistant connections : 모든 requset, responses가 same TCP connection에서 이루어짐.

---
###### HTTP with Non-Persistant Connections

```HTML
http://www.someSchool.edu/someDepartment/home.index
```

위와 같은 URL로 HTTP 통신을 한다고 하자.

1. HTTP client가 `www.someSchool.edu` Port 80으로 TCP connection을 시도함.

2. HTTP client가 /someDepartment/home.index라는 path name을 담아서 HTTP request를 보냄.

3. HTTP server는 path name이 포함된 request를 socket으로 받아서, reponse 메시지를 socket으로 보낸다.

4. client가 response 메시지를 받고 난 후, HTTP server는 TCP connection을 닫는다.

5. client는 response 메시지로 HTML file들을 받게 된다.

6. 다른 object들 전송에 대해서도, 위 과정이 반복된다.

each TCP conection에서  one request와 one response를 주고 받기 때문에, object 개수만큼 TCP connections이 이루어진다.


* Round-Trip Time (RTT) : client에서 출발한 packet이 server를 거쳐 다시 client로 돌아오는 데까지 걸리는 time이다. RTT는 packet-propagation delays, packet-queuing delays, packet-processing delays를 포함한다.

nodal processing delay : packet header 정보 확인하는 데에 걸리는 시간

queuing delay : packet이 queue에서 기다리는 시간 

transmission delay : L / R,  라우터에서 패킷이 보내지는 데에 걸리는 시간

Propagation delay : A에서 B로 보내는 데에 걸리는 시간

다 합치면 nodal delay이다.


TCP 통신은 `three-way handshake`로 이루어진다.

1. client가 server에 small TCP segment를 보낸다.

2. server는 acknowledges와 responds로 small TCP segment를 보낸다.

3. client 가 acknowledges를 다시 server에 보낸다.

1, 2 과정에서 1 RTT가 소모되고, 3 과정에서 client는 HTTP request message를 담아서 보내기 때문에 3과정 이후 server에서 response message가 오면 다시 1 RTT가 소모된다. (총 2 RTT)

###### HTTP with Persistent Connections

Non-persistent Connections는 아래와 같은 단점이 있다.

1. 매 연결마다 새롭게 연결을 해주어야 한다. TCP buffers, TCP variables를 설정하는 과정에서 Web Server에게 부담을 준다.

2. 각 object 통신 연결마다 2 RTT delay가 발생한다.

persistent connceiton에서는 하나의 TCP connection으로 여러 object들을 통신할 수 있다.

#### 2.2.3 HTTP Message Format

HTTP message에는 두 가지 Format이 있다. Request message와 Response message.

HTTP request message는 request line, header lines, Entity body로 구성되어 있다..

request line은 다음 세 가지 fields를 가진다.

1. the method field : Get, Post, Head, Put, Delete 중 무엇인지

2. the URL field 

3. the HTTP version field

Header line 종류들에는 아래와 같은 것들이 있다.

* Host : Web proxy caches가 요구함.

* connection : persistent 하게 connection 할건지 유무

* User-agent : Firefox와 같은 browswer type을 의미.

* Accept-language : server에 요구사항에 관한 object가 있으면 내보내주고, 없으면 default version을 내보낸다.

Entity body는 `Get` method에선 비어있지만, `Post` method에서 사용된다.

`Post` 방식에서 user가 원하는 정보를 담아 보낼 수 있는데, `Get` 방식에서도 URL에 정보를 추가하여 보낼 수 있다.

`Head` 방식은 `Get` 방식과 유사하지만, requested object가 아닌, requested 헤더 정보만 server로부터 받게 된다.

`Put` 방식은 user가 특정 Web Server에 object들을 upload할 때 사용된다.

`Delete` 방식은 Web server의 object를 지울 때 사용된다.

###### HTTP Response Message 

response message는 세 가지 section으로 나눌 수 있다.

1. status line :the protocol version, status code, coressponding status message로 구성된다. (예시로, HTTP/1.1 200 OK)

2. header lines

3. entity body : object 그 자체

Header line 종류에는 아래와 같은 것들이 있다.

1. Connection

2. Date : object가 언제 만들어졌거나 언제 수정되어있는지에 대한 기록이 아니다. Server가 file system으로부터 언제 retrieves했는지, 언제 response message에 담겼는지, 언제 response message를 보냈는지 정보가 담겨 있다.

3. Server : Apache Web server 같은 정보가 담겨 있다. (마치 request message에서 User-agent와 같은 역할이다.)

4. Last-Modified : object가 언제 수정되고 만들어졌는지

5. Content-Length : object의 byte수

6. Content-Type : Entity body가 HTML text라는 정보 같은 것이 담겨있다. (Object type과 같은 것.)


status code 종류에는 200, 301, 400(Bad Request) 등이 있다.

이 외에도 수많은 Header line 종류들이 있다.


#### 2.2.4 User-Server Interaction: Cookies

HTTP server는 stateless이지만, user identity가 필요한 부분이 있다. 이때 HTTP 는 cookies를 사용한다.

Cookie technology 구성에는 아래 4가지가 있다. 

1. a cookie header line in the HTTP response message

2. a cookie header line in the HTTP request message

3. user의 endsystem에서 user의 browser가 관리하는 cookie file

4. back-end database at the Website

내가 이해하기로는, response, request message, end system, serever 요렇게 네 가지 구성으로 이루어져 있다는 의미인듯.

client가 서버에 접근하면, 서버는 identification number를 만들어서 HTTP response에 포함시킨다. (Set-cookie라는 header line에 포함시킴)

Cookie를 통해 Server는 client's activity를 track할 수 있다. 이러한 점 때문에, user의 개인 정보 침해로 여겨지기도 한다.

---
date: 2021-10-05
author_profile: true
categories:
  - network
title: "Application Layer 총정리"
---

## Chapter 2. Application Layer

### 2.1 principles of Network Applications

각기 다른 end systems에서 program들이 돌아가고 있고, 이를 통해 우리는 네트워크 통신이 가능함.

#### 2.1.1 Network Application Architectures
Network architecture과 Application architecture를 구분해야 한다. 

Network architecture는 이전에 배운 다섯 가지의 Layer(Application, Transport, Network, Link, Physical)를 말한다.

Application architecture은 크게 두 가지로 나눌 수 있다. 

1. the client-server architecture

2. the peer-to-peer(P2P) architecture


###### Client-Server Architecture 

1. Always-on host인 server가 존재한다. Clients는 server로 request를 보내고, response를 받을 수 있다.

2. Clients끼리는 서로 communicate 하지 않는다.

3. 서버는 fixed, well-known address(IP 주소)를 가진다.

4. Client-Server Application에서 서버가 하나면, 수많은 request를 처리하기 힘들다. 따라서 수많은 서버를 가지고 있는 Data Center를 고용한다. Service Providers는 Data Center에 값을 지불하게 된다.

5. Client-Server Application 예시로 Web, FTP, Telnet, E-mail 등이 있다.

###### P2P Architecture

1. Data Center를 이용하지 않고, 대신 pairs of connected hosts(Peers) 간 communication을 이용한다..

2. Self-scalability, 즉 requesting files에서 발생하는 workload를 peers끼리 분담하는 특성을 지닌다.

3. 특별한 Server 인프라가 필요하지 않기 때문에, Cost Effective 하다.

4. Decentralized Structure이기 때문에 Security, Performance, Reliability 문제가 있다. 

5. 수업 때 들은 것으론, 저작권 문제도 있다.

Client-Server Architecture, P2P Architecture 모두 사용할 수도 있다. (Hybrid Architecture)



#### 2.1.2 Processes Communicating

Process들이 같은 end system에서 동작하고 있으면, Operating System을 통해 서로 communicate가 가능하다. 

그러나 이 책에선 Different hosts에서 어떻게 process들이 서로 communicate하는지 설명해준다. 

각 Process들은 서로 network를 통해 message를 주고 받으며 Communicate한다.


###### Client, Server 정의

아래는 책에 나온 정의 그대로를 작성해보았다.

> In the context of a communication session between a pair of processes, the process that initiates the communication (that is, initially contacts the other process at the beginning of the session) is labeled as the client. The process that waits to be contacted to begin the session is the server.

쉽게 얘기하자면, client는 communication을 시작하는 process이고, server는 communication이 되기를 기다리는 process이다.


###### Socket

Application0 Layer와 Transport Layer 간 interface(=API)가 `Socket`이다. 책에서는 Application Layer를 집, socket을 문으로 비유했다.

Application Developer는 Application Layer side의 socket control은 모두 지니고 있지만, Transport Layer side의 socket control은 일부만 가지고 있다.

Transport Layer side에서 가질 수 있는 socket control은 아래와 같다.

1. the choice of transport protocol

2. the ability to fix a few transport Layer parameter


###### Addressing Processes

Packet들을 보낼 때, Receiving process는 다음 두 가지가 필요하다.

1. the address of the host (32 bit로 구성된 IP Address)

2. an identifier that specifies the receiving process in the destination host (Port Number)

identifier가 필요한 이유는, host가 수많은 Network Application을 돌리고 있으니, Receiving Process에 접근하기 위함이다.

대표적인 Application의 Port Number는 미리 지정되어 있는데, 예를 들면 `Web`은 80, `SMTP(Mail)`은 25이다.


#### 2.1.3 Transport Services Available to Applications

Transport Services가 제공할 수 있는 4가지 중요 서비스는 아래와 같다.

1. Reliable Data Transfer

2. Throughput

3. Timing

4. Security


###### Reliable Data Transfer

통신 과정에서 Packet을 잃어버릴 수도 있다. 잃어버리지 않도록, 메시지를 받는 쪽에서 보내는 메시지가 필요하다.

Transport-Layer Protocol이 guaranteed data delivery service를 제공하면 `Reliable data transfer`이라 하고, 제공하지 않으면 `Loss-tolerant Applications`라고 한다.

Reliable data transfer의 대표적인 예시로는 금융 관련 Application이 있고, Loss-tolerant Application의 대표적인 예시로는 Audio, Video 서비스 등이 있다.


###### Throughput

Throughput은 Process들끼리 network path로 통신할 때, sending process가 bits를 보내는 속도를 의미한다.

guaranteed throughput service란, 특정 `r`bits/sec로 throguhput을 보장 가능한 transport protocol을 의미한다.

이런 throughput을 요구하는 Application을 `bandwidth-sensitive Applications`이라 하고, throughput 조절이 가능한 Application을 `elastic applications`라고 한다.


###### Timing

Timing guarantee란, 예를 들어 100 msec 내로 socket을 통해 모든 bit를 전송 가능함을 의미한다. 

Real-time application에서 중요하다.


###### Security

Transport protocol은 Data를 encrypt(암호화), decrypt(복호화)하여 메시지를 보내고, 받는다.



#### 2.1.4 Transport Services Provided by the Internet

지금까지는 Computer Network가 `제공할 수 있는` transport services를 알아보았다.

###### TCP Services

* Connection-oriented Service : TCP는 Application-level message 전달을 시작하기 전에 정보 교환을 한다. (Handshaking procedure)

* Reliable Data transfer Service : Socket으로 bytes를 보낼 때, TCP는 byte 수를 count 하여 miss 없는 데이터 전송을 한다.


###### SSL (Secure Sockets Layer)

TCP, UDP는 encryption이 없어서 보안이 약하고, TCP에 보안을 보충하여 만들어진 것이 SSL이다.


###### UDP Services

`connectionless`, `unreliable data transfer Service` 가 특징이다.

---

Throughput, Timing을 보장하는 protocol은 아직 없지만, 만족스러운 서비스를 제공할 정도의 기술은 있다.


#### 2.1.5 Application-Layer Protocols

Application-Layer Protocol이란, 다른 end system에서 돌아가는 application process들이 서로 message를 어떻게 보내는지를 정의한다.

좀 더 디테일하게 보자면, 아래 4가지로 나눌 수 있다.

1. 교환되는 메시지 타입 (The types of messages exchanged)

2. 메시지 형식 (The syntax of the various message types)

3. 메시지 의미 (The semantics of the fields, that is, the meaning of the information in the fields)

4. 언제 Process가 메시지를 보내고, 응답할지 (Rules for determining when and how a process sends messages and responds to messages)


대표적인 Web's Application-Layer Protocol으로는 HTTP가 있다.

Network Application 과 Application-Layer Protocol의 차이를 알아야 한다.

Application-Layer Protocol은 Network Application의 일부이다.

내가 이해하기로, Network Application은 전체적인 프로그램 자체이고 Application-Layer Protocol은 통신 방법을 정의한 것이다.


#### 2.1.6 Network Applications Covered in This Book

이 책에선 아래 주요 Application을 다룬다.

1. Web

2. Electronic mail

3. Directory Service Video Streaming(DNS)

4. P2P 



### 2.2 The Web and HTTP

#### 2.2.1 Overview of HTTP

The HyperText Transfer Protocol(HTTP)는 Web's application-layer protocol이다.

HTTP는 client program과 server program에서 실행되는데, 둘 사이에서 HTTP message들이 교환된다.

HTTP는 어떻게 messages가 교환되는지와 message의 structure을 정의한다. 

HTTP에 대해 자세히 보기 전에, Web 용어를 먼저 Review한다.

---

Web pages는 여러 objects로 구성되는데, 이때 objects란 HTML file, JPEG image와 같은 file을 뜻한다. 이런 file들은 single URL에 의해 addressable하다.

HTML file은 다른 object들의 URL을 통해 reference가 가능하다. 각 URL은 object를 가지고 있는 server의 `hostname`과 objetc의 `pathname`을 component로 지니고 있다.

Web browsers는 client side, Web servers는 server side of HTTP 로 이해하면 된다.


HTTP는 Web Clients가 server에 Web pages를 어떻게 요청하는지, 서버는 Web pages를 어떻게 Client에게 제공하는지를 정의한다.

HTTP는 transport protocol로 TCP를 사용한다. 이때, layered architecture의 장점을 확인할 수 있는데, HTTP는 TCP가 어떻게 loss data를 관리하는지 알 필요가 없다. 

HTTP에서 server는 client의 information을 저장해놓지 않기 때문에, `stateless protocol`이라 불린다.



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



#### 2.2.5 Web Caching

Web cache는 proxy server (`proxy`는 `대리의`라는 뜻을 가진다.)를 의미한다.

Web Cache는 client request로부터 response time을 줄여주고, access link의 traffic을 줄여준다.

책에 나온 예시를 소개하면, 아래와 같다.

> institutional network가 Public Internet 으로 평균 object size가 1 Mbits이고, 평균 request rate가 1초에 15개 request를 보낸다고 하자. (그러면 평균적으로 1초에 1 Mbits request를 15개 보낸다고 생각할 수 있다.) 이때, institutional network는 100Mbps LAN을 가지고 있고, Origin servers 접근을 위한 access link의 속도는 15 Mbps이다. Total response time 계산은 LAN delay + access delay + Internet delay로 하고, Internet delay는 평균 2초이다.
1초에 15 Mbits를 보내는데, 100 Mbps LAN 을 통과하는데는 문제가 없지만, access link를 통과하는데는 traffic이 발생한다. 각각의 traffic intensity를 계산해보면, LAN은 15/100 = 0.15, access link는 15/15 = 1이다.

데이터를 얻기 위한 traffic을 줄이려면, 어떻게 해야할까? access link 통과 속도를 15 Mbps에서 100 Mbps로 늘리면, 간단히 해결될 것 같지만 비용적인 문제가 있다.

이때 Institutional network쪽에 Web cache를 설치하여, 문제를 해결할 수 있다. hit rate가 0.4라고 하면 average delay는 0.4 * 0.01 + 0.6 * 2.01 = 1.2xx 이다.

더군다나 Web cache 설치가 그렇게 크지 않기 때문에, 많은 곳에서 사용한다. 

CDNs(Content Distribution Networks)라는 곳에서 caches를 설치해준다고 함.

###### The Conditional GET

Cache로 response time을 줄일 수 있다는 것은 알겠지만, cache 내 정보가 stale(오래된) 정보일 경우 문제가 발생한다.

HTTP에서는 Conditional GET 이라는 메커니즘으로 이 문제를 해결한다.

Cache에서 Server로 request를 요청하고, response를 받을 때 response message header line으로 Last-Modified 정보가 있다. Cache는 Object와 함께 이 정보를 저장하고 있다. 

이후 cache는 conditional GET에서 server에게 Last-Modified header line이 담긴 request message를 보낼 때, 해당 object의 수정 정보가 이후로 없었다면, server는 `304 Not Modified` 라는 status를 response message를 보낸다.

response message에는 entity body 역시 비어있는데, 애초에 수정되지 않았으므로 cache 정보를 그대로 수정할 필요 없고 그대로 client에게 제공해주면 된다. response time을 조금이라도 줄이려고 굳이 넣지 않는 것이다.



### 2.3 Electronic Mail in the Internet

Internet mail system은 세 가지 components를 가진다.

1. User agents : Microsoft Outlook이나 Applie Mail과 같이, 사용자가 read, forward, save 등을 할 수 있음. mail server로 message를 보내는 역할까지 함.

2. Mail servers : Mail box 역할, message queue가 있다.

3. Simple Mail Transfer Protocol(SMTP) : TCP connection을 한다.

User <-> User agents <-> Mailservers <-SMTP-> Mail servers <-> User agents <-> User 


#### 2.3.1 SMTP

SMTP는 sender의 mail servers로부터 recipients의 mail server로 메시지를 보낸다.

SMTP는 mail messages의 body를 simple 7-bit ASCII로 제한하기 때문에, binary multimedia data는 ASCII로 전부 encoding해야한다.

SMTP는 intermediate mail server를 사용하지 않기 때문에, 만약 받는 사람의 server가 down되면 보내는 사람의 server는 계속 기다려야 한다.

SMTP는 persistent connections를 사용한다.


#### 2.3.2 Comparison with HTTP
  
HTTP, SMTP 둘 다, persistent connections를 사용하고, 한 host로부터 다른 host로 files를 전달한다.

그러나 HTTP는 pull protocol이고, SMTP는 push protocol이다.

또, SMTP는 7-bit ASCII를 요구하지만, HTTP는 그렇지 않다.

마지막으로, HTTP는 each object를 HTTP response message에 encapsulate하고, SMTP는 모든 메시지 object를 하나의 메시지에 담는다.


#### 2.3.4 Mail Access Protocols

앞서 언급했던 대로 하면, 받는 사람의 sever가 always-on 이어야 한다.

Alice가 Bob에게 전달할 때, 아래와 같은 과정을 거친다.

1. Alice의 agent가 Alice's mail server에 SMTP로 전달

2. Alice의 mail server가 Bob의 mail server로 전달

3. Bob의 mail server가 pop3, imap, HTTP 등으로 Bob's agent에게 전달



### 2.4 DNS-The internet's Directory Service

우리가 이름으로 사람들을 식별하듯이, 인터넷 환경에서는 host를 hostname (such as github.io/nglsena0722) 으로 구별한다.

그런데 router 입장에서는 이러한 문자들이 처리하기 어렵다. router 입장에서는 IP addresses로 host를 식별한다.

따라서 hostname을 IP address로 바꿔주는 역할을 DNS(Domain Name System)이 한다.

#### 2.4.1 Services Provided by DNS

DNS는 아래와 같이, 또 다른 중요한 서비스를 제공해준다.

1. Host Aliasing : host가 매우 복잡한 hostname을 가지고 있으면, 여러 alias name(별명)을 가질 수 있다. 이때, 진짜 이름을 canonical hostname이라 하고, 좀 더 알기 쉬운 이름을 Alias hostname이라고 한다.

2. Mail server aliasing 

3. Local distribution : 여러 IP address들이 one canonical hostname과 assoicate되어 있을 수도 있다.

#### 2.4.2 Overview of How DNS Works

DNS server가 Centralized design이면 아래와 같은 문제점이 발생한다.

1. A single point of failure : DNS server에서 에러나면, 인터넷 사용이 완전히 불가능해진다.

2. Traffic Volume : 하나의 DNS server가 모든 DNS queries를 다뤄야 하므로, Traffic이 발생한다.

3. Distant centralized database : 모든 querying clients들과 지리적으로 가까워질 수 없음. server가 위치한 곳에서 지구 반대편 쪽의 client가 query를 요청하면, 상당한 delay가 발생할 것이다.

4. Maintenance : 모든 Internet host에 대해 관리하기가 어려움.

따라서, DNS는 A Distributed, Hierarchical Database로 관리한다.

총 세 가지의 classes가 있는데, root DNS servers, top-level domain(TLD) DNS servers, authritative DNS servers이다.

또, Each ISP는 a local DNS sever를 가지고, host는 ISP의 Local DNS server로 접근하게 된다.

DNS server 접근은 recurvsive, iterative하게 이루어진다.  


#### 2.4.3 DNS Records and Messages 

DNS servers는 hostname-to-IP address mapppings를 제공하는 Resource Records(RRs)를 저장한다.

Resource Records는 four-tuple 형식이다.

```
(Name, Value, Type, TTL)
```

TTL이란 `the time to live of the resource record`이다.

Name, Value는 Type에 따라 바뀐다.

1. Type = A : Name은 hostname, Value는 IP address for hostname 이다. 예를 들어, (relay1.bar.foo.com, 147.37.93.126, A) 로 나타낼 수 있다.

2. Type = NS : Name은 domain, Value는 the hosname of an authoritative DNS server이다. 예를 들어, (foo.com, dns.foo.com, NS) 로 나타낼 수 있다.

3. Type = CNAME : Name은 alias hostname, Value는 canonical hostname이다. 예를 들어, (foo.com, relay1.bar.foo.com, CNAME) 로 나타낼 수 있다.

4. Type = MX : Value는 alias hostname, Value는 canonical name of a mail server 이다. 예를 들어, (foo.com, mail.bar.foo.com, MX) 로 나타낼 수 있다.

우리 host에서 DNS server로 DNS query 메시지를 보내는 것을 확인하는 프로그램 : nslookup program

Registrar : commercial entity that verifies the uniqueness of the domain name, 즉 name, IP address를 registrar에 제공함으로써 domain name을 받을 수 있다.


### 2.5 Peer-to-Peer File Distribution

P2P architecture 은 always-on infrastructure servers의 reliance를 최소한으로 하고, pairs of intermittently connected hosts(peers)들이 서로 직접적으로 통신함.

P2P의 특징인 self-scalability : P2P file-sharing application에서, 각 peer들은 workload를 만들지만, 또한 다른 peer들에게 제공해주는 데 도움이 되는 service capacity도 제공해준다.

P2P에서 chunk를 요청할 때, neighbors들 중에서 가장 chunk수가 부족한 것 먼저 request하게 된다. (rarest first)



P2P에서 파일을 공유할 때 data 공급이 가장 빠른 네 peers과 파일들을 공유하게 된다. (네 peers는 unchocked되었다고 말한다.)


### 2.6 Video Streaming and Content Distribution Networks

#### 2.6.1 Internet Video

Video는 일정 속도로 display되는, images의 sequence이다.

#### 2.6.2 HTTP Streaming and DASH

Client마다 bandwidth의 양이 다르다. Bandwidth의 양이 high이면, client는 high-rate version의 video를 원한다.

따라서, Video를 여러 다른 버전으로 encoding하여 제공해주는 것이 DASH(Dynamic Adaptive Streaming over HTTP)이다.

DASH에서는 다른 Internet Access rate를 가진 client들이 다른 encoding rates된 video로 streaming할 수 있게 해준다.

#### 2.6.3 Content Distribution Networks

Single massive data center에서 바로 streaming video를 제공하기는 힘들다. 아래와 같은 문제점이 있는데,

1. client가 data center와 멀리 떨어져 있으면, packets이 이동하는 데 상당히 오래 걸린다.

2. 많이 실행되는 video는 똑같은 communication links들을 여러번 거쳐서 보내질 것이다.

3. data center가 하나밖에 없으므로, down되면 video streaming이 불가능하다.

따라서 CDNs(Content Distribution Networks)를 활용한다. CDN은 지리적으로 여러 군데 servers를 두어, videos의 copy를 관리한다.

CDN은 회사 자체적인 private CDN일 수도 있고, third-party CDN을 이용할 수도 있다.

CDN은 두 가지의 server placement 정책 중 하나를 이용한다.

1. Enter Deep : server cluster를 전 세계 ISP에 배치한다. 이를 통해 user-perceived delay와 처리량을 줄인다. 그러나 이러한 design은 유지, 보수가 어렵다.

2. Bring Home : Large clusters를 작게 설치하여, ISPs를 home에 가져오는 방식이다. Enter deep 방식과는 장단점이 반대이다.




CDN이 어떻게 동작하는지 살펴보자. 

1. host가 특정 Web page를 방문하면, Local DNS server에 해당 DNS query를 보낸다.

2. Local DNS server가 authoritative DNS server에게 DNS query를 전달하면, authoritative DNS server가 CDN domain을 제공한다.

3. DNS query로 CDN domain에 접근하면, request file 내용이 포함된 second query를 보낸다. 이를 통해 CDN domain이 request file이 보관된 server를 제공해준다.


CDN에서 client를 어느 cluster로 보낼지는 매우 중요하다. 

간단하게는 geographically closest, 위치가 가장 가까운 cluster로 보낼 수 있겠지만, 가장 가깝다고 해서 항상 좋은 것만은 아니다.

거치는 communication links나 router 수가 다를 수도 있기 때문에, 이러한 점을 고려하여 client를 보내야 한다.

또 다른 방식으로는, current traffic condition을 고려하는 방법이다. CDN이 주기적으로 real-time measurements of delay and loss performance를 계산하여 가장 좋은 곳으로 client를 보내주는 방법이다.




### 2.7 Socket Programming: Creating Network Applications

요 파트는 사실 파이썬을 이용하여, TCP, UDP 통신을 하는 방법을 소개한다.

UDP는 바로 통신이 가능하지만, TCP는 connection 하는 과정을 포함한다 정도만 알고 있으면 될 듯하다.


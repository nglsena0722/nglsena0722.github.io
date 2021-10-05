---
date: 2021-10-04
author_profile: true
categories:
  - network
title: "Application Layer 6"
---

## Chapter 2. Application Layer

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


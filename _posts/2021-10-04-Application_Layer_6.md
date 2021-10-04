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

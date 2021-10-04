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



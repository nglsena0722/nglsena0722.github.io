---
date: 2021-09-28
author_profile: true
categories:
  - network
title: "Application Layer 2"
---

## Chapter 2. Application Layer

### 2.1 principles of Network Applications

#### 2.1.2 Processes Communicating

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









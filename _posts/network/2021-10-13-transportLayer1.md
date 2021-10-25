---
date: 2021-10-13
author_profile: true
categories:
  - network
title: "Transport Layer 1"
---

## Chapter 3. Transport Layer

### 3.1 Introduction and Transport-Layer Services

Transport Layer protocol은 host 내 application process들 간 logical communication을 제공한다. Logical communication이란, application 관점에서 host 내 process들이 직접적으로 서로 연결되어 있는 것처럼 보이게 하는 것이다. 물론 실제로는 아랫단에서 수많은 routers, link들을 통해 연결된다. 이를 통해, application process는 아랫단의 `details of the physical infrastructure`을 생각하지 않아도 된다.

transport-layer protocol은 end systems에서만 시행되고, network router 단에서는 시행되지 않는다.

Transport layer는 application-layer가 보낸 messages를 transport-layer packet(segments)로 바꾼다. 이때, application messages를 smaller chunks로 쪼개고, 각 chunk에 transport-layer header를 추가해서 transport-layer segments를 만든다.

이후 segment를 network layer에 보내면, network layer는 segment를 encapsulate하여 network-layer packet(datagram)을 만들어 목적지로 전송한다.

network routers는 datagram 영역에서 행동하기 때문에, transport-layer segment을 확인할 수 없다. 

이후 받는 쪽 network layer가 datagram으로부터 transport-layer segment를 추출하여 transport layer로 전달하고, transport layer가 segment를 처리한다.



#### 3.1.1 Relation Between Transport and Network Layers

transport layer protocol은 host 내 process들 간 logical communication을 제공하고, network-layer protocol은 hosts 간 logical communication을 제공한다.

Transport Layer protocol은 network-layer protocol의 모델에 따라, 서비스가 제약될 수 있다. 예를 들어, network layer가 transport layer를 위해  delay나 bandwidth를 보장해주지 않는다면, transport layer에서도 application을 위해 보장할 수 없다.

그럼에도, 아랫단이 제공해주지 않는 서비스라도 transport protocol이 제공해줄 수 있는 서비스가 있다. Network layer가 unreliable이더라도, transport protocl에서 reliable data transfer service를 제공할 수 있다. 또 다른 예시로, 아랫단이 보장해주지 않아도, transport layer가 encryption을 사용할 수도 있다.

#### 3.1.2 Overview of the Transport Layer in the Internet

UDP (User Datagram Protocol) : Unreliable, connectionless

TCP (Transmission Control Protocol) : reliable, connection-oriented service

이 책에서, UDP든 TCP든, transport layer 단의 packet은 segment라 하고, network layer 단의 packet은 datagram이라 생각한다.


Internet's network-layer protocol은 IP(Internet Protocol)이라는 이름을 가진다. 각 host들은 IP address를 가지고 있다. IP는 hosts들 간 logical communication을 제공한다. 

IP service model은 best-effor delivery service를 제공한다. 쉽게 말해, IP는 hosts들 간 연결을 위해 "best effort"를 하지만, "보장"하지는 않는다. Segment delivery, orderly delivery, integrity of data 모두 보장해주지 않는다. 때문에, IP는 unreliable service이다.

UDP, TCP의 중요한 기능으로는, transport-layer multiplexing and demultiplexing이 있다. 이는, host-to-host delivery를 process-to-process delivery로 확장(Extending)하는 것이다.

또, UDP와 TCP는 segments' headers에 있는 error-detection fields를 이용하여 integrity checking을 제공한다.

UDP는 최소 Process-to-Process data delivery, Error checking 요 두가지 기능을 제공할 수 있다.

반면 TCP는 추가적인 기능을 제공한다. Flow Control, Sequence numbers, acknowledgements, timers 등을 이용하여 TCP는 data가 correctly, in order하게 도착했다는 것을 보장한다. 즉, reliable data transfer를 제공한다. 

또한, Congestion Control도 제공한다. traffic으로부터 routers나 link들이 swaping되지 않게, link bandwidth의 equal share를 제공한다. TCP는 보내는 rate를 조절(regulate)하여 congestion control을 진행하지만, UDP는 unregulated이다. 


### 3.2 Multiplexing and Demultiplexing

Transport layer는 network layer로부터 받은 segment들에서, Data를 적절한 application process에 전달해주어야 한다.

Transport layer는 직접적으로 process에 data를 전달하지 않고, socket을 통해 전달한다. 각 socket은 unique한 identifier가 존재한다.

Transport layer segment에는, receiving socket을 identify하기 위한 field가 존재한다. Transport layer가 이를 보고, correct socket에 data를 전달하게 되고, 이 과정을 demultiplexing이라 한다.

host 내 여러 socket들로부터 data chunk를 모아, header information을 넣어주어 segment를 만들어주고, network layer에 전달하는 과정은 multiplexing이다.


이런 multiplexing을 위해 필요한 것은, unique identifers를 가진 socket, 어느 socket으로 전달되어야 할지를 알려주는 special fields를 가진 segment이다. 요 영역을 source port number field, destination port number field 이다. 여기서 source는 보내는 곳을 의미한다. 각 port number는 16 bit 수(0~65535)이고, 0~1023 수는 well-known port numbers로 잘 알려진 application protocols를 위한 수이다.

UDP에서는 destination IP address, destination port number로 구성된 two-tuple로 UDP socket을 식별할 수 있다. 만약 다른 source로부터 온 UDP segments들이 destination IP address, destination port number가 같다면, 모두 같은 destination socket으로 segments들이 들어온다.

이때, Source port number는 segment를 받은 쪽에서, 다시 보낸 쪽으로 segment를 보낼 때 이용하게 된다.

TCP에선 different source IP address나 source port numbers가 다르면, 모두 다른 socket으로 이동하게 된다. 즉, source port number, IP address of the source host, destination port number, its own IP address 총 네 가지로 segment demultiplexing을 담당한다.

Persistent HTTP에선, HTTP messages 교환을 같은 server socket으로 한다. 그러나 non-persistent HTTP에서는 TCP connection을 계속 새로 해줘야 해서, 각 connection마다 new socekt을 create,close 해줘야 하기 때문에 performance에 영향을 끼친다.

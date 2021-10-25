---
date: 2021-10-25
author_profile: true
categories:
  - network
title: "Transport Layer 2"
---

## Chapter 3. Transport Layer

### 3.3 Connectionless Transport : UDP

아주 단순하게 transport protocol을 보면, sending side에서는 application process에서 messages를 받아 network layer에 전달하고, receiving side에서는 network layer에서 application process로 전달하는 역할을 한다. 

그러나 transport layer는 multiplexing/demultiplexing 역할도 해주어야 한다.

UDP는, IP에서 Multiplexing/demultiplexing 기능과 간단한 error checking 기능 정도만 추가되었을 뿐이다.

UDP에서, application process로부터 messages를 받으면, source and destination port number fields, two other small fields만 추가하고, 결과 segment를 network layer에 넘긴다.

UDP는 sending, receving 과정에서 handshaking이 없고, connectionless로 불린다.


DNS는 UDP를 사용하는 대표적인 application layer protocol이다. DNS application이 query를 만들어서, UDP에 전달하면, header를 추가해서 network layer에 전달하게 된다.

이후, network layer는 datagram을 name server에 전달하게 되고, reply를 기다린다.

reply가 오지 않으면, query를 다른 name server에 보내보거나, reply를 받을 수 없다고 application에 전달한다.


그렇다면, 언제 TCP보다 UDP를 더 선호하게 될까?

1. Finer application-level control over what data is sent, and when. : UDP에서는, application process가 data를 전달하자마자, 거의 바로 network layer에 전달한다. TCP는 반면 congestion control에 시간이 걸리고, reliable data transfer을 위한 acknowledge 과정에서도 delay가 발생한다. Real-time application은 data loss에 tolerate하고, sending rate를 줄이는 것을 요구하므로 TCP보다는 UDP를 선호한다.

2. No connection establishment : connection establishment에서 delay가 발생하지 않는다. 

3. No connection state : UDP는 connection state를 유지하지 않으므로, congestion-control parameter나 sequence, acknowledgment number parameter 등을 track하지 않아도 된다. 

4. Small packet header overhead : TCP는 header로 20 bytes가 필요하지만, UDP는 8 bytes 정도가 필요하다.



Network management application은 network가 stressed state 상태에서 동작할 때 실행되기 때문에, congestion-controlled data transfer인 TCP보다는 UDP를 사용한다. 

현대 사회에서 multimedia application에서 UDP를 사용하는 것은 논란의 여지가 있다. UDP는 congestion control을 하지 않기 때문에, 많은 application들이 한꺼번에 UDP packet을 보내면, 아주 일부 packet만 목적지에 도달할 수 있을 것이다. 또한 Congestion Control 기능이 있는 TCP는 rates가 매우 낮아질 것이다. 


###### 3.3.1 UDP Segment Structure

Data field는 application data가 차지한다. 예를 들어, DNS에서 data field는 query message, response message를 포함한다.

UDP header는 네 영역으로 나뉘는데, 각각이 2 bytes씩 차지한다. Source Port Number, Destination Port Number, Segment의 총 길이(header + data)를 나타낸 Length Field, Error detection을 위한 checksum이 UDP header를 구성한다.


###### 3.3.2 UDP checksum

UDP segment가 source로부터 destination까지 가는 동안, 변하지 않았는지를 알기 위해 checksum이 사용된다.

UDP checksum은 1의 보수를 이용하는데, 예를 들어 보내는 words의 이진수 합이 1010이면, 이 값의 1의 보수는 0101이다. 0101이 checksum 값이 된다. 따라서, 보낸 words의 이진수 합 + checksum 값 결과는 1111이다. 만약 이 중 하나라도 0이면, error가 발생했다는 것이다.



Link layer protocols들도 checksum을 진행하는데, 왜 UDP도 checksum을 진행해야 할까? 

먼저, link-layer protocol이 항상 error checking을 한다고 보장할 수 없다. 이를 안하는 layer도 있다. 또한, link끼리 이동할 때도 bit errors가 발생할 수 있다.

따라서 UDP는 end-end basis에 error detection을 해야 한다. (아마 보내는 끝단, 받는 끝단에서 확인하는 과정을 보고 end-end basis로 표현한듯) 이를 end-end principle이라고 부른다.

UDP는 error detection을 하지만, error를 recover해주지는 않는다. 


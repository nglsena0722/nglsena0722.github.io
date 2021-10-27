---
date: 2021-10-27
author_profile: true
categories:
  - network
title: "Transport Layer 4"
---

## Chapter 3. Transport Layer

### 3.4 Principles of Reliable Data Transfer

#### 3.4.2 Pipelined Reliable Data Transfer Protocols

rdt3.0의 문제점은 stop-and-wait protocol이라는 점이다. Sender가 packet을 보내는 실제 시간은 0.008 msec이고, packet이 sender로부터 receiver를 거쳐, 다시 ACK가 오는 데까지 걸리는 RTT는 30 msec이라고 하자.

그럼 Sender는 packet을 보내는 동안 0.008/30.008 = 0.00027만큼 일한 것이다. 또한, 실제로 sender는 30.008 msec 동안 0.008 msec만큼 보낼수 있는 data량을 보냈다. 

이러한 문제의 해결책은, stop-and-wait 방식이 아니라, sender가 ACK을 기다리지 않고, 계속 packet을 보내는 것이다. 이를 `Pipelining`이라고 부른다.

Reliable data transfer protocols에서 `Pipelining`은 아래와 같은 결과를 가져온다.

1. sequence number는 계속 증가하고, packet은 모두 각자 unique한 sequnce number를 갖는다.

2. Sender와 Receiver 측에는 packet buffer가 필요하다. 최소 Sender 측에는, Ack이 아직 도착하지 않은 packet을 위한 buffer를 가지고 있어야 한다. Receiver 측에서도 마찬가지.

3. Sequence number의 범위와 buffering 요구 사항은 data transfer protocol 방식이 어떻게 lost, error 난 packet에 대응하는지에 따라 다르다. 이러한 방식들의 종류로는, Go-Back-N 과 Selective repeat가 있다. 

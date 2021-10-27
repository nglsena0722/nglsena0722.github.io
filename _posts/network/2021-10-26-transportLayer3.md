---
date: 2021-10-26
author_profile: true
categories:
  - network
title: "Transport Layer 3"
---

## Chapter 3. Transport Layer

### 3.4 Principles of Reliable Data Transfer

Sending side에서 rdt_send() 요청을 하면, upper layer로 받은 data를 receiving side로 전달한다. (rdt는 reliable data transfer, udt는 unreliable data transfer)

receiving side에서는 rdt_rcv()로 data를 받고, deliver_data() 요청으로 상위 layer에 data를 전달한다.

이 section에서는, unidirectional data transfer, 즉 sending side에서 receiving side로만 data가 전달되는 상황만 다룬다.



#### 3.4.1 Building a Reliable Data Transfer Protocol

###### rdt1.0

가장 간단한 case, rdt1.0부터 알아보자. 이는 아래 channel들이 완벽하게 reliable하다고 가정한 상황이다.

FSM(Finite-state machine)은 rdt1.0에서 sender, receiver 측의 동작을 정의한다. Sender, Receiver 각각 하는 동작이 다르다.

Event는 동작이 일어나기 위한 조건이고, event가 발생하면 action을 취한다.

Sending Side에서, rdt_send(data) event가 upper layer로부터 발생하면, 패킷을 만들어 패킷을 channel로 보낸다.

Receiving side에서, rdt는 rdt_rcv event로부터 아랫단 channel로부터 packet을 받는다. 이후, 패킷을 제거하고 data를 upper layer로 보내게 된다.

rdt1.0 protocol에서는, receiver side에서 sender side로 feedback을 줄 수 없기 때문에, sender가 data를 보내는 속도만큼 receiver가 data를 받는다고 가정하고 있다.



###### rdt2.0

rdt2.0에서는 packet 내 bit error가 발생할 수 있다고 가정한다. 또한, 우리가 packet을 보내는 순서대로 받는다는 가정은 계속 유지한다.

Reliable data transfer에서, Sender가 보낸 패킷을 Receiver가 제대로 받았는지 여부를 알아야 한다. 이를 위해, Positive acknowledgments(잘 받았다는 의미), Negative acknowledgements(다시 보내라는 의미) 두 protocol을 사용한다.

이런 retransmission을 바탕으로 한 reliable data transfer을 ARQ(Automatic Repeat reQuest) protocols라고 한다.


Bit errors가 있는지 여부를 알기 위해, ARQ protocols은 세 가지 추가적인 protocol 능력을 요구한다.

1. Error detection : receivier가 bit errors를 감지할 수 있어야 한다. 앞서 배운 UDP의 checksum과 같이, error detection을 위해 sender가 receiver에게 보낼 때 몇가지 bits를 추가해야 한다. 이러한 bit들이 rdt2.0 data packet의 checksum field에 포함되게 된다.

2. Receiver feedback : Receiver가 packet을 잘 받았다는 것을 Sender가 아는 방법은, Receiver가 보낸 feedback을 Sender가 받아야 하는 방법밖에 없다. Positive acknowledgment(ACK)과 Negative acknowledgment(NAK) 이 이러한 feedback의 예시이다. 원칙적으로, NAK은 0으로, ACK은 1로 나타낸다.

3. Retransmission : 받은 packet에서 error가 있으면, receiver는 다시 보낸다.

rdt2.0에서 FSM을 살펴보자. 먼저 sending side에서는 두 가지의 state가 존재한다. 초기 state에서, rdt_send(data) event가 발새앟면, sender가 data, checksum을 담은 packet을 만든다. 이후 udt_send(packet) 요청으로 아래 layer로 packet을 전달한다. 이후 나머지 state로 이동하는데, 이 state에서는 receiver로부터 온 ACK, NAK 신호를 기다린다. 

만약 ACK 패킷이 오면, sender는 최근에 보낸 packet이 잘 도착했다는 것을 알게 되고, 다시 초기 state로 이동하여 upper layer에서 data가 오기를 기다린다. NAK 패킷이 오면, 마지막에 보낸 packet을 다시 보내고, 다시 ACK, NAK이 오기를 기다리는 state가 된다.

중요한 것은, ACK, NAK를 기다리는 state가 되면, upper layer로부터 data를 받을 수 없게 된다(data를 받는 state가 아니기 때문). 이 때문에, rdt2.0은 stop-and-wait protocols로 불린다.

  
rdt2.0에서 Receiver-side는 여전히 state가 하나이다. Receiver가 packet을 받게 되면, packet에 error가 있는지 여부에 따라 ACK이나 NAK을 보낸다.



위에서 설명한 rdt2.0의 문제는 ACK, NAK packet 자체에도 error가 발생할 수 있다는 점이다. 이를 위해 ACK/NAK packet에 checksum bit를 추가해야 한다.

정말 어려운 점은, 실제로 packet 내에 error가 발생했다면, 어떻게 recover해야하는지이다. error가 발생하면, sender는 receiver가 제대로 packet을 받았는지 알 방법이 없다.

이를 해결하기 위해 다음과 같은 세 상황을 생각해볼 수 있다.

1. ACK/NAK packet error를 받으면, 다시 receiver에게 "뭐라고 보냈는지 묻는 것"이다. 하지만, receiver는 이것이 새 질문인지, 아니면 정말 마지막 요청에 대한 응답을 다시 보내라는 건지 인지할 방법이 없다.

2. sender가 ACK/NAK packet error를 감지할 수 있는 checksum을 추가하는 것이다.

3. error가 난 ACK/NAK를 받으면, sender가 data를 다시 보내는 것이다. 이것은 duplicate packets, 즉 중복된 패킷이다. 문제는, receiver는 ACK/NAK가 제대로 sender에게 도착했는지 모르는 상태이기 때문에, duplicate packets이 새로운 요청에 대한 응답을 바라는 건지, 아니면 이전에 보냈던 응답을 다시 해달라는 건지 알 방법이 없다(1과 비슷한 맥락인듯).


가장 간단한 해결책은, data packet에 새 field를 만들어서 sender가 packet에 대한 sequence number를 부여하는 것이다. Receiver는 이제 받은 packet이 retransmission을 원하는지 판단하기 위해, sequence number만 확인하면 된다. rdt2.0에서는 이 sequece number가 1 bit이면 된다. (새로 보내는 것인지, 아니면 다시 보내는 것인지) 

현재는 packet error는 있어도, packet lose는 없다고 가정한 상태이기 때문에, ACK/NAK에는 sequnce number가 필요 없다. Sender는 받게 되는 ACK/NAK이 가장 최근에 보낸 data packet에 대한 정보임을 알 수 있다. (packet lose가 없기 때문에)


###### rdt2.1, 2.2

Sender가 보낸 packet에 Sequence number를 추가한 버전이다. Sequence number 0, 1에 따라 State가 해야 하는 일이 두 가지로 나뉘기 때문에, Sender와 Receiver FSM state 수가 모두 2배로 늘어난다.

Receiver가 NAK 없이, ACK에 0, 1의 sequence number를 추가하여 sender에게 보내도록 만든 것은 rdt2.2이다.

sequence number 0, 1에 대해, 0은 정상 상태일 때 동작하고, 1은 retransmission을 보낼 때 numbering하는 걸로 생각했는데, 이게 아니라 0, 1 각 state 모두 정상 상태일 수 있고, error가 나면 반대 숫자가 되어 retransmission을 보내는 것으로 이해했다.

###### rdt3.0

이제는 bit error가 일어날 수도 있고, underlying channel이 packet을 잃을 수도 있다고 생각한다. protocol은 이제 packet loss를 감지하고, loss가 일어났을 때 어떻게 해야 하는지 다뤄야 한다.

만약 Receiver가 Sender에게 보낸 ACK message가 lost가 났을 때를 생각해보자. Sender는 Receiver에게 어떤 packet도 받을 수 없다. Sender는 packet을 충분한 시간 동안 기다리다가, loss가 되었음을 확신하면 그때 되서 다시 data packet을 보내면 된다.

그럼 충분한 시간, 즉 얼마만큼 기다려야 하는가? 최소 round-trip delay, packet 처리 과정, network 내 delay 등을 고려해야 하기 때문에, 이 시간을 정하는 건 매우 어려운 일이다.

시간을 길게 잡으면, protocol이 정상 동작하기까지 오랜 시간이 걸리게 되므로, sender 측에서 packet loss가 일어났다는 것을 보장하지 않더라도, 특정 time value를 현명하게 선택하는 방법으로 진행된다.

ACK가 정해진 시간 내에 오지 않으면, packet을 다시 보낸다. 물론 packet이 lost 되지 않아도, 시간이 오래 걸리게 되면 retransmission으로 인해 duplicate data packet이 될 수 있겠지만, 이러한 문제는 rdt2.2에서 충분히 다루었다.

이러한 메커니즘은 `countdown timer`가 필요하다. Sender는 timer를 시작하고, timer interrupt에 대해 반응해야 하며, timer를 멈춰야 하는, 동작들을 수행해야 한다.

packet sequence number가 0, 1로 계속 바뀌기 때문에, rdt3.0은 `alternating-bit protocol`로 불리기도 한다.



지금까지 data transfer protocol의 중요 요소에 대해 알아보았다. Checksums(bit error 탐지를 위해), sequence numbers(packet error에 대한 재요청을 구분하기 위해), timers(packet loss에 대응하기 위해), positive and negative acknowledgment packets 등은 protocol에서 중요한 역할을 했다.

[rdt2.1, 2.2](https://donghoson.tistory.com/47), [3.0](https://m.blog.naver.com/PostView.naver?blogId=ydg0620&logNo=220244915317&targetKeyword=&targetRecommendationCode=1) 이해를 위해 여러 블로그들을 참고하였다. 공부에 큰 도움이 되었다.

---
date: 2021-09-30
author_profile: true
categories:
  - network
title: "Application Layer 5"
---

## Chapter 2. Application Layer

### 2.2 The Web and HTTP

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



#### 2.3 Electronic Mail in the Internet

Internet mail system은 세 가지 components를 가진다.

1. User agents : Microsoft Outlook이나 Applie Mail과 같이, 사용자가 read, forward, save 등을 할 수 있음. mail server로 message를 보내는 역할까지 함.

2. Mail servers : Mail box 역할, message queue가 있다.

3. Simple Mail Transfer Protocol(SMTP) : TCP connection을 한다.

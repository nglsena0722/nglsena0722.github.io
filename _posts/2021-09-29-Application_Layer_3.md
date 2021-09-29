---
date: 2021-09-29
author_profile: true
categories:
  - network
title: "Application Layer 3"
---

## Chapter 2. Application Layer

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



#### 2.2.2 Non-Persistent and Persistent Connections 

---
date: 2021-09-27
author_profile: true
categories:
  - network
title: "Application Layer 1"
---
우리 학교 컴퓨터네트워크 과목 교재인 Computer Networking_A Top Down Approach 를 공부하면서 정리했던 것을 블로그에 올리려고 한다.

## Chapter 2. Application Layer

### 2.1 principles of Network Applications

각기 다른 end systems에서 program들이 돌아가고 있고, 이를 통해 우리는 네트워크 통신이 가능함.

#### 2.1.1 Network Application Architectures
Network architecture과 Application architecture를 구분해야 한다. 

Network architecture는 이전에 배운 다섯 가지의 Layer(Application, Transport, Network, Link, Physical)를 말한다.

Application architecture은 크게 두 가지로 나눌 수 있다. 

1. the client-server architecture

2. the peer-to-peer(P2P) architecture


###### Client-Server Architecture 

1. Always-on host인 server가 존재한다. Clients는 server로 request를 보내고, response를 받을 수 있다.

2. Clients끼리는 서로 communicate 하지 않는다.

3. 서버는 fixed, well-known address(IP 주소)를 가진다.

4. Client-Server Application에서 서버가 하나면, 수많은 request를 처리하기 힘들다. 따라서 수많은 서버를 가지고 있는 Data Center를 고용한다. Service Providers는 Data Center에 값을 지불하게 된다.

5. Client-Server Application 예시로 Web, FTP, Telnet, E-mail 등이 있다.

###### P2P Architecture

1. Data Center를 이용하지 않고, 대신 pairs of connected hosts(Peers) 간 communication을 이용한다..

2. Self-scalability, 즉 requesting files에서 발생하는 workload를 peers끼리 분담하는 특성을 지닌다.

3. 특별한 Server 인프라가 필요하지 않기 때문에, Cost Effective 하다.

4. Decentralized Structure이기 때문에 Security, Performance, Reliability 문제가 있다. 

5. 수업 때 들은 것으론, 저작권 문제도 있다.

Client-Server Architecture, P2P Architecture 모두 사용할 수도 있다. (Hybrid Architecture)



#### 2.1.2 Processes Communicating

Process들이 같은 end system에서 동작하고 있으면, Operating System을 통해 서로 communicate가 가능하다. 

그러나 이 책에선 Different hosts에서 어떻게 process들이 서로 communicate하는지 설명해준다. 

각 Process들은 서로 network를 통해 message를 주고 받으며 Communicate한다.


###### Client, Server 정의

아래는 책에 나온 정의 그대로를 작성해보았다.

> In the context of a communication session between a pair of processes, the process that initiates the communication (that is, initially contacts the other process at the beginning of the session) is labeled as the client. The process that waits to be contacted to begin the session is the server.

쉽게 얘기하자면, client는 communication을 시작하는 process이고, server는 communication이 되기를 기다리는 process이다.


###### Socket

Application0 Layer와 Transport Layer 간 interface(=API)가 `Socket`이다. 책에서는 Application Layer를 집, socket을 문으로 비유했다.

Application Developer는 Application Layer side의 socket control은 모두 지니고 있지만, Transport Layer side의 socket control은 일부만 가지고 있다.

Transport Layer side에서 가질 수 있는 socket control은 아래와 같다.

1. the choice of transport protocol

2. the ability to fix a few transport Layer parameter



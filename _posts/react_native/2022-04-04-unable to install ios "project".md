---
date: 2022-04-04
author_profile: true
categories:
  - react_native
title: "unable to install ios project"
---

맥북에서 시뮬레이터가 아니라, ios device에 직접 설치해서 테스트해보려다가 다음과 같은 오류가 떴다.

```unable to install ios "project"```

디테일을 확인해보니 아래와 같은 에러가 발견되었다.

```A valid provisioning profile for this executable was not found.```

안드로이드는 그냥 연결해서 Run하면 바로 설치되었는데, iOS는 안되서 답답했다.

구글링해도 잘 안나와서 기록했다.




해결은 다음과 같이 했디.

[애플 개발자 페이지](https://developer.apple.com/account/resources/devices/list) - device에서 내 기기를 등록했어야 했다.

이때 UDID는 xcode - window - devices and simulators - identifier에서 확인할 수 있다.

그리고 provisioning file 을 또 만들어야 한다. 이때 `iOS App Development`로 등록해야 한다.

그리고 xcode에서 새 프로비저닝 파일을 등록하고, 실행하면 된다.



만약 프로비저닝 파일 등록에서 오류가 생긴다면, Build Setting - Signing - Code Signing Identity 에서 파일을 distribution 이 아니라, development 파일로 바꿔주면 되었다.

끝.
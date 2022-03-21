---
date: 2022-03-21
author_profile: true
categories:
  - react_native
title: "ios Signing 오류 해결"
---

맥북에서 app store 출실흘 위해 xcode에서 작업하다가 다음과 같은 오류가 떴다.

```No signing certificate “iOS Distribution” found```

계속 건드려 보다가 아래와 같은 에러도 발견했다.

```provisioning profile doesn't include signing certificate```

provisioning profile이랑 certificate도 재발급 받아봤지만 소용 없었다.



해결은 xcode 내 Build Settings > Signing 에서 해결했다.

여기서 Code Signing Identity를 적절한 파일로 변경해주고, provisioning profile도 재설정해주니 Archive 할 수 있었다.
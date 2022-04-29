---
date: 2022-04-24
author_profile: true
categories:
  - react_native
title: "onesentence 개발일지"
---

안드로이드, 앱스토어에 "매일 한 줄" 앱 출시.

1. 깃헙 파기 
완료

2. 안드로이드, ios 앱 설정
완료

3. admob 설정
파이어베이스에 앱 등록
sha-1 키 : https://stackoverflow.com/questions/54868611/how-to-get-sha-1-key-in-react-native-cli 3번 방법으로 해결.
파이어베이스가 하라는대로 sdk나 플러그인 추가하면 된다.
그리고 [이 블로그](https://success206.tistory.com/158)에 나온대로 firebase.json 파일을 추가해주어야 함.

```
{
  "react-native": {
    "admob_android_app_id": "ca-app-pub-~~x",
    "admob_ios_app_id": "ca-app-pub-~~"
  }
}
```

요렇게 추가해주면 android는 된다.
ios도 위 블로그에 나온 방식대로 진행했다.
그리고 테스트 코드로 마무리.
```
import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

function App() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
```

~ios 파이어베이스 설정할 때, 꼭 appdelegate.mm에서 firebase.h를 상단에 import하자. ~
아래 블로그를 참고할 것.
https://velog.io/@bk87/iOS-Firebase-Remote-Config-Realtime-DataBase-%EC%A0%81%EC%9A%A9

<!-- iDFA 허용 여부 - https://gigas-blog.tistory.com/264
IDFA 기기 허용 설정 - https://velog.io/@minji0801/AdMob-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B8%B0%EA%B8%B0-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0 -->

[파이어베이스 admob 추가 공식문서](https://firebase.google.com/docs/admob/ios/quick-start?hl=ko)
[리액트파이어베이스](https://rnfirebase.io/)
[기타 설정](https://rnfirebase.io/install-ios)

차분히 따라하면 된다!

안드로이드는 가끔 배너가 안보일 때도 있는데, 당황하지 말고 기다리거나, 그냥 지웠다가 다시 써보면 생기더라.

3.5 admob SKAdNetwork 설정하기 - [참고블로그](https://docko.tistory.com/entry/React-Native-%EC%95%A0%EB%93%9C%EB%AA%B9AdMob-iOS-14-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

4. 다크모드 설정
기존 TGD에서는 다크모드가 안되도록 설정했지만, 이번에는 다크모드와 일반모드 각각 따로 설정하여 앱을 제작해보도록 했다.

사실 리액트네이티브 처음 설치하면 App.js 자체에 다크모드가 적용되어있다.

그래서 그냥 요 상태 그대로 작업할거라서 별도로 다크모드 설정은 안해도 될 듯하다.

5. 앱 디자인 관련 pdf 보고, 폰트 결정
매일 한 줄 앱은 간단한 거라서, 디자인 관련 볼 것도 없을 것 같다. 폰트도. 

그냥 App.js 기본 설정되어 있는대로 가보자.

6. 다크모드 고려하고 앱 프론트엔드 꾸미기
노트에 그렸던대로 프론트엔드 작업하기.

6-1. ios 노치 고려하기 - 원래 crestock 프로젝트할 때 했던 스타일 가져오려 했는데, 리액트 시작할 때 만들어진 형태를 이용하니 해결.




- 뒤로가기 두번누를 때 종료 고려하기 : [리액트네이티브 페이지 참고](https://reactnative.dev/docs/backhandler)
- 공유하기 : [블로그](https://c-u-f.tistory.com/22) 참고
https://github.com/millo-L/react-native-kakao-share-link#readme
공유하기 기능은 귀찮아서 그냥 클립보드 복사 기능으로 대체했다.

7. api 연결하기 & async storage 연결하기
api 연결 목록 : 
 푸쉬알림 온오프
 푸쉬알림 시간설정
 (async에 토큰, onoff 여부, 시간설정 요거 세개 저장해놓으면 되겠다. 아니면 useEffect 이용하든지.)
 (완)삭제요청하기 -> idx 전달하기
 (완)좋아요 -> async에 저장된 오늘 좋아요 기록 봐야함.
 추가하기 -> async에 저장된 token 같이 보내야함

 async 해서 하루에 한 개만 좋아요 가능하도록 만들기.


8. 매일 일정시간에 푸시보내는 nodejs 코드
9. 푸시알림 예쁘게 꾸미기, 푸시알림 시간대 정하게 하기
10. 앱 이름 세팅, 앱 로고 디자인하기
11. 출시하기
- 릴리즈모드 https 최종 검사해야함. / 다음 [블로그](https://thrillfighter.tistory.com/717) 참고
12. 사진 같은 건 어디서 만들지?.. ㅎ;




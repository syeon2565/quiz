# Quiz Web

요구사항 (require)

- 사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.
- 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
- 사용자는 답안을 선택하여 다음과 같은 항목을 볼 수 있다.
  - 답안 선택 후 다음 문항 버튼을 볼 수 있다.
  - 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  - 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
- 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  - 퀴즈를 마칠 때까지 소요 시간
  - 정답 개수
  - 오답 수

요구사항 (optional)

- 정 오답에 대한 비율을 차트로 표기
- 다시 풀기
- 오답 노트

## TECH STACK

```shell
언어 및 프레임워크
TypeScript, Next.js

스타일링
storybook
@stitches/react

데이터 상태관리
zustand (client)
ReactQuery (server)

테스트
jest, testing-library/react
```

### 백엔드 API

구현에 사용할 퀴즈에 대한 API는 env파일에 주소 기입이 필요합니다.

```shell
NEXT_PUBLIC_BASE_URL = 주소
```

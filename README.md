# vue => react

- notion 워크스페이스 만들기를 vue 에서 react로...

## 환경 설정

### "react": "^17.0.2"

> react는 사용자 인터페이스를 생성하기 위한 라이브러리
> react 구성에 필요한 기능만 포함
> 일반적으로 react-dom, react-native등이 추가로 요구됨

```js
import React from "react";
```

### "react-dom": "^17.0.2"

> react용 DOM 및 서버 렌더러의 진입점 역할

```js
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));
```

### "react-scripts": "4.0.3"

> react-scripts is a set of scripts from the "create-react-app starter pack"
> cra로 생성하면 기본 설정되어지는 부분

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

### "react-router-dom": "^5.3.0"

> 웹 어플리케이션에서 React Router 를 사용하기 위한 바인딩이 포함
> SPA의 동작을 가능하게 해준다

```js
// v6
import { BrowserRouter, Routes, Route } from "react-router-dom";
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>

// v5
  //Routes === Switch
<Switch>
  <Route path="/">
    <App />
  </Route>
</Switch>;
```

### "redux": "^4.1.2"

> State를 따로 관리하여 계층에 상관없이 필요한 컴포넌트에서 사용 가능
> 변경된 내용이 다른 컴포넌트에도 영향을 줌
> component => action(dispatch) => (handle) => reducer(update)
> subscribe 상태라 component에 반영됨

### "react-redux": "^7.2.6"

> react-redux는 react의 코드 구조를 지키며 redux를 보다 편하게 사용하기 위함

```js
import { Provider } from "react-redux";
import { connect } from "react-redux";
// mapStateToProps, mapDispatchToProps
```

### "@reduxjs/toolkit": "^1.6.2"

> 효율적인 redux 사용을 위한 **공식** 툴킷
> 보다 간단하고 명료한 작성을 가능하게 한다

### "redux-devtools-extension": "^2.13.9" -D

> redux 동작을 편하게 모니터 할 수 있는 여러 툴을 제공

### "connected-react-router": "^6.9.1"

> 단방향 흐름을 통해 리덕스에서 router상태를 동기화 (history객체 -> store-> router-> component)
> 라우팅과 관련된 정보들을 Redux의 store에 저장 해야 할 경우 사용
> Dispatching of history methods (push, replace, go, goBack, goForward)
> works for both redux-thunk and redux-saga.

```js
import { ConnectedRouter } from "connected-react-router";

<Provider store={store}>
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </ConnectedRouter>
</Provider>;
```

### "history": "^4.10.1"

> JavaScript가 실행되는 모든 곳에서 세션 히스토리를 쉽게 관리할 수 있다

## middleware란?

> action => (middleware) => dispatch => reducer
> dispatch 전에 추가 작업을 처리 (logger, 권한, 로그인 검증)

### "redux-logger": "^3.0.6" -D

> dispatch 수행 시 항상 로그를 남긴다

### "redux-thunk": "^2.4.1"

> redux 사용 시 비동기 작업을 처리할 때 사용됨
> 참고 - saga도 많이 사용됨
> action 객체가 아닌 함수를 dispatch 할 수 있음

```js
// id 와
export const getPost = (postId) => (dispatch) => {
  // dispatch, getState로 하면 현재 상태 조회도 가능

  // 요청을 시작
  // reducer에 바로 들어감
  dispatch({ type: GET_REQUEST });

  return getApi(postId)
    .then((res) => {
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FAILURE,
        payload: error,
      });
      throw error;
    });
};
```

import Alert from './Alert';

function App() {
  return (
    <div>
      <Alert level="info">
        안내 메시지 예시입니다.
      </Alert>
      <Alert level="warn">
        경고 메시지 예시입니다.
      </Alert>
    </div>
  );
}

export default App;

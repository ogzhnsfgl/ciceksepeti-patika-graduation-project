import { ToastContainer } from 'react-toastify';
import Routes from 'routes/index';

function App() {
  return (
    <div className="App">
      {Routes}
      <ToastContainer
        autoClose={4000}
        theme="colored"
        className="toastify"
        hideProgressBar
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;

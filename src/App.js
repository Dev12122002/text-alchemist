// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Summary from "./pages/Summary";
import QA from "./pages/QA";
import Text2Image from "./pages/Text2image";
import Img2QA from './pages/Img2QA';
import Navbar from './component/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Toaster
          position='top-center'
          toastOptions={{
            className: 'mt-5',
            style: {
              // border: '1px solid #713200',
              padding: '13px',
              color: '#713200',
              width: 'auto!important'
            },
          }}
        />
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/QA" element={<QA />} />
          <Route path="/text2img" element={<Text2Image />} />
          <Route path="/img2qa" element={<Img2QA />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;
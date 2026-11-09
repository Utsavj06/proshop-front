import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";
import Chatbot from  "./components/Chatbot/Chatbot"

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Chatbot />
      <ToastContainer />
    </>
  );
}

export default App;

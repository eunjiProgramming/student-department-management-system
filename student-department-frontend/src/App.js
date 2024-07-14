import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListStudent from './components/ListStudent/ListStudent';
import ListDepartment from './components/ListDepartment/ListDepartment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element={<ListStudent />}></Route>
          {/* http://localhost:3000/students */}
          <Route path='/students' element={<ListStudent />}></Route>
          {/* http://localhost:3000/departments */}
          <Route path='/departments' element={<ListDepartment />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListStudent from './components/ListStudent/ListStudent';
import ListDepartment from './components/ListDepartment/ListDepartment';
import StudentComponent from './components/StudentComponent/StudentComponent';
import DepartmentComponent from './components/DepartmentComponent/DepartmentComponent';

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
          {/* http://localhost:3000/add-student */}
          <Route path='/add-student' element={<StudentComponent />}></Route>
          {/* http://localhost:3000/edit-student/1 */}
          <Route
            path='/edit-student/:id'
            element={<StudentComponent />}
          ></Route>

          {/* // http://localhost:3000/add-department */}
          <Route
            path='/add-department'
            element={<DepartmentComponent />}
          ></Route>

          <Route
            path='/edit-department/:id'
            element={<DepartmentComponent />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

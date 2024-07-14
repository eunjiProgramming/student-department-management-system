import React, { useEffect, useState } from 'react';
import { listStudents, deleteStudent } from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import './ListStudent.css';

const ListStudentComponent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('학생 목록을 가져오는 중 오류 발생:', error);
      });
  };

  const addNewStudent = () => {
    navigate('/add-student');
  };

  const updateStudent = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const removeStudent = (id) => {
    deleteStudent(id)
      .then((response) => {
        fetchStudents();
      })
      .catch((error) => {
        console.error('학생을 삭제하는 중 오류 발생:', error);
      });
  };

  return (
    <div className='wrapper'>
      <h2 className='student-title'>학생 목록</h2>
      <button className='add-btn btn btn-primary' onClick={addNewStudent}>
        학생 추가
      </button>
      <div className='table-wrapper'>
        <table className='content-table'>
          <thead>
            <tr>
              <th>학생 ID</th>
              <th>학생 성</th>
              <th>학생 이름</th>
              <th>학생 이메일</th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.lastName}</td>
                  <td>{student.firstName}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => updateStudent(student.id)}
                    >
                      수정
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeStudent(student.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5'>학생 목록이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudentComponent;

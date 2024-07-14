import React, { useEffect, useState } from 'react';
import {
  getAllDepartments,
  deleteDepartment,
} from '../../services/DepartmentService';
import { useNavigate } from 'react-router-dom';
import './ListDepartment.css';

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('학과 목록을 가져오는 중 오류 발생:', error);
      });
  };

  const addNewDepartment = () => {
    navigate('/add-department');
  };

  const updateDepartment = (id) => {
    navigate(`/edit-department/${id}`);
  };

  const removeDepartment = (id) => {
    deleteDepartment(id)
      .then((response) => {
        fetchDepartments();
      })
      .catch((error) => {
        console.error('학과를 삭제하는 중 오류 발생:', error);
      });
  };

  return (
    <div className='wrapper'>
      <h2 className='department-title'>학과 목록</h2>
      <button className='add-btn btn btn-primary' onClick={addNewDepartment}>
        학과 추가
      </button>
      <div className='table-wrapper'>
        <table className='content-table'>
          <thead>
            <tr>
              <th>학과 ID</th>
              <th>학과 이름</th>
              <th>학과 설명</th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.departmentDescription}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => updateDepartment(department.id)}
                    >
                      수정
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeDepartment(department.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4'>학과 목록이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDepartment;

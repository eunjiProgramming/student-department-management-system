import React, { useEffect, useState } from 'react';
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from '../../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';
import './DepartmentComponent.css';

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();
    const department = { departmentName, departmentDescription };
    console.log(department);

    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigate('/departments');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createDepartment(department)
        .then((response) => {
          console.log(response.data);
          navigate('/departments');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const cancel = () => {
    navigate('/departments');
  };

  const pageTitle = () => {
    return id ? (
      <h2 className='title'>학과 수정</h2>
    ) : (
      <h2 className='title'>학과 추가</h2>
    );
  };

  return (
    <div className='wrapper'>
      {pageTitle()}
      <div className='form-container'>
        <form>
          <div className='form-group'>
            <label>학과 이름:</label>
            <input
              type='text'
              name='departmentName'
              placeholder='학과 이름 입력'
              value={departmentName}
              className='input'
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>학과 설명:</label>
            <input
              type='text'
              name='departmentDescription'
              placeholder='학과 설명 입력'
              value={departmentDescription}
              className='input'
              onChange={(e) => setDepartmentDescription(e.target.value)}
            />
          </div>
          <button className='btn' onClick={saveOrUpdateDepartment}>
            제출
          </button>
          <button className='btn cancel-btn' onClick={cancel}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentComponent;

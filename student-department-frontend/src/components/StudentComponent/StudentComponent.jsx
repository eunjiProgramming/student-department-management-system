import React, { useState, useEffect } from 'react';
import {
  createStudent,
  getStudent,
  updateStudent,
} from '../../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../../services/DepartmentService';
import './StudentComponent.css';

const StudentComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {
      getStudent(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveOrUpdateStudent = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const student = { firstName, lastName, email, departmentId };
      console.log(student);

      if (id) {
        updateStudent(id, student)
          .then((response) => {
            console.log(response.data);
            navigate('/students');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createStudent(student)
          .then((response) => {
            console.log(response.data);
            navigate('/students');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = '이름은 필수 항목입니다.';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = '성은 필수 항목입니다.';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = '이메일은 필수 항목입니다.';
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = '';
    } else {
      errorsCopy.department = '학과를 선택하세요.';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    return id ? (
      <h2 className='title'>학생 수정</h2>
    ) : (
      <h2 className='title'>학생 추가</h2>
    );
  };

  const cancel = () => {
    navigate('/students');
  };

  return (
    <div className='wrapper'>
      {pageTitle()}
      <div className='form-container'>
        <form>
          <div className='form-group'>
            <label>이름:</label>
            <input
              type='text'
              placeholder='학생 이름 입력'
              value={firstName}
              className={`input ${errors.firstName ? 'is-invalid' : ''}`}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <div className='error-message'>{errors.firstName}</div>
            )}
          </div>

          <div className='form-group'>
            <label>성:</label>
            <input
              type='text'
              placeholder='학생 성 입력'
              value={lastName}
              className={`input ${errors.lastName ? 'is-invalid' : ''}`}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <div className='error-message'>{errors.lastName}</div>
            )}
          </div>

          <div className='form-group'>
            <label>이메일:</label>
            <input
              type='text'
              placeholder='학생 이메일 입력'
              value={email}
              className={`input ${errors.email ? 'is-invalid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className='error-message'>{errors.email}</div>
            )}
          </div>

          <div className='form-group'>
            <label>학과 선택:</label>
            <select
              className={`input ${errors.department ? 'is-invalid' : ''}`}
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value=''>학과 선택</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.departmentName}
                </option>
              ))}
            </select>
            {errors.department && (
              <div className='error-message'>{errors.department}</div>
            )}
          </div>
          <button className='btn' onClick={saveOrUpdateStudent}>
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

export default StudentComponent;

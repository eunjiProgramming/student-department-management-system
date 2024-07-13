package com.eunji.student_department_backend.service.impl;

import com.eunji.student_department_backend.dto.StudentDto;
import com.eunji.student_department_backend.entity.Department;
import com.eunji.student_department_backend.entity.Student;
import com.eunji.student_department_backend.exception.ResourceNotFoundException;
import com.eunji.student_department_backend.mapper.StudentMapper;
import com.eunji.student_department_backend.repository.DepartmentRepository;
import com.eunji.student_department_backend.repository.StudentRepository;
import com.eunji.student_department_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);

        Department department = departmentRepository.findById(studentDto.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("해당 ID를 가진 학과가 존재하지 않습니다: " + studentDto.getDepartmentId()));

        student.setDepartment(department);

        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("해당 ID를 가진 학생이 존재하지 않습니다: " + studentId));

        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("해당 ID를 가진 학생이 존재하지 않습니다: " + studentId)
        );

        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setEmail(updatedStudent.getEmail());

        Department department = departmentRepository.findById(updatedStudent.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("해당 ID를 가진 학과가 존재하지 않습니다: " + updatedStudent.getDepartmentId()));

        student.setDepartment(department);

        Student updatedStudentObj = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("해당 ID를 가진 학생이 존재하지 않습니다: " + studentId)
        );

        studentRepository.deleteById(studentId);
    }
}

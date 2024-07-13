package com.eunji.student_department_backend.mapper;

import com.eunji.student_department_backend.dto.StudentDto;
import com.eunji.student_department_backend.entity.Department;
import com.eunji.student_department_backend.entity.Student;

public class StudentMapper {
    // Student -> StudentDto
    public static StudentDto mapToStudentDto(Student student){
        return new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDepartment().getId()
        );
    }
    // StudentDto -> Student
    public static Student mapToStudent(StudentDto studentDto){
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());

        Department department = new Department();
        department.setId(studentDto.getDepartmentId());
        student.setDepartment(department);

        return student;
    }
}

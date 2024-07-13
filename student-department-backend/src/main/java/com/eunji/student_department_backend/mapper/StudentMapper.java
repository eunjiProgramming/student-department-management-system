package com.eunji.student_department_backend.mapper;

import com.eunji.student_department_backend.dto.StudentDto;
import com.eunji.student_department_backend.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student){
        return new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDepartment().getId()
        );
    }

    public static Student mapToStudent(StudentDto studentDto){
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
        return student;
    }
}

package com.eunji.student_department_backend.repository;

import com.eunji.student_department_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}

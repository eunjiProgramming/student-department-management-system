package com.eunji.student_department_backend.repository;

import com.eunji.student_department_backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository  extends JpaRepository<Department, Long> {
}

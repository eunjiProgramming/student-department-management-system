package com.eunji.student_department_backend.mapper;

import com.eunji.student_department_backend.dto.DepartmentDto;
import com.eunji.student_department_backend.entity.Department;

public class DepartmentMapper {
    // convert department jpa entity into depart dto
    public static DepartmentDto mapToDepartmentDto(Department department) {
        return new DepartmentDto(department.getId(), department.getDepartmentName(), department.getDepartmentDescription());
    }

    // convert department dto into depart jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto) {
        return new Department(departmentDto.getId(), departmentDto.getDepartmentName(), departmentDto.getDepartmentDescription());
    }
}

package com.eunji.student_department_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {
    private Long id;

    @NotBlank(message = "학과 이름은 필수입니다.")
    @Size(max = 100, message = "학과 이름은 최대 100자까지 허용됩니다.")
    private String departmentName;

    @Size(max = 255, message = "학과 설명은 최대 255자까지 허용됩니다.")
    private String departmentDescription;
}

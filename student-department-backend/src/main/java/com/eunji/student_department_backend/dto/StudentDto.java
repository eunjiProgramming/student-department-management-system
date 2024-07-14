package com.eunji.student_department_backend.dto;

import jakarta.validation.constraints.Email;
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
public class StudentDto {
    private Long id;

    @NotBlank(message = "이름은 필수 항목입니다.")
    @Size(max = 50, message = "이름은 최대 50자까지 허용됩니다.")
    private String firstName;

    @NotBlank(message = "성은 필수 항목입니다.")
    @Size(max = 50, message = "성은 최대 50자까지 허용됩니다.")
    private String lastName;

    @Email(message = "유효한 이메일 주소를 입력하세요.")
    @NotBlank(message = "이메일은 필수 항목입니다.")
    private String email;

    private Long departmentId;
    private String departmentName;
}

package com.eunji.student_department_backend.entity;

import jakarta.persistence.*;
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
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "이름은 필수 항목입니다.")
    @Size(max = 50, message = "이름은 최대 50자까지 허용됩니다.")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "성은 필수 항목입니다.")
    @Size(max = 50, message = "성은 최대 50자까지 허용됩니다.")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Email(message = "유효한 이메일 주소를 입력하세요.")
    @NotBlank(message = "이메일은 필수 항목입니다.")
    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}

package com.eunji.student_department_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice // 이 어노테이션은 이 클래스가 전역 예외 처리기를 정의함을 나타냅니다.
public class GlobalExceptionHandler {

    // ResourceNotFoundException 예외를 처리하는 메서드
    @ExceptionHandler(ResourceNotFoundException.class) // 이 메서드는 ResourceNotFoundException이 발생할 때 호출
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        // 예외 메시지와 함께 404 NOT FOUND 응답을 반환
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // 유효성 검사 실패 예외를 처리하는 메서드
    @ResponseStatus(HttpStatus.BAD_REQUEST) // 이 메서드는 400 BAD REQUEST 응답을 반환해야 함을 나타냄
    @ExceptionHandler(MethodArgumentNotValidException.class) // 이 메서드는 MethodArgumentNotValidException이 발생할 때 호출.
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // 필드 이름과 오류 메시지를 저장하기 위한 Map을 생성
        Map<String, String> errors = new HashMap<>();
        // 유효성 검사 실패한 필드를 모두 순회
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            // 필드 이름을 가져옴
            String fieldName = ((org.springframework.validation.FieldError) error).getField();
            // 오류 메시지를 가져옴
            String errorMessage = error.getDefaultMessage();
            // 필드 이름과 오류 메시지를 Map에 저장
            errors.put(fieldName, errorMessage);
        });
        // 필드 이름과 오류 메시지를 포함한 400 BAD REQUEST 응답을 반환
        return ResponseEntity.badRequest().body(errors);
    }
}

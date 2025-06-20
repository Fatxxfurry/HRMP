package com.example.rest.model;

import java.time.LocalDate;
import java.util.List;

import com.example.rest.model.enums.EmployeeRole;
import com.example.rest.model.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    private String name;

    
    private String address;

    @Enumerated(EnumType.STRING)
    private EmployeeRole role;
    

    private String email;

    

    private String phone;

    

    private String password;


    private Integer age;

    
    @Enumerated(EnumType.STRING)
    private Gender gender;

    

    private String identification;

    
    private String image;
 
    private String username;
    
    private LocalDate birth_date;
    private String position;
    
    private LocalDate hire_date;
    private Boolean status;
    private String avatar;
    private String bank;
    private String bank_number;
    private String insurance;
    @ManyToOne
    @JoinColumn(name = "department_id",referencedColumnName="id")
    private Department department;
    
    @JsonIgnore
    @OneToMany(mappedBy = "employee",fetch=FetchType.LAZY)
    private List<Task> tasks;
}
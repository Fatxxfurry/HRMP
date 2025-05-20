package com.example.rest.model;
import org.springframework.cglib.core.Local;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "task")
public class Task { 
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "project_id",referencedColumnName="id")
    private Project project;
    
    @ManyToOne
    @JoinColumn(name = "responsible_employee_id",referencedColumnName="id")
    private Employee employee;
    LocalDate start_date;
    LocalDate end_date;
    private boolean finished;
   
}

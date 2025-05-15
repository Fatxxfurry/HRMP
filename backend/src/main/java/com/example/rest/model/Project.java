package com.example.rest.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String name;
    boolean finished;
    LocalDate start_date;
    LocalDate end_date;

    @ManyToOne
    @JoinColumn(name = "involeded_departments_id",referencedColumnName="id")
    Department involededDepartments;

    @ManyToOne
    @JoinColumn(name = "manager_id",referencedColumnName="id")
    Employee employee;
}

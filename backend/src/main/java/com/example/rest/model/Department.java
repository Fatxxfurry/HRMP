package com.example.rest.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String name;
    
    @ManyToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    @JsonIgnore
    private Employee employee;

    public Long getManagerId() {
        return employee == null ? null : employee.getId();
    }
}

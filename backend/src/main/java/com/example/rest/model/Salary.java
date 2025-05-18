package com.example.rest.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "salaries")
@Data
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer basic_salary;

    private Integer bonus;

    private Integer minus;

    private String bonus_reason;

    private String minus_reason;

    private LocalDate date_paid;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

    //add total_salary is sum of basic_salary + bonus - minus  
    @JsonProperty("total_salary")
    public Integer getTotal_salary() {
        return getBasic_salary() + getBonus() - getMinus();
    }
}

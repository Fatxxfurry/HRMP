package com.example.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.rest.model.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    @Modifying
    @Transactional
    @Query(value = """
        DELETE FROM calendar 
        WHERE YEAR(work_date) = :year AND MONTH(work_date) = :month
        """, nativeQuery = true)
    void deleteCalendarForMonth(int year, int month);

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO calendar (work_date, is_working_day, description)
        SELECT 
            DATE(CONCAT(:year, '-', :month, '-', n.n)) AS work_date,
            CASE
                WHEN DAYOFWEEK(DATE(CONCAT(:year, '-', :month, '-', n.n))) = 1 THEN 0
                ELSE 1
            END AS is_working_day,
            CASE
                WHEN DAYOFWEEK(DATE(CONCAT(:year, '-', :month, '-', n.n))) = 1 THEN 'Chủ nhật'
                ELSE ''
            END AS description
        FROM (
            SELECT a.N + b.N * 10 + 1 AS n
            FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
                  UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
                 (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) b
            ORDER BY n
        ) n
        WHERE n.n <= DAY(LAST_DAY(CONCAT(:year, '-', :month, '-01')))
        """, nativeQuery = true)
    void insertCalendarForMonth(int year, int month);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE calendar 
        SET is_working_day = :isWorkingDay, description = :description 
        WHERE YEAR(work_date) = :year AND MONTH(work_date) = :month AND DAY(work_date) = :day
        """, nativeQuery = true)
    void updateCalendarForDay(int year, int month, int day, boolean isWorkingDay, String description);


    @Query(value = """
        SELECT * FROM calendar 
        WHERE YEAR(work_date) = :year AND MONTH(work_date) = :month
        """, nativeQuery = true)
    List<Calendar> getCalendarForMonth(int year, int month);
}

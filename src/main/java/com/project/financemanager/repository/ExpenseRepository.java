package com.project.financemanager.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.financemanager.entity.ExpenseEntity;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

        // select * from tbl_expenses where profile_id = ?1 order by date desc
        List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

        // select * from tbl_expenses where profile_id = ?1 order by date desc limit 5
        List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

        // for writing custom queries please use entity names not table names
        @Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
        BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

        // select * from tbl_expenses where profile_id = ?1 and date between ?2 and ?3
        // and name like ?4 and keyword like ?5 order by date desc
        List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
                        Long profileId,
                        LocalDateTime startDate,
                        LocalDateTime endDate,
                        String keyword,
                        Sort sort);

        // select * from tbl_expenses where profile_id = ?1 and date between ?2 and ?3
        List<ExpenseEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

        // select * from tbl_expenses where profile_id = ?1 and date = ?2
        List<ExpenseEntity> findByProfileIdAndDate(Long profileId, LocalDate date);
}

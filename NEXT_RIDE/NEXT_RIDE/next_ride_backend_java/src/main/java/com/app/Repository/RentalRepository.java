package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.Entity.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {

	List<Rental> findByUserId(Long userId);
	
	@Query("SELECT r FROM Rental r JOIN FETCH r.vehicle v WHERE r.user.id = :userId")
    List<Rental> findRentalsByUserId(@Param("userId") Long userId);

}

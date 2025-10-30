package com.app.Service;

import java.time.LocalDate;
import java.util.List;

import com.app.DTO.RentalDTO;

public interface RentalService {

	Long rentVehicle(Long userId, Long vehicleId, LocalDate startDate, LocalDate endDate);

	List<RentalDTO> getRentalsByUser(Long userId);

	List<RentalDTO> getAllRentals();

	
}

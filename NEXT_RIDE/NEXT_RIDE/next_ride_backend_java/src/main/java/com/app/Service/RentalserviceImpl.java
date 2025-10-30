package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.app.DTO.RentalDTO;
import com.app.Entity.Rental;
import com.app.Entity.User;
import com.app.Entity.Vehicle;
import com.app.Repository.RentalRepository;
import com.app.Repository.UserRepository;
import com.app.Repository.VehicleRepository;

@Service
@Transactional
public class RentalserviceImpl implements RentalService {

	private final RentalRepository rentalRepository;
	private final UserRepository userRepository;
	private final VehicleRepository vehicleRepository;

	public RentalserviceImpl(RentalRepository rentalRepository, UserRepository userRepository,
			VehicleRepository vehicleRepository) {
		this.rentalRepository = rentalRepository;
		this.userRepository = userRepository;
		this.vehicleRepository = vehicleRepository;
	}


	    public Long rentVehicle(Long userId, Long vehicleId, LocalDate startDate, LocalDate endDate) {
	        User user = userRepository.findById(userId)
	            .orElseThrow(() -> new EntityNotFoundException("User not found"));
	        
	        Vehicle vehicle = vehicleRepository.findById(vehicleId)
	            .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));

	        // Validate rental dates
//	        if (startDate.isAfter(endDate)) {
//	            throw new InvalidRentalPeriodException("Start date must be before end date");
//	        }
//	        if (startDate.isBefore(LocalDate.now())) {
//	            throw new InvalidRentalPeriodException("Start date cannot be in the past");
//	        }
//
//	        // Check if the vehicle is available
//	        if (vehicle.getQuantity() <= 0) {
//	            throw new VehicleNotAvailableException("Vehicle is not available for rent");
//	        }

	        // Create Rental entry
	        Rental rental = new Rental();
	        rental.setUser(user);
	        rental.setVehicals(vehicle);
	        rental.setStartDate(startDate);
	        rental.setEndDate(endDate);

	        // Reduce vehicle quantity
	        vehicle.setQuantity(vehicle.getQuantity() - 1);

	        // Save rental and update vehicle availability
	        rentalRepository.save(rental);
	        vehicleRepository.save(vehicle);

	        System.out.println("in service"+rental.getRentalId());
	        return rental.getRentalId();
	    }
	



	  


		@Override
		public List<RentalDTO> getRentalsByUser(Long userId) {
			List<Rental> rentals = rentalRepository.findByUserId(userId);
	        return rentals.stream()
	            .map(r -> new RentalDTO(
	                r.getRentalId(),
	                r.getVehicals() != null ? r.getVehicals().getVehicleName() : "N/A",
	                r.getStartDate(),
	                r.getEndDate()))
	       .collect(Collectors.toList());
			
		}


		@Override
	    public List<RentalDTO> getAllRentals() {
	        List<Rental> rentals = rentalRepository.findAll();
	        return rentals.stream()
	            .map(rental -> new RentalDTO(
	                rental.getRentalId(),
	                rental.getUser().getUserName(),
	                rental.getStartDate(),
	                rental.getEndDate()
	            ))
	            .collect(Collectors.toList());
	    }


	






}

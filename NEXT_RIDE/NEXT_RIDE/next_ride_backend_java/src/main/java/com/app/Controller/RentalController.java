package com.app.Controller;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.RentalDTO;
import com.app.Entity.Rental;
import com.app.Exception.VehicleAlreadyRentedException;
import com.app.Service.RentalService;

@RestController
@CrossOrigin("http://localhost:3000")
public class RentalController {

	private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping("/customer/rent")
    public ResponseEntity<?> rentVehicle(
            @RequestParam Long userId, 
            @RequestParam Long vehicleId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, 
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            if (startDate.isAfter(endDate)) {
                return ResponseEntity.badRequest().body("Start date must be before end date.");
            }
            long rentalId=rentalService.rentVehicle(userId, vehicleId, startDate, endDate);
            return new ResponseEntity<>(rentalId,HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Vehicle not found");
        } catch (VehicleAlreadyRentedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Vehicle already rented for the selected period");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/customer/user/{userId}")
    public ResponseEntity<List<RentalDTO>> getUserRentals(@PathVariable Long userId) {
        return ResponseEntity.ok(rentalService.getRentalsByUser(userId));
    }
    @GetMapping("/admin/getAllRentals")
    public ResponseEntity<List<RentalDTO>> getAllRentals() {
        List<RentalDTO> rentals = rentalService.getAllRentals();
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }
}

package com.app.DTO;

import java.time.LocalDate;

public class RentalDTO {

    private Long rentalId;
    private String vehicleName;
    private LocalDate startDate;
    private LocalDate endDate;

    public RentalDTO(Long rentalId, String vehicleName, LocalDate startDate, LocalDate endDate) {
        this.rentalId = rentalId;
        this.vehicleName = vehicleName;
        this.startDate = startDate;
        this.endDate = endDate;
        
        
    }



	public Long getRentalId() {
		return rentalId;
	}

	public void setRentalId(Long rentalId) {
		this.rentalId = rentalId;
	}

	public String getVehicleName() {
		return vehicleName;
	}

	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

    // Getters and Setters
}

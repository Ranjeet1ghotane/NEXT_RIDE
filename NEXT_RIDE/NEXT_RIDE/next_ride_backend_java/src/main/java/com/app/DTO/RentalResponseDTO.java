package com.app.DTO;

public class RentalResponseDTO {

    private Long Id;
    private String message;

    public RentalResponseDTO() {}

    public RentalResponseDTO(String message) {
        this.message = message;
    }

    public RentalResponseDTO(Long rentalId, String message) {
        this.Id = rentalId;
        this.message = message;
    }

    public Long getRentalId() {
        return Id;
    }

    public void setRentalId(Long rentalId) {
        this.Id = rentalId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}


package com.app.DTO;

public class VehicleResponseDTO {
	private Long id;
    private String vehicleName;
    private double price;
    private double quantity;
    private String description;
    private String categoryName;

    public VehicleResponseDTO(Long id,String vehicleName, double price, double quantity, 
                               String description, String categoryName) {
    	this.id = id;
        this.vehicleName = vehicleName;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.categoryName = categoryName;
    }

	public String getVehicleName() {
		return vehicleName;
	}

	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

   
}


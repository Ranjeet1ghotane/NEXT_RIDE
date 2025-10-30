package com.app.DTO;

import java.time.LocalDate;

public class AdminPaymentDYTO {

	private Long paymentId;
	private Long rentalId;
	private LocalDate paymentDate;
	private String userName;
	private Double amount;

	// Constructor required by the service implementation
    public AdminPaymentDYTO(Long paymentId, Double amount, LocalDate paymentDate, String userName) {
    	this.rentalId=rentalId;
        this.paymentId = paymentId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.userName = userName;
    }

    public AdminPaymentDYTO(Long id, Double amount, LocalDate paymentDate) {
        this.paymentId = id;
        this.amount = amount;
        this.paymentDate = paymentDate;
    }

    public AdminPaymentDYTO(Long rentalId, LocalDate paymentDate, String userName, Double amount) {
        this.rentalId = rentalId;
        this.paymentDate = paymentDate;
        this.userName = userName;
        this.amount = amount;
    }

	
	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}

	public Long getRentalId() {
		return rentalId;
	}

	public void setRentalId(Long rentalId) {
		this.rentalId = rentalId;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}

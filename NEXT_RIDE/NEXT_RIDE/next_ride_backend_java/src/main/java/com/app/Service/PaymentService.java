package com.app.Service;

import java.util.List;

import com.app.DTO.AdminPaymentDYTO;
import com.app.DTO.PaymentRequestDTO;
import com.app.DTO.PaymentResponseDTO;

public interface PaymentService {

	

	List<AdminPaymentDYTO> getAllPayments();

	void processPayment(Long rentalId, Double amount);

}

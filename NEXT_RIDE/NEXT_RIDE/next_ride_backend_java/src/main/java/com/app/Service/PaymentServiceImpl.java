package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.app.DTO.AdminPaymentDYTO;
import com.app.Entity.Payment;
import com.app.Entity.Rental;
import com.app.Repository.PaymentRepository;
import com.app.Repository.RentalRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final RentalRepository rentalRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, RentalRepository rentalRepository) {
        this.paymentRepository = paymentRepository;
        this.rentalRepository = rentalRepository;
    }

    public void processPayment(Long rentalId, Double amount) {
        Optional<Rental> rental = rentalRepository.findById(rentalId);

        if (rental.isEmpty()) {
            throw new RuntimeException("Rental not found");
        }

        Payment payment = new Payment();
        payment.setRental(rental.get());
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDate.now());

        paymentRepository.save(payment);
    }
    @Override
    public List<AdminPaymentDYTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
            .map(payment -> new AdminPaymentDYTO(
                payment.getId(), 
                payment.getAmount(), 
                payment.getPaymentDate(), 
                payment.getRental().getUser().getUserName() // Assuming rental and user exist
            ))
            .collect(Collectors.toList());
    }

}

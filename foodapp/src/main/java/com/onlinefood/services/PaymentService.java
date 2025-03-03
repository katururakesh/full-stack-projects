package com.onlinefood.services;

import com.onlinefood.model.Order;
import com.onlinefood.repo.OrderRepository;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PaymentService {
    private final APIContext apiContext;
    private final OrderRepository orderRepository;

    public PaymentService(APIContext apiContext, OrderRepository orderRepository) {
        this.apiContext = apiContext;
        this.orderRepository = orderRepository;
    }

    public Payment createPayment(Order order,
                                 String method,
                                 String description
    ) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.format(Locale.US, "%.2f", order.getTotalPrice()));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        Payment payment = new Payment();
        payment.setIntent("sales");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl("https://localhost:8080/api/payments/success");
        redirectUrls.setCancelUrl("https://localhost:8080/api/payments/cancel");

        payment.setRedirectUrls(redirectUrls);
        return payment.create(apiContext);
    }

    public Payment executePayment(
            String paymentId,
            String payerId
    ) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        return payment.execute(apiContext, paymentExecution);
    }

        @Transactional
        public String cancelPayment(Long orderId) {
            // Find the order by ID
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            // Check if the order is already paid
            if ("PAID".equals(order.getStatus())) {
                return "Payment has already been completed. Cannot cancel.";
            }

            // Update order status to "CANCELLED"
            order.setStatus("CANCELLED");
            orderRepository.save(order);

            return "Payment for order " + orderId + " has been cancelled successfully.";
        }
    }

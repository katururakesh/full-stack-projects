package com.onlinefood.controller;

import com.onlinefood.model.Order;
import com.onlinefood.model.User;
import com.onlinefood.security.AuthService;
import com.onlinefood.services.OrderService;
import com.onlinefood.services.PaymentService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthService userService;  // Service for retrieving user details

    @PostMapping("/create/{orderId}")
    public ResponseEntity<String> createPayment(@PathVariable Long orderId) {
        Long userId = getAuthenticatedUserId();

        Optional<Order> orderOptional = Optional.ofNullable(orderService.getOrderById(orderId));
        if (orderOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Order not found!");
        }

        Order order = orderOptional.get();
        if (!order.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Unauthorized: This order does not belong to you!");
        }

        try {
            Payment payment = paymentService.createPayment(order, "paypal", "payment description");
            return payment.getLinks().stream()
                    .filter(link -> link.getRel().equalsIgnoreCase("approval_url"))
                    .findFirst()
                    .map(link -> {
                        order.setStatus("PENDING_PAYMENT");
                        orderService.updateOrderStatus(order.getId(), "PENDING_PAYMENT");
                        return ResponseEntity.ok("Redirect user to: " + link.getHref());
                    })
                    .orElse(ResponseEntity.badRequest().body("Error creating payment."));
        } catch (PayPalRESTException e) {
            return ResponseEntity.internalServerError().body("Error creating payment: " + e.getMessage());
        }
    }

    @GetMapping("/success")
    public ResponseEntity<String> success(@RequestParam("paymentId") String paymentId,
                                          @RequestParam("PayerID") String payerId) {
        Optional<Order> orderOptional = Optional.ofNullable(orderService.findByPaypalPaymentId(paymentId));
        if (orderOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Order not found for this payment!");
        }

        Order order = orderOptional.get();
        try {
            Payment payment = paymentService.executePayment(paymentId, payerId);
            if ("approved".equalsIgnoreCase(payment.getState())) {
                order.setStatus("PAID");
                orderService.updateOrderStatus(order.getId(), "PAID");
                return ResponseEntity.ok("Payment successful. Order has been paid!");
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.internalServerError().body("Payment execution failed: " + e.getMessage());
        }
        return ResponseEntity.badRequest().body("Payment failed.");
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> cancel() {
        return ResponseEntity.ok("Payment was canceled by the user.");
    }

    @PostMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelPayment(@PathVariable Long orderId) {
        String response = paymentService.cancelPayment(orderId);
        return ResponseEntity.ok(response);
    }

    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return user.getId();
    }
}

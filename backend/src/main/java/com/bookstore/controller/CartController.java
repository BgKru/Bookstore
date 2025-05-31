package com.bookstore.controller;

import com.bookstore.model.Cart;
import com.bookstore.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public Cart getCart(@RequestParam Long userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam Long userId,
            @RequestParam Long bookId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        return cartService.addToCart(userId, bookId, quantity);
    }

    @PostMapping("/remove")
    public Cart removeFromCart(
            @RequestParam Long userId,
            @RequestParam Long bookId
    ) {
        return cartService.removeFromCart(userId, bookId);
    }

    @PostMapping("/update")
    public Cart updateQuantity(
            @RequestParam Long userId,
            @RequestParam Long bookId,
            @RequestParam int quantity
    ) {
        return cartService.updateQuantity(userId, bookId, quantity);
    }

    @PostMapping("/clear")
    public void clearCart(@RequestParam Long userId) {
        cartService.clearCart(userId);
    }
}
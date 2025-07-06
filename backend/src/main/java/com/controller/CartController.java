package com.controller;

import com.model.CartItem;
import com.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartService.getCartItemsForUser(userId);
    }

    @PostMapping("/{userId}/add")
    public CartItem addToCart(@PathVariable Long userId,
                              @RequestParam Long bookId,
                              @RequestParam int quantity) {
        return cartService.addToCart(userId, bookId, quantity);
    }

    @DeleteMapping("/{userId}/remove")
    public void removeFromCart(@PathVariable Long userId,
                               @RequestParam Long bookId) {
        cartService.removeFromCart(userId, bookId);
    }
}

package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.model.User;
import com.bookstore.model.Cart;
import com.bookstore.model.CartItem;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;

    public Cart getCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
    }

    private Cart createNewCart(Long userId) {
        Cart newCart = new Cart();
        User user = new User();
        user.setId(userId);
        newCart.setUser(user);
        return cartRepository.save(newCart);
    }

    @Transactional
    public Cart addToCart(Long userId, Long bookId, int quantity) {
        Cart cart = getCart(userId);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getBook().getId().equals(bookId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setBook(book);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cart.addItem(newItem);
        }

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeFromCart(Long userId, Long bookId) {
        Cart cart = getCart(userId);
        cartItemRepository.deleteByCartIdAndBookId(cart.getId(), bookId);
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateQuantity(Long userId, Long bookId, int quantity) {
        if (quantity <= 0) {
            return removeFromCart(userId, bookId);
        }

        Cart cart = getCart(userId);
        cart.getItems().stream()
                .filter(item -> item.getBook().getId().equals(bookId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    cart.calculateTotalPrice();
                    cartRepository.save(cart);
                });

        return cart;
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getCart(userId);
        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);
    }
}
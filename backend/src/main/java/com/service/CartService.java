package com.service;

import com.model.Book;
import com.model.CartItem;
import com.model.User;
import com.repository.BookRepository;
import com.repository.CartItemRepository;
import com.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public CartService(CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       BookRepository bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<CartItem> getCartItemsForUser(Long userId) {
        return cartItemRepository.findByUser_Id(userId);
    }

    public CartItem addToCart(Long userId, Long bookId, int quantity) {
        User user = userRepository.findById(userId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        return cartItemRepository.findByUser_IdAndBook_Id(userId, bookId)
                .map(item -> {
                    item.setQuantity(item.getQuantity() + quantity);
                    return cartItemRepository.save(item);
                })
                .orElseGet(() -> cartItemRepository.save(new CartItem(null, user, book, quantity)));
    }

    public void removeFromCart(Long userId, Long bookId) {
        cartItemRepository.deleteByUser_IdAndBook_Id(userId, bookId);
    }
}

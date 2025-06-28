package com.bookstore.repository;

import com.bookstore.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    void deleteByCartIdAndBookId(Long cartId, Long bookId);
}
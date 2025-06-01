package main.java.com.bookstore.repository;

import main.java.com.bookstore.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId); // Если есть аутентификация
}
package com.repository;

import com.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Получить все элементы корзины пользователя
    List<CartItem> findByUser_Id(Long userId);

    // Проверить, есть ли книга у пользователя в корзине
    Optional<CartItem> findByUser_IdAndBook_Id(Long userId, Long bookId);

    // Удалить книгу из корзины пользователя
    void deleteByUser_IdAndBook_Id(Long userId, Long bookId);

    // Очистить корзину пользователя (удалить все элементы)
    void deleteAllByUser_Id(Long userId);
}
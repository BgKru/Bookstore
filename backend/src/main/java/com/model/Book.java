package com.bookstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String description;
    private BigDecimal price;
    private String coverImage;

    // Конструкторы, геттеры и сеттеры
    public Book() {}

    public Book(String title, String author, String description, BigDecimal price, String coverImage) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.coverImage = coverImage;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getAuthor() {
        return author;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
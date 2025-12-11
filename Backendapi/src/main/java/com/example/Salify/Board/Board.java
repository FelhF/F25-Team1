package com.example.Salify.Board;

import java.util.HashSet;
import java.util.Set;

import com.example.Salify.Deal.Deal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private Double rating;  

    private String description;


    @ManyToMany
    @JoinTable(
        name = "board_deals",
        joinColumns = @JoinColumn(name = "board_id"),
        inverseJoinColumns = @JoinColumn(name = "deal_id")
    )
    private Set<Deal> deals = new HashSet<>();

    private String category;
    private String Url;

    public Set<Deal> getDeals() {
    return deals;
}

public void setDeals(Set<Deal> deals) {
    this.deals = deals;
}
    public Board() {}

    public Board(Long boardId, String name, Double rating, String description, String category) {
        this.boardId = boardId;
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.category = category;
    }

    public Board(String name, Double rating, String description) {
        this.name = name;
        this.rating = rating;
        this.description = description;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

     public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

      public String getURL() {
        return Url;
    }

    public void setURL(String URL) {
        this.Url = URL;
    }
}
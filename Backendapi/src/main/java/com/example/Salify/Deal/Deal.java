package com.example.Salify.Deal;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.example.Salify.Board.Board;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"boards"})
@Entity
@Table(name = "deals")


public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dealId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String store;

    private String address;     
    private String storeLink;   

    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String description;

     
    @ManyToMany(mappedBy = "deals")                                             // Many-to-Many with boards
    @JsonIgnoreProperties("deals")  
    private Set<Board> boards = new HashSet<>();

    public Deal() {}

    public Deal(Long dealId, LocalDate startDate, LocalDate endDate, String store,
            String address, String storeLink, String category, String description) {
        this.dealId = dealId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.store = store;
        this.address = address;
        this.storeLink = storeLink;
        this.category = category;
        this.description = description;
    }

    public Deal(LocalDate startDate, LocalDate endDate, String store,
                String address, String storeLink, String category, String description) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.store = store;
        this.address = address;
        this.storeLink = storeLink;
        this.category = category;
        this.description = description;
    }

    // Getters and Setters

    public Long getDealId() {
        return dealId;
    }

    public void setDealId(Long dealId) {
        this.dealId = dealId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStoreLink() {
        return storeLink;
    }

    public void setStoreLink(String storeLink) {
        this.storeLink = storeLink;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Board> getBoards() {
        return boards;
    }

    public void setBoards(Set<Board> boards) {
        this.boards = boards;
    }
}

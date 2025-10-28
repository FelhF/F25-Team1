package com.example.Salify.Deal;

import jakarta.persistence.*;
import java.time.LocalDate;

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
}
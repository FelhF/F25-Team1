package com.example.Salify.Creator;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "creators")
public class Creator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CreatorId;

    @Column(nullable = false)
    private String name;

    private String PhoneNumber;
    private String EmailAddress;
    private String category;

    public Creator() {}

    public Creator(Long CreatorId, String name, String PhoneNumber, String EmailAddress, String category) {
        this.CreatorId = CreatorId;
        this.name = name;
        this.PhoneNumber = PhoneNumber;
        this.EmailAddress = EmailAddress;
        this.category = category;
    }

    public Creator(String name, String PhoneNumber, String EmailAddress, String category) {
        this.name = name;
        this.PhoneNumber = PhoneNumber;
        this.EmailAddress = EmailAddress;
        this.category = category;
    }


    public Long getCreatorId() {
        return CreatorId;
    }

    public void setCreatorId(Long CreatorId) {
        this.CreatorId = CreatorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String PhoneNumber) {
        this.PhoneNumber = PhoneNumber;
    }

    public String getEmailAddress() {
        return EmailAddress;
    }

    public void setEmailAddress(String EmailAddress) {
        this.EmailAddress = EmailAddress;
    }

    public String getcategory() {
        return category;
    }

    public void setcategory(String category) {
        this.category = category;
    }
}
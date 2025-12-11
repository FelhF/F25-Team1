package com.example.Salify.Deal;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DealService {

    @Autowired
    private DealRepository dealRepo;

    // Get all deals
    public List<Deal> getAllDeals() {
        return dealRepo.findAll();
    }

    // Get by ID
    public Deal getDealById(long dealId) {
        return dealRepo.findById(dealId).orElse(null);
    }

    // Get by store
    public List<Deal> getDealByStore(String store) {
        return dealRepo.findByStore(store);
    }

    // Get by category
    public List<Deal> getDealByCategory(String category) {
        return dealRepo.findByCategory(category);
    }

    // Add new deal
    public Deal addDeal(Deal deal) {
        return dealRepo.save(deal);
    }

    // Update deal
    public Deal updateDeal(Long dealId, Deal deal) {
        deal.setDealId(dealId);
        return dealRepo.save(deal);
    }

    // Delete deal
    public void deleteDeal(Long dealId) {
        dealRepo.deleteById(dealId);
    }

    // Write deal to JSON file
    public String writeJson(Deal deal) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File("deal.json"), deal);
            return "✅ Deal written to JSON file successfully.";
        } catch (IOException e) {
            e.printStackTrace();
            return "❌ Error writing deal to JSON file.";
        }
    }

    // Read deal from JSON file
    public Deal readJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File("deal.json"), Deal.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
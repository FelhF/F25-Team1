package com.example.Salify.Creator;


import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CreatorService {

    @Autowired
    private CreatorRepository creatorRepo;

    // Get all creators
    public Object getAllCreators() {
        return creatorRepo.findAll();
    }

    // Get by ID
    public Creator getCreatorById(long CreatorId) {
        return creatorRepo.findById(CreatorId).orElse(null);
    }

    // Get by name
    public Object getCreatorByName(String name) {
        return creatorRepo.findByName(name);
    }

    // Get by Category
    public Object getCreatorByCategory(String category) {
        return creatorRepo.findByCategory(category);
    }

  
    // Add Creator
    public Creator addCreator(Creator creator) {
        return creatorRepo.save(creator);
    }

    // Update creator
    public Creator updateCreator(Long CreatorId, Creator creator) {
        return creatorRepo.save(creator);
    }

    // Delete creator
    public void deleteCreator(Long creatorId) {
        creatorRepo.deleteById(creatorId);
    }

    // Write to JSON file
    public String writeJson(Creator creator) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File("creator.json"), creator);
            return "Creator written to JSON file successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error writing creator to JSON file";
        }
    }

    // Read from JSON file
    public Object readJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File("creator.json"), Creator.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
package com.example.Salify.Deal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
public class DealController {

    @Autowired
    private DealService dealService;


    
    // Get all deals
    @GetMapping("/deals")
    public Object getAllDeals() {
        return dealService.getAllDeals();
    }

    // Get deal by ID
    @GetMapping("/deals/{id}")
    public Deal getDealById(@PathVariable long id) {
        return dealService.getDealById(id);
    }

    // Get deals by store name
    @GetMapping("/deals/store/{store}")
    public Object getDealsByStore(@PathVariable String store) {
        return dealService.getDealByStore(store);
    }

    // Get deals by category
    @GetMapping("/deals/category/{category}")
    public Object getDealsByCategory(@PathVariable String category) {
        return dealService.getDealByCategory(category);
    }

    // Add a new deal
    @PostMapping("/deals")
    public Object addDeal(@RequestBody Deal deal) {
        return dealService.addDeal(deal);
    }

    // Update existing deal
    @PutMapping("/deals/{id}")
    public Deal updateDeal(@PathVariable Long id, @RequestBody Deal deal) {
        dealService.updateDeal(id, deal);
        return dealService.getDealById(id);
    }

    // Delete a deal
    @DeleteMapping("/deals/{id}")
    public Object deleteDeal(@PathVariable Long id) {
        dealService.deleteDeal(id);
        return dealService.getAllDeals();
    }


    // Write deal to JSON file
    @PostMapping("/deals/writeFile")
    public Object writeJson(@RequestBody Deal deal) {
        return dealService.writeJson(deal);
    }

    // Read deal from JSON file
    @GetMapping("/deals/readFiles")
    public Object readJson() {
        return dealService.readJson();
    }
}
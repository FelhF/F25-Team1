package com.example.Salify.Creator;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CreatorController {

    @Autowired
    private CreatorService creatorService;

    // Get all creators
    @GetMapping("/creators")
    public Object getAllCreators() {
        return creatorService.getAllCreators();
    }

    // Get by ID
    @GetMapping("/creators/{id}")
    public Creator getById(@PathVariable long id) {
        return creatorService.getCreatorById(id); 
    }

    // Get by name
    @GetMapping("/creators/name/{name}")
    public Object getByName(@PathVariable String name) {
        return creatorService.getCreatorByName(name);  
    }

    // Get by Category
    @GetMapping("/creators/category/{category}")
    public Object getByHabitat(@PathVariable String category) {
        return creatorService.getCreatorByCategory(category);  
    }


    //Add creator
    @PostMapping("/creators")
    public Object addCreator(@RequestBody Creator creator) {
    return creatorService.addCreator(creator); 
    }

    //update creator
    @PutMapping("/creators/{id}")
        public Creator updateCreator(@PathVariable Long id, @RequestBody Creator creator){
            creatorService.updateCreator(id, creator);
            return creatorService.getCreatorById(id);
        }

    //deletecreator
   @DeleteMapping("/creators/{id}")
    public Object deleteCreator(@PathVariable Long id) {
        creatorService.deleteCreator(id);
        return creatorService.getAllCreators();
}

    //get creator by incomplete name
    @GetMapping("/creators/search/name/{name}")
    public Object getCreatorByPartialName(@PathVariable String name) {
    return creatorService.getCreatorByName(name);
}

    //write Json
    @PostMapping("/creators/writeFile")
    public Object writeJson (@RequestBody Creator creator){
        return creatorService.writeJson(creator);
    }
    
    //get Json
    @GetMapping("/creators/readFiles")
    public Object readJson (){
        return creatorService.readJson();
    }
}
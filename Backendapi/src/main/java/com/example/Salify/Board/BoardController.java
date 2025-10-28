package com.example.Salify.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;

    // Get all boards
    @GetMapping("/boards")
    public Object getAllBoards() {
        return boardService.getAllBoards();
    }

    // Get board by ID
    @GetMapping("/boards/{id}")
    public Board getBoardById(@PathVariable long id) {
        return boardService.getBoardById(id);
    }

    // Get board by name
    @GetMapping("/boards/name/{name}")
    public Object getBoardByName(@PathVariable String name) {
        return boardService.getBoardByName(name);
    }

    // Get board by rating
    @GetMapping("/boards/rating/{rating}")
    public Object getBoardByRating(@PathVariable double rating) {
        return boardService.getBoardByRating(rating);
    }

    // Add a new board
    @PostMapping("/boards")
    public Object addBoard(@RequestBody Board board) {
        return boardService.addBoard(board);
    }

    // Update board
    @PutMapping("/boards/{id}")
    public Board updateBoard(@PathVariable Long id, @RequestBody Board board) {
        boardService.updateBoard(id, board);
        return boardService.getBoardById(id);
    }

    // Delete board
    @DeleteMapping("/boards/{id}")
    public Object deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return boardService.getAllBoards();
    }

    // Get boards by partial name match
    @GetMapping("/boards/search/name/{name}")
    public Object getBoardByPartialName(@PathVariable String name) {
        return boardService.getBoardByName(name);
    }

    // Write board data to JSON file
    @PostMapping("/boards/writeFile")
    public Object writeJson(@RequestBody Board board) {
        return boardService.writeJson(board);
    }

    // Read all board data from JSON file
    @GetMapping("/boards/readFiles")
    public Object readJson() {
        return boardService.readJson();
    }
}

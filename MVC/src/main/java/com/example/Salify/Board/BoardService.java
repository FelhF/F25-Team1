package com.example.Salify.Board;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepo;

    // Get all boards
    public Object getAllBoards() {
        return boardRepo.findAll();
    }

    // Get board by ID
    public Board getBoardById(long boardId) {
        return boardRepo.findById(boardId).orElse(null);
    }

    // Get board by name
    public Object getBoardByName(String name) {
        return boardRepo.findByName(name);
    }

    // Get board by rating
    public Object getBoardByRating(double rating) {
        return boardRepo.findByRating(rating);
    }

    // Add new board
    public Board addBoard(Board board) {
        return boardRepo.save(board);
    }

    // Update existing board
    public Board updateBoard(Long boardId, Board board) {
        return boardRepo.save(board);
    }

    // Delete board
    public void deleteBoard(Long boardId) {
        boardRepo.deleteById(boardId);
    }

    // Write board to JSON file
    public String writeJson(Board board) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File("board.json"), board);
            return "Board written to JSON file successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error writing board to JSON file";
        }
    }

    // Read board from JSON file
    public Object readJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File("board.json"), Board.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
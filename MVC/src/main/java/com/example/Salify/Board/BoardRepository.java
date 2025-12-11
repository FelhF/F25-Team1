package com.example.Salify.Board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    // Find by exact name
    List<Board> findByName(String name);

    // Find by rating
    List<Board> findByRating(double rating);

    // Search boards by partial name (case-insensitive)
    @Query(value = "SELECT * FROM board b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', ?1, '%'))", nativeQuery = true)
    List<Board> getBoardsByName(String name);
}
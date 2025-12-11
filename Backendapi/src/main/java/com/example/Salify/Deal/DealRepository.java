package com.example.Salify.Deal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    // Find by store name
    List<Deal> findByStore(String store);

    // Find by category
    List<Deal> findByCategory(String category);

    // Search deals by partial store name
    @Query(value = "SELECT * FROM deals d WHERE d.store LIKE %?1%", nativeQuery = true)
    List<Deal> getDealsByStoreName(String store);
}
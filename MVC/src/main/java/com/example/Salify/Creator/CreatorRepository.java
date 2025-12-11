package com.example.Salify.Creator;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long> {

    List<Creator> findByName(String name);
    List<Creator> findByCategory(String Category);

    @Query(value = "select * from creators f where f.name like %?1% ", nativeQuery = true)
    List<Creator> getCreatorsByName(String name);
}
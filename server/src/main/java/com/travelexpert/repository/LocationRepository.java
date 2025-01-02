package com.travelexpert.repository;

import com.travelexpert.model.Location;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByName(String name);
}

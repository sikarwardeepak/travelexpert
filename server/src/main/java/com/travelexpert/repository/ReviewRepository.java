package com.travelexpert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelexpert.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
}

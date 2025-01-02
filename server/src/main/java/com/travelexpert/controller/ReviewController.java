package com.travelexpert.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.travelexpert.model.Review;
import com.travelexpert.service.ReviewService;

@RestController
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @GetMapping("/reviews")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
    
    @PostMapping("/reviews")
    public void addReview(@RequestBody Review review) {
        reviewService.addReview(review);
    }
}


package com.travelexpert.service;

import com.travelexpert.model.Location;
import com.travelexpert.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }
}
package com.travelexpert.dto;

import com.travelexpert.model.Location;

public class LocationDTO {
    private Long id;
    private String name;
    private String address;
    private String coordinates;
    private String description;
    private String categories;

    public LocationDTO(Location location) {
        this.id = location.getId();
        this.name = location.getName();
        this.address = location.getAddress();
        this.coordinates = location.getCoordinates();
        this.description = location.getDescription();
        this.categories = location.getCategories();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public String getDescription() {
        return description;
    }

    public String getCategories() {
        return categories;
    }
}


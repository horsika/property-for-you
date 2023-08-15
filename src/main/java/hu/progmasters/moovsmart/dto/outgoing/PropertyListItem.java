package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.Property;


import java.time.LocalDateTime;
import java.util.List;

public class PropertyListItem {

    private long propertyId;
    private String name;
    private int numberOfBedrooms;

    private double floorArea;

    private String propertyType;

    private List<String> images;

    private double numberOfBathrooms;
    private boolean airConditioning;
    private String heatingType;
    private double price;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime activatedAt;

    private String listingType;

    public PropertyListItem() {
    }

    public PropertyListItem(Property property) {
        this.propertyId = property.getPropertyId();
        this.name = property.getName();
        this.numberOfBedrooms = property.getNumberOfBedrooms();
        this.floorArea = property.getFloorArea();
        this.propertyType = property.getPropertyType().name();
        this.images = property.getImages();
        this.numberOfBathrooms = property.getNumberOfBathrooms();
        this.airConditioning = property.isAirConditioning();
        this.heatingType = property.getHeatingType().name();
        this.price = property.getPriceHistory().get(0);
        this.activatedAt = property.getActivatedAt();
        this.listingType = property.getListingType().name();
    }


    public long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(long propertyId) {
        this.propertyId = propertyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberOfBedrooms() {
        return numberOfBedrooms;
    }

    public void setNumberOfBedrooms(int numberOfBedrooms) {
        this.numberOfBedrooms = numberOfBedrooms;
    }

    public double getFloorArea() {
        return floorArea;
    }

    public void setFloorArea(double floorArea) {
        this.floorArea = floorArea;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public double getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(double numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public boolean isAirConditioning() {
        return airConditioning;
    }

    public void setAirConditioning(boolean airConditioning) {
        this.airConditioning = airConditioning;
    }

    public String getHeatingType() {
        return heatingType;
    }

    public void setHeatingType(String heatingType) {
        this.heatingType = heatingType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getActivatedAt() {
        return activatedAt;
    }

    public void setActivatedAt(LocalDateTime activatedAt) {
        this.activatedAt = activatedAt;
    }

    public String getListingType() {
        return listingType;
    }

    public void setListingType(String listingType) {
        this.listingType = listingType;
    }
}

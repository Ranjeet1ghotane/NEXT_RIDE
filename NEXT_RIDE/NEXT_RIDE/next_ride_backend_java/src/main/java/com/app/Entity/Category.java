package com.app.Entity;



import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Lob // This annotation tells JPA to treat this as a large object (BLOB)
    private byte[] image; // This will store the image as a byte array


    // One-to-many relationship with Product
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Vehicle> vehicle;

    // Getters and setters
   

    public String getName() {
        return name;
    }

    public Long getCategoryId() {
		return id;
	}

	public void setCategoryId(Long categoryId) {
		this.id = categoryId;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public void setName(String name) {
        this.name = name;
    }

    public List<Vehicle> getProducts() {
        return vehicle;
    }

    public void setProducts(List<Vehicle> vehicle) {
        this.vehicle = vehicle;
    }
}


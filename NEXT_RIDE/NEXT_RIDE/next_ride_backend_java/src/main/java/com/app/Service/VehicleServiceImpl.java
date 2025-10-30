package com.app.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.ProductUpdateDTO;
import com.app.DTO.VehicleResponseDTO;
import com.app.Entity.Category;
import com.app.Entity.Vehicle;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.CategoryRepository;
import com.app.Repository.VehicleRepository;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Vehicle> getVehicalByCategory(Long categoryId) {
		return productRepository.findByCategory_Id(categoryId);
	}

	public List<Vehicle> getAllVehicles() {
		return productRepository.findAll();
	}

	public Vehicle updateVehical(Long productId, ProductUpdateDTO productUpdateDTO) {
		Vehicle vehicle = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

		vehicle.setPrice(productUpdateDTO.getPrice());
		vehicle.setQuantity(productUpdateDTO.getQuantity());
		vehicle.setDescription(productUpdateDTO.getDescription());

		return productRepository.save(vehicle);
	}

	public Vehicle getVehicalById(Long productId) {
		return productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
	}

	@Override
	public Vehicle addVehical(String vehicleName, double price, double quantity, 
	                           MultipartFile productImage, String description, Long categoryId) {
	    try {
	        Vehicle vehicle = new Vehicle();
	        vehicle.setVehicleName(vehicleName);
	        vehicle.setPrice(price);
	        vehicle.setQuantity(quantity);
	        
	        // Ensure productImage is not empty before setting it
	        if (productImage != null && !productImage.isEmpty()) {
	            vehicle.setProductImage(productImage.getBytes());
	        }

	        // Validate and set category
	        Category category = categoryRepository.findById(categoryId)
	                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
	        vehicle.setCategory(category);

	        vehicle.setDescription(description);

	        return productRepository.save(vehicle);

	    } catch (IOException e) {
	        throw new RuntimeException("Failed to process product image", e);
	    }
	}


	@Override
	public List<VehicleResponseDTO> getAllVehical() {
	    List<Vehicle> vehicles = productRepository.findAll();

	    return vehicles.stream()
	        .map(vehicle -> new VehicleResponseDTO(
	        		vehicle.getVehicleId(),
	                vehicle.getVehicleName(),
	                vehicle.getPrice(),
	                vehicle.getQuantity(),
	                vehicle.getDescription(),
	                vehicle.getCategory() != null ? vehicle.getCategory().getName() : "No Category"
	        ))
	        .collect(Collectors.toList());
	}


}

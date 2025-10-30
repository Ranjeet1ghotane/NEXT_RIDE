package com.app.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.ProductUpdateDTO;
import com.app.DTO.VehicleResponseDTO;
import com.app.Entity.Vehicle;

public interface VehicleService {

	Vehicle addVehical(String productName, double price, double quantity, MultipartFile productImage, String description, Long categoryId);

	List<Vehicle> getVehicalByCategory(Long id);

	List<VehicleResponseDTO> getAllVehical();

	Vehicle updateVehical(Long id, ProductUpdateDTO productUpdateDTO);

	Vehicle getVehicalById(Long productId);

}

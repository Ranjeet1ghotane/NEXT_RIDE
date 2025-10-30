package com.app.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.AdminPaymentDYTO;
import com.app.DTO.CategoryDTO;
import com.app.DTO.ProductUpdateDTO;
import com.app.DTO.VehicleResponseDTO;
import com.app.Entity.Vehicle;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.CategoryService;
import com.app.Service.PaymentService;
import com.app.Service.RentalService;
import com.app.Service.VehicleService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {

	@Autowired
	private CategoryService CategoryService;
	
	@Autowired
	private VehicleService vehicleService;
	
	@Autowired
	private RentalService rentalService;
	
	@Autowired
	private PaymentService paymentService;

	// Endpoint to add a new category
	@PostMapping("/addCategory")
	public ResponseEntity<CategoryDTO> addCategory(
	        @RequestParam("name") String name,
	        @RequestParam("image") MultipartFile image) throws IOException {

	    // Call service method
	    CategoryDTO categoryDTO = CategoryService.addCategory(name, image);

	    // Return response with 201 Created status
	    return ResponseEntity.status(HttpStatus.CREATED).body(categoryDTO);
	}
	
	
	  @GetMapping("/getAllCategories")
	    public ResponseEntity<?> getAllCategories() {
	        try {
	            List<CategoryDTO> categories = CategoryService.getAllCategories();
	            return ResponseEntity.ok(categories);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An error occurred while fetching categories: " + e.getMessage());
	        }
	    }
	  
	  @PostMapping("/addVehicle")
	  public ResponseEntity<Vehicle> addVehicle(
	          @RequestParam("vehicleName") String vehicleName,
	          @RequestParam("price") double price,
	          @RequestParam("quantity") double quantity,
	          @RequestParam("productImage") MultipartFile productImage,
	          @RequestParam("description") String description,
	          @RequestParam("categoryId") Long categoryId) {

	      try {
	          // Call service to save the vehicle
	          Vehicle savedVehicle = vehicleService.addVehical(vehicleName, price, quantity, productImage, description, categoryId);
	          return ResponseEntity.ok(savedVehicle);

	      } catch (Exception e) {
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                  .body(null); // Avoid exposing exception details to the user
	      }
	  }


	  
	  @GetMapping("/getVehicleByCategory/{id}")
	    public ResponseEntity<List<Vehicle>> getVehicleByCategory(@PathVariable Long id) {
	        List<Vehicle> vehicle = vehicleService.getVehicalByCategory(id);
	        return ResponseEntity.ok(vehicle);
	    }
	  
	  @GetMapping("/getAllVehicle")
	  public ResponseEntity<List<VehicleResponseDTO>> getAllVehicle() {
	      try {
	          List<VehicleResponseDTO> products = vehicleService.getAllVehical();
	          return new ResponseEntity<>(products, HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }

	  
	  
	  @GetMapping("/getAllPayments")
	  public ResponseEntity<List<AdminPaymentDYTO>> getAllPayments() {
	      try {
	          List<AdminPaymentDYTO> payments = paymentService.getAllPayments();
	          return new ResponseEntity<>(payments, HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @PutMapping("/updateVehicle/{id}")
	  public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody ProductUpdateDTO productUpdateDTO) {
	      try {
	          Vehicle updatedProduct = vehicleService.updateVehical(id, productUpdateDTO);
	          return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	      } catch (ResourceNotFoundException e) {
	          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	      } catch (Exception e) {
	          return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @GetMapping("/getVehicleById/{id}")
	  public ResponseEntity<?> getVehicleById(@PathVariable Long id) {
	      try {
	          Vehicle vehicle = vehicleService.getVehicalById(id);
	          return new ResponseEntity<>(vehicle, HttpStatus.OK);
	      } catch (ResourceNotFoundException e) {
	          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	      } catch (Exception e) {
	          return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
}

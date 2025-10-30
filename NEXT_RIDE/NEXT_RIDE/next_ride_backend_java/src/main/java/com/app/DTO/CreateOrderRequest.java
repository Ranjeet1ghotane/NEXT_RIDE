package com.app.DTO;
import java.util.List;

public class CreateOrderRequest {
	
	private long id;
	
    private List<OrderItemDTO> items;

    // Getters and Setters
    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
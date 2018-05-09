package ru.vm.cars4sale.controllers;

public class ManufacturerException extends Exception {
	
	private static final long serialVersionUID = 1L;
	private String errorMessage;
 
	public String getErrorMessage() {
		return errorMessage;
	}
	public ManufacturerException(String errorMessage) {
		super(errorMessage);
		this.errorMessage = errorMessage;
	}
	public ManufacturerException() {
		super();
	}

}

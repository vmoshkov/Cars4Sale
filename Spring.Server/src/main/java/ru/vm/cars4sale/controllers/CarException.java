package ru.vm.cars4sale.controllers;

public class CarException extends Exception {
	
	private static final long serialVersionUID = 1L;
	private String errorMessage;
 
	public String getErrorMessage() {
		return errorMessage;
	}
	public CarException(String errorMessage) {
		super(errorMessage);
		this.errorMessage = errorMessage;
	}
	public CarException() {
		super();
	}

}

package ru.vm.cars4sale.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.vm.cars4sale.data.MyManufacturerRepository;
import ru.vm.cars4sale.models.Manufacturer;

@RestController
@RequestMapping("/manufacturers")
public class ManufacturersController {
	
	 @Autowired
	 private MyManufacturerRepository manufacturersRepo;
	
	@GetMapping("/getall")
	public Iterable<Manufacturer> getAllManufacturers() {
		return manufacturersRepo.findAll();		
	}
	
	@GetMapping(path = "/get/{Id}", produces = "application/json;charset=UTF-8")
	public Optional<Manufacturer> getManufacturer(@PathVariable("Id") Integer manufacturerId) {
		return manufacturersRepo.findById(manufacturerId);
	}

	@PostMapping(path = "/add", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public Optional<Manufacturer> addNewManufacturer(@RequestBody Manufacturer newManu) {		
		// todo: add logginh
		// todo: add saving
		
		Manufacturer mnfr = new Manufacturer("Cherry", "China");
		
		return Optional.of(manufacturersRepo.save(mnfr));
				
	}
	
	public void updateManufacturer() {
		
	}
}

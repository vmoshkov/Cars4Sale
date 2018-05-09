package ru.vm.cars4sale.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
	public ResponseEntity<Manufacturer> addNewManufacturer(@RequestBody Manufacturer newManu) throws ManufacturerException {		
		Manufacturer savedManufacturer = null;
		
		if(newManu==null)
			throw new ManufacturerException("Can't process an empty object");
		
		// we don't expect any id for now
		if(newManu.getId()!=null && newManu.getId()>0)
			throw new ManufacturerException("New manufacturer shouldn't have an ID");
				
		// we don't expect repeating names						
		if(manufacturersRepo.existsByName(newManu.getName()))
			throw new ManufacturerException("Manufacturer with name = " + newManu.getName() + " already exists");
			
		savedManufacturer = manufacturersRepo.save(newManu);
				
		return new ResponseEntity<Manufacturer>(savedManufacturer, HttpStatus.CREATED);		
	}
	
	@PostMapping(path = "/edit", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Manufacturer> updateManufacturer(@RequestBody Manufacturer updatedManu) throws ManufacturerException {
		Manufacturer savedManufacturer = null;
		
		if(updatedManu==null)
			throw new ManufacturerException("Can't process an empty object");
		
		// we expect any id for update
		if(updatedManu.getId()==null || updatedManu.getId()==0)
			throw new ManufacturerException("Manufacturer should have an ID");
						
		savedManufacturer = manufacturersRepo.findById(updatedManu.getId()).orElse(null);
		
		// we expect it exists
		if(savedManufacturer==null)
			throw new ManufacturerException("Manufacturer with id = " + updatedManu.getId() + " doesn't exists");
		
		// check for repeating names
		List<Manufacturer> entities = manufacturersRepo.findByIdNotAndName(updatedManu.getId(), updatedManu.getName());
		if (entities!=null && !entities.isEmpty())
			throw new ManufacturerException("Another Manufacturer with name = " + updatedManu.getName() + " already exists." +
						"Unable to update Manufacturer with = " + updatedManu.getId());
		
		// copy new values			
		savedManufacturer = manufacturersRepo.save(updatedManu);
		
		return new ResponseEntity<Manufacturer>(savedManufacturer, HttpStatus.OK);
	}
	
	@PostMapping(path = "/delete", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public ResponseEntity<String> deleteManufacturer(@RequestBody Manufacturer deletedManu) throws ManufacturerException {
		if(deletedManu==null)
			throw new ManufacturerException("Can't process an empty object");
		
		// we expect any id for update
		if(deletedManu.getId()==null || deletedManu.getId()==0)
			throw new ManufacturerException("Manufacturer should have an ID");
					
		// we expect it exists
		if(!manufacturersRepo.findById(deletedManu.getId()).isPresent())
			throw new ManufacturerException("Manufacturer with id = " + deletedManu.getId() + " doesn't exists, nothing to delete");
		
		manufacturersRepo.deleteById(deletedManu.getId());
		
		return new ResponseEntity<String>("Manufacturer with id = " + deletedManu.getId() + " successfully deleted.", HttpStatus.OK);	
	}
	
	@ExceptionHandler(ManufacturerException.class)
	public ResponseEntity<String> exceptionHandler(Exception ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

}

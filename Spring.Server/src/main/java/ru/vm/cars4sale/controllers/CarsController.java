package ru.vm.cars4sale.controllers;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

import ru.vm.cars4sale.data.MyCarRepository;
import ru.vm.cars4sale.models.Car;

@RestController
@RequestMapping("/cars")
public class CarsController {
	private static final Logger logger = LogManager.getLogger(CarsController.class);
	
	@Autowired
	private MyCarRepository carsRepo;
	
	@GetMapping("/getall")
	public Iterable<Car> getAllCas() {
		return carsRepo.findAll();		
	}
	
	@GetMapping(path = "/get/{Id}", produces = "application/json;charset=UTF-8")
	public Optional<Car> getCar(@PathVariable("Id") Integer carId) {
		return carsRepo.findById(carId);
	}
	
	@PostMapping(path = "/add", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Car> addNewCar(@RequestBody Car newCar) throws Exception {		
		Car savedCar = null;
		
		if(newCar==null)
			throw new CarException("Can't process an empty object");
		
		// we don't expect any id for now
		if(newCar.getId()!=null && newCar.getId()>0)
			throw new CarException("New car shouldn't have an ID");
					
		try {
						
			savedCar = carsRepo.save(newCar);
		}
		catch(Exception ex) {
			throw new CarException(" Can't save new car due to nested error: " + ex.toString());
		}
				
		return new ResponseEntity<Car>(savedCar, HttpStatus.CREATED);		
	}
	
	@PostMapping(path = "/edit", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Car> updateCar(@RequestBody Car updatedCar) throws CarException {
		Car savedCar = null;
		
		if(updatedCar==null)
			throw new CarException("Can't process an empty object");
		
		// we expect any id for update
		if(updatedCar.getId()==null || updatedCar.getId()==0)
			throw new CarException("Car should have an ID");
						
		savedCar = carsRepo.findById(updatedCar.getId()).orElse(null);
		
		// we expect it exists
		if(savedCar==null)
			throw new CarException("Car with id = " + updatedCar.getId() + " doesn't exists");
				
		// copy new values			
		savedCar = carsRepo.save(updatedCar);
		
		return new ResponseEntity<Car>(savedCar, HttpStatus.OK);
	}
	
	@PostMapping(path = "/delete", consumes = "application/json", produces = "application/json;charset=UTF-8")
	public ResponseEntity<String> deleteCar(@RequestBody Car deletedCar) throws CarException {
		if(deletedCar==null)
			throw new CarException("Can't process an empty object");
		
		// we expect any id for update
		if(deletedCar.getId()==null || deletedCar.getId()==0)
			throw new CarException("Car should have an ID");
					
		// we expect it exists
		if(!carsRepo.findById(deletedCar.getId()).isPresent())
			throw new CarException("Car with id = " + deletedCar.getId() + " doesn't exists, nothing to delete");
		
		carsRepo.deleteById(deletedCar.getId());
		
		return new ResponseEntity<String>("Car with id = " + deletedCar.getId() + " successfully deleted.", HttpStatus.OK);	
	}
	
	@ExceptionHandler(CarException.class)
	public ResponseEntity<String> exceptionHandler(Exception ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

}

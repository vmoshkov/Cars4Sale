package ru.vm.cars4sale.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ru.vm.cars4sale.models.Manufacturer;

/**
 * Created by administrator on 02.11.16.
 */
public interface MyManufacturerRepository extends CrudRepository<Manufacturer, Integer>  {
	
	List<Manufacturer> findByName(String name);
	List<Manufacturer> findByIdNotAndName(Integer Id, String name);
	boolean existsByName(String name);
	
}

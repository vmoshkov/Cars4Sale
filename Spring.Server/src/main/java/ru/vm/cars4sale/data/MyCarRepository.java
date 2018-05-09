package ru.vm.cars4sale.data;

import org.springframework.data.repository.CrudRepository;

import ru.vm.cars4sale.models.Car;

public interface MyCarRepository extends CrudRepository<Car, Integer> {

}

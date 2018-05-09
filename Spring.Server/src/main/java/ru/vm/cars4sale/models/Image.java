package ru.vm.cars4sale.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Image generated by hbm2java
 */
@Entity
@Table(name = "image", catalog = "UNO")
public class Image implements java.io.Serializable {

	private Integer id;
	private Car car;
	private String filename;
	private byte[] data;

	public Image() {
	}

	public Image(Car car, String filename, byte[] data) {
		this.car = car;
		this.filename = filename;
		this.data = data;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	//@ManyToOne(fetch = FetchType.LAZY)
	//@JoinColumn(name = "car_id", nullable = false)
	/*
	 * To declare a side as not responsible for the relationship, the attribute mappedBy is used. 
	 * mappedBy refers to the property name of the association on the owner side. 
	 */
	@OneToOne(fetch = FetchType.LAZY /*, mappedBy="images"*/)
	public Car getCar() {
		return this.car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	@Column(name = "filename", nullable = false)
	public String getFilename() {
		return this.filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	@Column(name = "data", nullable = false)
	public byte[] getData() {
		return this.data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
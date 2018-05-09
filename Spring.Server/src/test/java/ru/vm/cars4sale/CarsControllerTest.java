package ru.vm.cars4sale;

import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import ru.vm.cars4sale.data.MyManufacturerRepository;
import ru.vm.cars4sale.models.Car;
import ru.vm.cars4sale.models.Manufacturer;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CarsControllerTest {
	
	private static final Logger logger = LogManager.getLogger(CarsControllerTest.class);
	
	private MockMvc mockMvc;
	private static Car singleCar;
	private static JSONObject newCar; // for each test new instance of ManufacturersControllerTest is initialized...
	
	@Autowired
    private WebApplicationContext wac;
	@Autowired
	private MyManufacturerRepository manufacturersRepo;
	
	@Before
	public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	
	@Test
	public void test2_verifyAllCarsList() throws Exception {
		// List all cars
		mockMvc.perform(MockMvcRequestBuilders.get("/cars/getall").accept(MediaType.APPLICATION_JSON_UTF8))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.jsonPath("$").isArray())  // here should be an array
			.andDo(MockMvcResultHandlers.print());
	}
	
	@Test
	public void test1_verifyAddNew() throws Exception {
				
		newCar = new JSONObject();
		
		newCar.put("model","X5");
		newCar.put("year", 2015);
		newCar.put("prise", 30000);
		newCar.put("contactPerson", "Dennis Frightich");
		newCar.put("contactPhone", "111-35-555-34-21");
		newCar.put("description", "Just a good family car");
		newCar.put("entryDate", java.time.LocalDate.parse("2012-11-23"));
		
				
		// we expect only one BMW manufacturer
		Manufacturer bmwManufacturer = manufacturersRepo.findByName("BMW").get(0);
		assertNotNull(bmwManufacturer);
		
		JSONObject bmw = new JSONObject();
		
		bmw.put("id", bmwManufacturer.getId());
		bmw.put("name", bmwManufacturer.getName());
		bmw.put("country", bmwManufacturer.getCountry());
		
		newCar.put("manufacturer", bmw);
		
		// get list of images
		JSONArray carImages = new JSONArray();
		
		for (int im=1; im<5; im++)
		{
			File imageFile = new File(this.getClass().getClassLoader().getResource("files/" + im + ".png").toURI());
					
			byte[] fileBytes = new byte[(int) imageFile.length()];
			try {
			  	 FileInputStream fis = new FileInputStream(imageFile);
			     fis.read(fileBytes);
		    } catch (FileNotFoundException e) {
			     System.out.println("File Not Found.");
			     e.printStackTrace();
			}
			catch (IOException e1) {
			     System.out.println("Error Reading The File.");
			     e1.printStackTrace();
			}
			
			JSONObject newImage = new JSONObject();
			
			newImage.put("filename", imageFile.getName());
			
			// byte[] is converted to base64-string, because I gonna put is as json
			newImage.put("data", Base64.getEncoder().encodeToString(fileBytes));
											
			carImages.put(newImage);
		}
				
		newCar.put("images", carImages);
		
		logger.debug(newCar.getJSONArray("images").length());
		
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/cars/add").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newCar.toString()))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber()) // new id is expected to be a number
			.andReturn();
		
		newCar = new JSONObject(result.getResponse().getContentAsString());	
		
	}
	
	@Test
	public void test3_verifyGet() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/cars/get/" + newCar.get("id")).
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().json(newCar.toString()));
	}
	
	@Test
	public void test4_verifyUpdate() throws Exception {
		newCar.put("prise", 14000); //change prise
		
		mockMvc.perform(MockMvcRequestBuilders.post("/cars/edit").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newCar.toString()))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().json(newCar.toString())); // return object is the same
	}
	
	@Test
	public void test5_verifyDelete() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/cars/delete").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newCar.toString()))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk()); // just verify that response is OK
	}
	
	@Test
	public void test6_verifyIsNull() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/cars/get/" + newCar.get("id")).
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().string("null")); // verify that we can't find manufacturer with such id any more
	}

}

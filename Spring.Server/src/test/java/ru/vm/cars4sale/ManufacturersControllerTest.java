package ru.vm.cars4sale;

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

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ManufacturersControllerTest {
	
	private MockMvc mockMvc;
	private static JSONObject newManufacturer; // for each test new instance of ManufacturersControllerTest is initialized...
	
	@Autowired
    private WebApplicationContext wac;
	
	@Before
	public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	
	@Test
	public void test2_verifyAllManufacturersList() throws Exception {
		// List all manufacturers
		mockMvc.perform(MockMvcRequestBuilders.get("/manufacturers/getall").accept(MediaType.APPLICATION_JSON_UTF8))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.jsonPath("$").isArray())  // here should be an array
			.andDo(MockMvcResultHandlers.print());
	}

	@Test
	public void test1_verifyAddNew() throws Exception {
		String manuName = "Test" + String.valueOf(System.currentTimeMillis());
		String newEntity = "{\"name\":\"" + manuName + "\",\"country\":\"Sweeden\"}";
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/manufacturers/add").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newEntity))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber()) // new id is expected to be a number
			.andReturn();
		
		newManufacturer = new JSONObject(result.getResponse().getContentAsString());	
	}
	
	@Test
	public void test3_verifyGet() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/manufacturers/get/" + newManufacturer.get("id")).
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().json(newManufacturer.toString()));
	}
	
	@Test
	public void test4_verifyUpdate() throws Exception {
		newManufacturer.put("country", "USA"); //change country
		
		mockMvc.perform(MockMvcRequestBuilders.post("/manufacturers/edit").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newManufacturer.toString()))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().json(newManufacturer.toString())); // return object is the same 
	}
	
	@Test
	public void test5_verifyDelete() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/manufacturers/delete").
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON).
				content(newManufacturer.toString()))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk()); // just verify that response is OK
	}
	
	@Test
	public void test6_verifyIsNull() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/manufacturers/get/" + newManufacturer.get("id")).
				accept(MediaType.APPLICATION_JSON_UTF8).
				contentType(MediaType.APPLICATION_JSON))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().contentType("application/json;charset=UTF-8"))
			.andExpect(MockMvcResultMatchers.content().string("null")); // verify that we can't find manufacturer with such id any more
	}
}

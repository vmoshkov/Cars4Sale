package ru.vm.cars4sale.data;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;

import ru.vm.cars4sale.models.Manufacturer;

public class CustomIDGenerator implements IdentifierGenerator {
	
	 private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object arg1) throws HibernateException {
		
		EntityManager em = session.getFactory().createEntityManager();
				
		CriteriaBuilder builder = em.getCriteriaBuilder();
		 
		// SELECT MAX(ID) FROM Manufacturer
		// Type of result
		CriteriaQuery<Integer> criteria = builder.createQuery( Integer.class );	
		// From ...
		Root<Manufacturer> manufacturerRoot = criteria.from(Manufacturer.class);	
		// SELECT expression
		criteria.select(builder.max(manufacturerRoot.get("id")));
		
		Integer maxId = em.createQuery( criteria ).getSingleResult();    
		
		logger.debug("Next value will be " + (maxId+1));
		
		return (maxId+1);
	}

}

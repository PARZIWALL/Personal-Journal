package net.engineeringdigest.journalApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootTest
@EnableTransactionManagement
class JournalAppApplicationTests {

	@Test
	void contextLoads() {
	}
	@Bean
	public PlatformTransactionManager function(MongoDatabaseFactory dbFactory){
		return new MongoTransactionManager(dbFactory);
	}

}

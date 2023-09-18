package hu.progmasters.moovsmart;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Property For You",
				description = "The app connects property owners with searchers in Hungary, whether they are selling or renting. " +
						"We aim to make everyone's life easier by listing properties based on the customer's preferences " +
						"and then placing them on a map to help them make a decision, as the area around the property is an important factor. " +
						"Once a prospective tenant or buyer has chosen a property, they are a click away from a simple and easy appointment.",
				version = "1.0.0"
				)
		)

public class MoovsmartApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoovsmartApplication.class, args);
	}

}

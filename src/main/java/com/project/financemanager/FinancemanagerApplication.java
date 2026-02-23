package com.project.financemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FinancemanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinancemanagerApplication.class, args);
	}

}

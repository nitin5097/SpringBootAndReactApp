package com.assignment.developer.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.assignment.developer.backend.model.Group;
import com.assignment.developer.backend.model.GroupRepository;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;
	
@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Test1", "Test2", "Test3",
                "Test4").forEach(name ->
                repository.save(new Group(name))
        );

        Group person = repository.findByName("Test1");
        person.setLastName("Temp");
        person.setAge("30");
        person.setFavColor("Red");
        person.setHobbies("Shopping, Football");
        repository.save(person);

        repository.findAll().forEach(System.out::println);
    }
}
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final CutRoomRepository competitorRepository;

    @Autowired
    public DatabaseLoader(CutRoomRepository repository) {
        this.competitorRepository = repository;
    }

	@Override
	public void run(String... strings) throws Exception {
		this.competitorRepository.save(new CutRoom("noon","B5705153","100001"));
		this.competitorRepository.save(new CutRoom("keng","B5805153","100002"));
		this.competitorRepository.save(new CutRoom("Jhon","B5905153","100003"));
		this.competitorRepository.save(new CutRoom("Hook","B6005153","100004"));
	}
}
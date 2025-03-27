package com.example.MongoSpring.repository;

import com.example.MongoSpring.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends MongoRepository<Budget, String> {
    Budget findByCategory(String category);
}

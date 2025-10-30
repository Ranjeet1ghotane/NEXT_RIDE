package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}

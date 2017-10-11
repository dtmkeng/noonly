package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class CutRoom {

	private @Id @GeneratedValue Long id;
	private String username;
	private String userid;
	private String useridroom;

	private CutRoom() {}
	
	public CutRoom(String username, String userid, String useridroom) {
		this.username = username;
		this.userid = userid;
		this.useridroom = useridroom;
	}
}
package com.dmsproject.dms.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dmsproject.dms.GreetMessage;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Greeting {

    @RequestMapping(
		value = "/greeting",
		method = RequestMethod.GET,
		produces = "application/json"
	)
    @ResponseBody
    public GreetMessage greeting() {
        return new GreetMessage(7, "Honey");
    }
}

package co.com.hyg.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
	
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView andView = new ModelAndView("index");
		return andView;
	}
	
	@RequestMapping("/indexP")
	public ModelAndView indexP(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView andView = new ModelAndView("indexP");
		return andView;
	}
}
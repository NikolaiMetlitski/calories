package com.app.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.app.Utils;
import com.app.bo.User;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public class AuthSuccessHandlerImpl implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        User user = Utils.getCurrentUser();
        ObjectMapper om = new ObjectMapper();
        om.writeValue(response.getWriter(), user);

        response.flushBuffer();
        response.setStatus(HttpStatus.OK.value());
    }
}

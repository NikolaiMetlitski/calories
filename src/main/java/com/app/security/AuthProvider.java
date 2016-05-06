package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.app.bo.User;
import com.app.persistence.DAOFactory;
import com.app.persistence.UserDAO;

/**
 * Created by Admin on 4/17/2016.
 */
public class AuthProvider implements AuthenticationProvider {

    public static String AUTH_NAME_PREFIX = "ROLE_";

    @Autowired
    @Qualifier("DAOFactory")
    DAOFactory daoFactory;

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        if (!StringUtils.hasText(username)) {
            throw new BadCredentialsException("No login provided");
        }
        if (!StringUtils.hasText(password)) {
            throw new BadCredentialsException("No password provided");
        }

        UserDAO userDAO = daoFactory.getUserDAO();
        User user = userDAO.find(username);

        if (user == null) {
            throw new BadCredentialsException("Invalid user");
        }
        if (!password.equals(user.getPassword())) {
            throw new BadCredentialsException("Password incorrect");
        }

        UserDetails userDetails = new UserDetailsImpl(user);

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authClass) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authClass);
    }
}

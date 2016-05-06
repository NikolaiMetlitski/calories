package com.app;

import org.springframework.security.core.context.SecurityContextHolder;

import com.app.bo.User;
import com.app.security.UserDetailsImpl;

/**
 * Created by nikolai.metlitski on 4/21/2016.
 */
public class Utils {

    /**
     * Private constructor.
     */
    private Utils() {
    }

    public static User getCurrentUser() {
        return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getDomainUser();
    }
}

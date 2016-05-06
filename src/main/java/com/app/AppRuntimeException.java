package com.app;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public class AppRuntimeException extends RuntimeException {

    public AppRuntimeException(String msg, Throwable ex) {
        super(msg, ex);
    }

    public AppRuntimeException(String msg) {
        super(msg);
    }

    public AppRuntimeException(Throwable ex) {
        super(ex);
    }
}

package com.onlinefood.dto;

import com.onlinefood.model.User;
import lombok.Data;

import java.util.Set;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String roles;
}

package com.onlinefood.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDto {

    private Long id;
    private String fileName;
    private String fileType;
    private String downloadUrl;

}

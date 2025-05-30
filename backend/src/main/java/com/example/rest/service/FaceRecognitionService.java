package com.example.rest.service;

import org.springframework.web.multipart.MultipartFile;
public interface FaceRecognitionService {
    String recognize(MultipartFile image);
}

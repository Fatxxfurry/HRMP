package com.example.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.model.FaceEncoding;
import com.example.rest.service.FaceEncodingService;

@RestController
@CrossOrigin
@RequestMapping("/api/face-encodings")
public class FaceEncodingController {

    private final FaceEncodingService faceEncodingService;

    @Autowired
    public FaceEncodingController(FaceEncodingService faceEncodingService) {
        this.faceEncodingService = faceEncodingService;
    }

    @GetMapping
    public ResponseEntity<List<FaceEncoding>> getAllFaceEncodings() {
        List<FaceEncoding> faceEncodings = faceEncodingService.getAllFaceEncodings();
        return new ResponseEntity<>(faceEncodings, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaceEncoding(@PathVariable Long id) {
        faceEncodingService.deleteFaceEncoding(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


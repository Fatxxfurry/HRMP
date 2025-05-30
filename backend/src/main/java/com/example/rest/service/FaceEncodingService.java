package com.example.rest.service;
import java.util.List;

import com.example.rest.model.FaceEncoding;

public interface FaceEncodingService {
    FaceEncoding createFaceEncoding(FaceEncoding faceEncoding);
    String getEncodingCodeFromPython(byte[] image);
    List<FaceEncoding> getAllFaceEncodings();
    FaceEncoding updatFaceEncoding(FaceEncoding faceEncoding);
    void deleteFaceEncoding(Long id);
}

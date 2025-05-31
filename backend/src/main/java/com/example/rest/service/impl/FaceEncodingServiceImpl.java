package com.example.rest.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.rest.model.Employee;
import com.example.rest.model.FaceEncoding;
import com.example.rest.repository.FaceEncodingRepository;
import com.example.rest.service.FaceEncodingService;

@Service
public class FaceEncodingServiceImpl implements FaceEncodingService {

    private final FaceEncodingRepository faceEncodingRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public FaceEncodingServiceImpl(FaceEncodingRepository faceEncodingRepository, RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.faceEncodingRepository = faceEncodingRepository;}


        @Override
    public FaceEncoding createFaceEncoding(Employee employee, String encodingJson) {
        FaceEncoding existingFaceEncoding = faceEncodingRepository.findFirstByEmployee(employee);

        if (existingFaceEncoding != null) {
            existingFaceEncoding.setEncodingJson(encodingJson);
            FaceEncoding savedEncoding = faceEncodingRepository.save(existingFaceEncoding);

            // Đảm bảo flush để DB thực sự có dữ liệu
            faceEncodingRepository.flush();

            // Gọi API Flask
            ResponseEntity<String> response = restTemplate.getForEntity(
                    "http://127.0.0.1:5000/get-encodings",
                    String.class
            );

            return savedEncoding;
        }

        FaceEncoding faceEncoding = new FaceEncoding();
        faceEncoding.setEmployee(employee);
        faceEncoding.setEncodingJson(encodingJson);

        FaceEncoding savedEncoding = faceEncodingRepository.save(faceEncoding);
        faceEncodingRepository.flush();

        ResponseEntity<String> response = restTemplate.getForEntity(
                "http://127.0.0.1:5000/get-encodings",
                String.class
        );

        return savedEncoding;
    }

    @Override
    public String getEncodingCodeFromPython(byte[] image) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Chuẩn bị file để gửi qua multipart
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new ByteArrayResource(image) {
            @Override
            public String getFilename() {
                return "image.jpg";
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Gửi yêu cầu POST
        ResponseEntity<String> response = restTemplate.postForEntity(
                "http://127.0.0.1:5000/encode",
                requestEntity,
                String.class
        );

        return response.getBody().toString();
    }
    @Override
    public List<FaceEncoding> getAllFaceEncodings() {
        return faceEncodingRepository.findAll();
    }

    @Override
    public FaceEncoding updatFaceEncoding(FaceEncoding faceEncoding) {
        return faceEncodingRepository.save(faceEncoding);
    }

    @Override
    public void deleteFaceEncoding(Long id) {
                    ResponseEntity<String> response = restTemplate.getForEntity(
                    "http://127.0.0.1:5000/get-encodings",
                    String.class
            );
        faceEncodingRepository.deleteById(id);
    }
}


package com.dh.turistearte.turistearte.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {

    void uploadFile(MultipartFile file);

    String generateImageUrl (String fileName);

}

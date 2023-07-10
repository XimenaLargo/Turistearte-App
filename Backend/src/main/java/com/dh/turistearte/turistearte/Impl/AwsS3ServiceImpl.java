package com.dh.turistearte.turistearte.Impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dh.turistearte.turistearte.service.AwsS3Service;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;

@Log4j2
@Service
public class AwsS3ServiceImpl implements AwsS3Service {

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Override
    public void uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            InputStream inputStream = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            PutObjectRequest request = new PutObjectRequest(bucketName, fileName, inputStream, metadata);
            amazonS3.putObject(request);
            log.info("Archivo subido con éxito a Amazon S3. Nombre de archivo: " + fileName);
        } catch (IOException e) {
            log.error("Error al cargar el archivo a Amazon S3: " + e.getMessage(), e);
        }
    }

    @Override
    public String generateImageUrl(String fileName) {
        return "https://" + bucketName + ".s3.us-east-2.amazonaws.com/" + fileName;
    }

}

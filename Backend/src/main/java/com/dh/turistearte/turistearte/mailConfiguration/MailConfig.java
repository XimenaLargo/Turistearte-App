package com.dh.turistearte.turistearte.mailConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender getJavaMailSender(MailProperties mailProperties) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailProperties.host());
        mailSender.setPort(mailProperties.port());
        mailSender.setUsername(mailProperties.username());
        mailSender.setPassword(mailProperties.password());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", mailProperties.protocol());
        props.put("mail.smtp.auth", mailProperties.auth());
        props.put("mail.smtp.starttls.enable", mailProperties.starttls());
        props.put("mail.debug", mailProperties.debug());
        return mailSender;
    }

}
package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.CitizenUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import com.majorproject.smart_pipeline_m_system.repository.CitizenUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Service
public class CitizenServices {

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    CitizenUserRepo citizenUserRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    @Autowired
    JwtService jwtService;

    public ResponseEntity<AuthResponse> login(CitizenUserModel userCredentials){
        String token=null;
        UserBaseModel dbUser = null;
        System.out.println("38:"+userCredentials.getUserEmail());
        System.out.println("39:"+userCredentials.getPassword());
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(userCredentials.getUserEmail(),userCredentials.getPassword()));
            System.out.print(authentication.isAuthenticated());
            if(authentication.isAuthenticated()) {
                dbUser = citizenUserRepo.findByUserEmail(userCredentials.getUserEmail());
                System.out.print("DB: "+dbUser);
                System.out.println(dbUser);
                token = jwtService.generateToken(userCredentials.getUserEmail(), dbUser.getRole(),dbUser);
            }else{
                System.out.println("Not authenticate");
            }
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token,"CITIZEN",null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AuthResponse(
                                    false,
                                    "Invalid username or password",
                                    null,null,null
                            )
                    );
        }
    }

    public ResponseEntity<Map<String,String>> regester(@RequestBody CitizenUserModel user){
        Map<String,String> result = new HashMap<>();
        user.setPassword(encoder.encode(user.getPassword()));
        try{
            CitizenUserModel saveResponce = citizenUserRepo.save(user);
            if(saveResponce!=null){
                result.put("status","true");
                result.put("message","User  Account is regestered successfully!");
            }
        }catch (Exception e){
            result.put("status","false");
            result.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}

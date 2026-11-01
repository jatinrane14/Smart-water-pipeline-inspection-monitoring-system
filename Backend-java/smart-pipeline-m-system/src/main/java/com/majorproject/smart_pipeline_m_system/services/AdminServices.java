package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.AdminUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import com.majorproject.smart_pipeline_m_system.repository.AdminUserRepo;
import com.majorproject.smart_pipeline_m_system.repository.CitizenUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServices {
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    AdminUserRepo adminUserRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(11);

    @Autowired
    JwtService jwtService;


    public ResponseEntity<AuthResponse> login(AdminUserModel userCredentials) {
        String token=null;
        AdminUserModel dbUser = null;
        System.out.println("38:"+userCredentials.getUserEmail());
        System.out.println("39:"+userCredentials.getPassword());
        try{
            Authentication authentication =
                    authManager
                            .authenticate(new UsernamePasswordAuthenticationToken(userCredentials.getUserEmail(),userCredentials.getPassword()));
            System.out.print(authentication.isAuthenticated());
            if(authentication.isAuthenticated()) {
                dbUser = (AdminUserModel) adminUserRepo.findByUserEmail(userCredentials.getUserEmail());

                token = jwtService.generateToken(userCredentials.getUserEmail(), dbUser.getRole(),dbUser);
            }else{
                System.out.println("Not authenticate");
            }
            return ResponseEntity.ok(new AuthResponse(true,"Login Successfull",token,"ADMIN",dbUser.getDesigination()));
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
}

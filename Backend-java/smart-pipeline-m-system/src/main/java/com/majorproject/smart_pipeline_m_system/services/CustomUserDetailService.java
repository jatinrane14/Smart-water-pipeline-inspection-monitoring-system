package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import com.majorproject.smart_pipeline_m_system.model.UserPrinciple;
import com.majorproject.smart_pipeline_m_system.repository.AdminUserRepo;
import com.majorproject.smart_pipeline_m_system.repository.CitizenUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    AdminUserRepo adminUserRepo;

    @Autowired
    CitizenUserRepo citizenUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBaseModel user=null;
        user = citizenUserRepo.findByUserEmail(username);
        System.out.print("From Load: "+user.getUserEmail());
        if(user ==null){
            user = adminUserRepo.findByUserEmail(username);
        }
        return new UserPrinciple(user);
    }
}

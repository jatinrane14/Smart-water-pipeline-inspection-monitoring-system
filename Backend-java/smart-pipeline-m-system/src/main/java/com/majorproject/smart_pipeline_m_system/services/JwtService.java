package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.Enums.Role;
import com.majorproject.smart_pipeline_m_system.model.AdminUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey = "";

    public String generateToken(String username, Role role, UserBaseModel dbUser){
        Map<String,Object> claims=  new HashMap<>();
        claims.put("role",role);
        claims.put("name",dbUser.getName());
        if(dbUser instanceof AdminUserModel officer){
            claims.put("designation",officer.getDesigination());
        }
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 *60 *60*1000))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {

        byte[] keyBytes =
                Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    };
    private <T> T extractClaim(String token, Function<Claims,T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return  claimResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

}

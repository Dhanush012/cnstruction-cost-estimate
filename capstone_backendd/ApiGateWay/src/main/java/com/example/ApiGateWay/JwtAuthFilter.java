package com.example.ApiGateWay;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

	private static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private final Key secretKey;

    public JwtAuthFilter() {
        super(Config.class);
        this.secretKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return unauthorizedResponse(exchange, "Missing or invalid Authorization header");
            }

            String token = authHeader.substring(7);
            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                String role = claims.get("role", String.class);
                String email = claims.get("email", String.class);

                exchange.getRequest().mutate()
                        .header("X-User-Role", role != null ? role : "")
                        .header("X-User-Email", email != null ? email : "")
                        .build();

                return chain.filter(exchange);
            } catch (Exception e) {
                return unauthorizedResponse(exchange, "Invalid JWT token: " + e.getMessage());
            }
        };
    }

    private Mono<Void> unauthorizedResponse(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
        return exchange.getResponse().writeWith(Mono.just(buffer));
    }
    public static class Config {
        private List<String> allowedRoles = new ArrayList<>();

        public List<String> getAllowedRoles() {
            return allowedRoles;
        }

        public void setAllowedRoles(String allowedRoles) {
            this.allowedRoles = allowedRoles != null ? List.of(allowedRoles.split(",")) : new ArrayList<>();
        }
    }

}

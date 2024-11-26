package alergicos_al_codigo.example.menurapido.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import alergicos_al_codigo.example.menurapido.entities.UserEntity;
import alergicos_al_codigo.example.menurapido.user.UserService;

@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private UserService userService;

    AuthController(
            UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {
        UserEntity userEntity = userService.findByEmail(email);
        if (userEntity == null) {
            return ResponseEntity.status(401).body("User not found");
        }
        if (!userEntity.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid password");
        }
        return ResponseEntity.ok("Login successful");
    }
}

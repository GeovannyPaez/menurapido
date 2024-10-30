package alergicos_al_codigo.example.menurapido.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Rutas donde aplicar la configuración
                .allowedOrigins("http://127.0.0.1:5500") // Origen permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*")
                .allowCredentials(true); // Habilitar credenciales
    }
}

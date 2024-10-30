package alergicos_al_codigo.example.menurapido.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreateUserDto {

    private String name;
    private String email;
    private String password;
}

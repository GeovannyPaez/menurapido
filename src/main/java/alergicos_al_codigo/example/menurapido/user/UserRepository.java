package alergicos_al_codigo.example.menurapido.user;

import org.springframework.data.jpa.repository.JpaRepository;

import alergicos_al_codigo.example.menurapido.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}

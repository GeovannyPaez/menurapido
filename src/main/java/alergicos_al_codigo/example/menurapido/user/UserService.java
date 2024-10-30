package alergicos_al_codigo.example.menurapido.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alergicos_al_codigo.example.menurapido.entities.UserEntity;
import alergicos_al_codigo.example.menurapido.user.dtos.CreateUserDto;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    public Optional<UserEntity> findById(Long id) {
        return userRepository.findById(id);
    }

    public UserEntity save(CreateUserDto user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setName(user.getEmail());
        return userRepository.save(userEntity);
    }

    public UserEntity updateUser(Long id, UserEntity updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
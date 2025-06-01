import com.example.rest.dto.LoginResponse;
import com.example.rest.exception.CustomException;
import com.example.rest.model.User;
import com.example.rest.repository.UserRepository;
import com.example.rest.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setUp() {
        // Khởi tạo dữ liệu mẫu
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("password123");
        user.setRole("ADMIN");
    }

    @Test
    void testLogin_Success() {
        // Arrange
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // Act
        LoginResponse response = authService.login("testuser", "password123");

        // Assert
        assertNotNull(response);
        assertEquals("testuser", response.getUsername());
        assertEquals("ADMIN", response.getRole());
        assertEquals("Login successful", response.getMessage());
        assertEquals(1L, response.getId());
        verify(userRepository).findByUsername("testuser");
    }

    @Test
    void testLogin_UserNotFound() {
        // Arrange
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        // Act & Assert
        CustomException exception = assertThrows(CustomException.class, () -> {
            authService.login("unknown", "password123");
        });
        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findByUsername("unknown");
    }

    @Test
    void testLogin_InvalidPassword() {
        // Arrange
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // Act & Assert
        CustomException exception = assertThrows(CustomException.class, () -> {
            authService.login("testuser", "wrongpassword");
        });
        assertEquals("Invalid username or password", exception.getMessage());
        verify(userRepository).findByUsername("testuser");
    }
}
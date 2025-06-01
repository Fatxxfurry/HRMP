import com.example.rest.model.Employee;
import com.example.rest.model.enums.EmployeeRole;
import com.example.rest.model.enums.Gender;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee employee;

    @BeforeEach
    void setUp() {
        // Khởi tạo dữ liệu mẫu
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");
        employee.setAddress("Hanoi");
        employee.setRole(EmployeeRole.ROLE_USER); // Sử dụng enum EmployeeRole
        employee.setEmail("nva@example.com");
        employee.setPhone("0123456789");
        employee.setPassword("password123");
        employee.setAge(30);
        employee.setGender(Gender.MALE); // Giả sử Gender có MALE
        employee.setIdentification("123456789");
        employee.setImage("default.jpg");
        employee.setUsername("nguyenvana");
        employee.setBirth_date(LocalDate.of(1993, 1, 1));
        employee.setPosition("Developer");
        employee.setHire_date(LocalDate.of(2023, 1, 1));
        employee.setStatus(true);
        employee.setAvatar("avatar.jpg");
    }

    @Test
    void testCreateEmployee() {
        // Arrange
        when(employeeRepository.save(employee)).thenReturn(employee);

        // Act
        Employee result = employeeService.createEmployee(employee);

        // Assert
        assertNotNull(result);
        assertEquals(employee, result);
        verify(employeeRepository).save(employee);
    }

    @Test
    void testGetAllEmployees() {
        // Arrange
        List<Employee> employees = Arrays.asList(employee);
        when(employeeRepository.findAll()).thenReturn(employees);

        // Act
        List<Employee> result = employeeService.getAllEmployees();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(employee, result.get(0));
        verify(employeeRepository).findAll();
    }

    @Test
    void testGetEmployeeById_Success() {
        // Arrange
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        // Act
        Employee result = employeeService.getEmployeeById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(employee, result);
        verify(employeeRepository).findById(1L);
    }

    @Test
    void testGetEmployeeById_NotFound() {
        // Arrange
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Employee result = employeeService.getEmployeeById(1L);

        // Assert
        assertNull(result);
        verify(employeeRepository).findById(1L);
    }

    @Test
    void testUpdateEmployee_Success() {
        // Arrange
        Employee updatedEmployee = new Employee();
        updatedEmployee.setName("Nguyen Van B");
        updatedEmployee.setEmail("nvb@example.com");
        updatedEmployee.setRole(EmployeeRole.ROLE_MANAGER);
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        // Act
        Employee result = employeeService.updateEmployee(1L, updatedEmployee);

        // Assert
        assertNotNull(result);
        assertEquals("Nguyen Van B", result.getName());
        assertEquals("nvb@example.com", result.getEmail());
        assertEquals(EmployeeRole.ROLE_MANAGER, result.getRole());
        verify(employeeRepository).findById(1L);
        verify(employeeRepository).save(employee);
    }

    @Test
    void testUpdateEmployee_NotFound() {
        // Arrange
        Employee updatedEmployee = new Employee();
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Employee result = employeeService.updateEmployee(1L, updatedEmployee);

        // Assert
        assertNull(result);
        verify(employeeRepository).findById(1L);
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    void testUpdateEmployee_NullFields() {
        // Arrange
        Employee updatedEmployee = new Employee(); // Tất cả các trường đều null
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        // Act
        Employee result = employeeService.updateEmployee(1L, updatedEmployee);

        // Assert
        assertNotNull(result);
        assertEquals("Nguyen Van A", result.getName()); // Không thay đổi vì updatedEmployee có name null
        verify(employeeRepository).findById(1L);
        verify(employeeRepository).save(employee);
    }

    @Test
    void testDeleteEmployee() {
        // Arrange
        doNothing().when(employeeRepository).deleteById(1L);

        // Act
        employeeService.deleteEmployee(1L);

        // Assert
        verify(employeeRepository).deleteById(1L);
    }

    @Test
    void testUpdateImage_Success() throws IOException {
        // Arrange
        MultipartFile file = new MockMultipartFile("file", "image.jpg", "image/jpeg", "test content".getBytes());
        when(employeeRepository.save(employee)).thenReturn(employee);

        // Act
        Employee result = employeeService.updateImage(employee, file);

        // Assert
        assertNotNull(result);
        assertEquals("1.jpg", result.getImage());
        verify(employeeRepository).save(employee);
    }

    @Test
    void testUpdateImage_IOException() throws IOException {
        // Arrange
        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("image.jpg");
        when(file.getBytes()).thenThrow(new IOException("File error"));

        // Act
        Employee result = employeeService.updateImage(employee, file);

        // Assert
        assertNull(result);
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    void testCreateEmployee_NullInput() {
        // Arrange
        when(employeeRepository.save(null)).thenThrow(new IllegalArgumentException("Employee cannot be null"));

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            employeeService.createEmployee(null);
        });
        assertEquals("Employee cannot be null", exception.getMessage());
        verify(employeeRepository).save(null);
    }
}
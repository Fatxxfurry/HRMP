import com.example.rest.model.Department;
import com.example.rest.model.Employee;
import com.example.rest.repository.DepartmentRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.service.impl.DepartmentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DepartmentServiceImplTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private DepartmentServiceImpl departmentService;

    private Department department;
    private Employee employee;

    @BeforeEach
    void setUp() {
        // Khởi tạo dữ liệu mẫu
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        department = new Department();
        department.setId(1L);
        department.setName("IT Department");
        department.setEmployee(employee);
    }

    @Test
    void testCreateDepartment_Success() {
        // Arrange
        Department inputDepartment = new Department();
        inputDepartment.setName("IT Department");
        inputDepartment.setEmployee(employee);
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(departmentRepository.save(inputDepartment)).thenReturn(department);

        // Act
        Department result = departmentService.createDepartment(inputDepartment);

        // Assert
        assertNotNull(result);
        assertEquals("IT Department", result.getName());
        assertEquals(employee, result.getEmployee());
        verify(employeeRepository).findById(1L);
        verify(departmentRepository).save(inputDepartment);
    }

    @Test
    void testCreateDepartment_EmployeeNotFound() {
        // Arrange
        Department inputDepartment = new Department();
        inputDepartment.setName("IT Department");
        Employee invalidEmployee = new Employee();
        invalidEmployee.setId(2L);
        inputDepartment.setEmployee(invalidEmployee);
        when(employeeRepository.findById(2L)).thenReturn(Optional.empty());
        when(departmentRepository.save(inputDepartment)).thenReturn(inputDepartment);

        // Act
        Department result = departmentService.createDepartment(inputDepartment);

        // Assert
        assertNotNull(result);
        assertEquals("IT Department", result.getName());
        assertNull(result.getEmployee());
        verify(employeeRepository).findById(2L);
        verify(departmentRepository).save(inputDepartment);
    }



    @Test
    void testGetDepartmentById_Success() {
        // Arrange
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));

        // Act
        Department result = departmentService.getDepartmentById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(department, result);
        verify(departmentRepository).findById(1L);
    }

    @Test
    void testGetDepartmentById_NotFound() {
        // Arrange
        when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Department result = departmentService.getDepartmentById(1L);

        // Assert
        assertNull(result);
        verify(departmentRepository).findById(1L);
    }

    @Test
    void testGetAllDepartments() {
        // Arrange
        List<Department> departments = Arrays.asList(department);
        when(departmentRepository.findAll()).thenReturn(departments);

        // Act
        List<Department> result = departmentService.getAllDepartments();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(department, result.get(0));
        verify(departmentRepository).findAll();
    }

    @Test
    void testUpdateDepartment_Success() {
        // Arrange
        Department updatedDepartment = new Department();
        updatedDepartment.setName("HR Department");
        Employee newEmployee = new Employee();
        newEmployee.setId(2L);
        updatedDepartment.setEmployee(newEmployee);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.findById(2L)).thenReturn(Optional.of(newEmployee));
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        // Act
        Department result = departmentService.updateDepartment(1L, updatedDepartment);

        // Assert
        assertNotNull(result);
        assertEquals("HR Department", result.getName());
        assertEquals(newEmployee, result.getEmployee());
        verify(departmentRepository).findById(1L);
        verify(employeeRepository).findById(2L);
        verify(departmentRepository).save(department);
    }

    @Test
    void testUpdateDepartment_NotFound() {
        // Arrange
        Department updatedDepartment = new Department();
        when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Department result = departmentService.updateDepartment(1L, updatedDepartment);

        // Assert
        assertNull(result);
        verify(departmentRepository).findById(1L);
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository, never()).save(any(Department.class));
    }

    @Test
    void testUpdateDepartment_EmployeeNotFound() {
        // Arrange
        Department updatedDepartment = new Department();
        updatedDepartment.setName("HR Department");
        Employee newEmployee = new Employee();
        newEmployee.setId(2L);
        updatedDepartment.setEmployee(newEmployee);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.findById(2L)).thenReturn(Optional.empty());
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        // Act
        Department result = departmentService.updateDepartment(1L, updatedDepartment);

        // Assert
        assertNotNull(result);
        assertEquals("HR Department", result.getName());
        assertNull(result.getEmployee());
        verify(departmentRepository).findById(1L);
        verify(employeeRepository).findById(2L);
        verify(departmentRepository).save(department);
    }

    @Test
    void testUpdateDepartment_NullFields() {
        // Arrange
        Department updatedDepartment = new Department(); // Tất cả các trường đều null
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        // Act
        Department result = departmentService.updateDepartment(1L, updatedDepartment);

        // Assert
        assertNotNull(result);
        assertEquals("IT Department", result.getName()); // Không thay đổi vì name null
        assertEquals(employee, result.getEmployee()); // Không thay đổi vì employee null
        verify(departmentRepository).findById(1L);
        verify(employeeRepository, never()).findById(anyLong());
        verify(departmentRepository).save(department);
    }

    @Test
    void testDeleteDepartment() {
        // Arrange
        doNothing().when(departmentRepository).deleteById(1L);

        // Act
        departmentService.deleteDepartment(1L);

        // Assert
        verify(departmentRepository).deleteById(1L);
    }
}
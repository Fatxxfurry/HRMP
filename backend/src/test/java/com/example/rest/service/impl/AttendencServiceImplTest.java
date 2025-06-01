import com.example.rest.model.Attendence;
import com.example.rest.model.Employee;
import com.example.rest.model.LeaveRequest;
import com.example.rest.model.enums.AttendenceStatus;
import com.example.rest.model.enums.RequestStatus;
import com.example.rest.repository.AttendenceRepository;
import com.example.rest.repository.EmployeeRepository;
import com.example.rest.repository.LeaveRequestRepository;
import com.example.rest.service.impl.AttendencServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AttendencServiceImplTest {

    @Mock
    private AttendenceRepository attendenceRepository;

    @Mock
    private LeaveRequestRepository leaveRequestRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private AttendencServiceImpl attendenceService;

    private Employee employee;
    private Attendence attendence;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("Nguyen Van A");

        attendence = new Attendence();
        attendence.setId(1L);
        attendence.setEmployee(employee);
        attendence.setDate(LocalDate.of(2025, 6, 1));
        attendence.setCheckInTime(LocalTime.of(7, 30));
        attendence.setCheckOutTime(LocalTime.of(17, 0));
        attendence.setStatus(AttendenceStatus.PRESENT);
    }

    @Test
    void testGetAllAttendences() {
        when(attendenceRepository.findAll()).thenReturn(Arrays.asList(attendence));
        List<Attendence> result = attendenceService.getAllAttendences();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(attendence, result.get(0));
        verify(attendenceRepository).findAll();
    }

    @Test
    void testGetAttendenceById_Success() {
        when(attendenceRepository.findById(1L)).thenReturn(Optional.of(attendence));
        Attendence result = attendenceService.getAttendenceById(1L);
        assertNotNull(result);
        assertEquals(attendence, result);
        verify(attendenceRepository).findById(1L);
    }

    @Test
    void testGetAttendenceById_NotFound() {
        when(attendenceRepository.findById(1L)).thenReturn(Optional.empty());
        Attendence result = attendenceService.getAttendenceById(1L);
        assertNull(result);
        verify(attendenceRepository).findById(1L);
    }

    @Test
    void testCreateAttendence_Success() {
        Attendence inputAttendence = new Attendence();
        inputAttendence.setEmployee(employee);
        inputAttendence.setDate(LocalDate.of(2025, 6, 1));
        inputAttendence.setCheckInTime(LocalTime.of(7, 30));
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Collections.emptyList());
        when(attendenceRepository.save(inputAttendence)).thenReturn(attendence);
        Attendence result = attendenceService.createAttendence(inputAttendence);
        assertNotNull(result);
        assertEquals(AttendenceStatus.PRESENT, result.getStatus());
        assertEquals(employee, result.getEmployee());
        verify(employeeRepository).findById(1L);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
        verify(attendenceRepository).save(inputAttendence);
    }

    @Test
    void testCreateAttendence_EmployeeNotFound() {
        Attendence inputAttendence = new Attendence();
        Employee invalidEmployee = new Employee();
        invalidEmployee.setId(1L);
        inputAttendence.setEmployee(invalidEmployee);
        inputAttendence.setDate(LocalDate.of(2025, 6, 1));
        inputAttendence.setCheckInTime(LocalTime.of(7, 30));
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());
        when(attendenceRepository.save(inputAttendence)).thenReturn(inputAttendence);
        Attendence result = attendenceService.createAttendence(inputAttendence);
        assertNotNull(result);
        assertNull(result.getEmployee());
        assertEquals(AttendenceStatus.ABSENT, result.getStatus());
        verify(employeeRepository).findById(1L);
        verify(leaveRequestRepository, never()).findApprovedLeaveByEmployeeAndDate(anyLong(), any());
        verify(attendenceRepository).save(inputAttendence);
    }

    @Test
    void testCreateAttendence_NullInput() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            attendenceService.createAttendence(null);
        });
        assertEquals("Attendance cannot be null", exception.getMessage());
        verify(attendenceRepository, never()).save(any());
        verify(employeeRepository, never()).findById(anyLong());
    }

    @Test
    void testUpdateAttendence_Success() {
        Attendence updatedAttendence = new Attendence();
        updatedAttendence.setCheckInTime(LocalTime.of(8, 15));
        updatedAttendence.setDate(LocalDate.of(2025, 6, 2));
        Employee newEmployee = new Employee();
        newEmployee.setId(2L);
        updatedAttendence.setEmployee(newEmployee);
        when(attendenceRepository.findById(1L)).thenReturn(Optional.of(attendence));
        when(employeeRepository.findById(2L)).thenReturn(Optional.of(newEmployee));
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(2L, LocalDate.of(2025, 6, 2)))
                .thenReturn(Collections.emptyList());
        when(attendenceRepository.save(any(Attendence.class))).thenReturn(attendence);
        Attendence result = attendenceService.updateAttendence(1L, updatedAttendence);
        assertNotNull(result);
        assertEquals(LocalTime.of(8, 15), result.getCheckInTime());
        assertEquals(LocalDate.of(2025, 6, 2), result.getDate());
        assertEquals(newEmployee, result.getEmployee());
        assertEquals(AttendenceStatus.LATE, result.getStatus());
        verify(attendenceRepository).findById(1L);
        verify(employeeRepository).findById(2L);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(2L, LocalDate.of(2025, 6, 2));
        verify(attendenceRepository).save(any(Attendence.class));
    }

    @Test
    void testUpdateAttendence_NotFound() {
        Attendence updatedAttendence = new Attendence();
        when(attendenceRepository.findById(1L)).thenReturn(Optional.empty());
        Attendence result = attendenceService.updateAttendence(1L, updatedAttendence);
        assertNull(result);
        verify(attendenceRepository).findById(1L);
        verify(employeeRepository, never()).findById(anyLong());
        verify(attendenceRepository, never()).save(any(Attendence.class));
    }

    @Test
    void testUpdateAttendence_NullFields() {
        Attendence updatedAttendence = new Attendence();
        when(attendenceRepository.findById(1L)).thenReturn(Optional.of(attendence));
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Collections.emptyList());
        when(attendenceRepository.save(any(Attendence.class))).thenReturn(attendence);
        Attendence result = attendenceService.updateAttendence(1L, updatedAttendence);
        assertNotNull(result);
        assertEquals(LocalTime.of(7, 30), result.getCheckInTime());
        assertEquals(AttendenceStatus.PRESENT, result.getStatus());
        verify(attendenceRepository).findById(1L);
        verify(employeeRepository, never()).findById(anyLong());
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
        verify(attendenceRepository).save(any(Attendence.class));
    }

    @Test
    void testDeleteAttendence() {
        doNothing().when(attendenceRepository).deleteById(1L);
        attendenceService.deleteAttendence(1L);
        verify(attendenceRepository).deleteById(1L);
    }

    @Test
    void testCalculateStatus_OnLeave() {
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setId(101L);
        leaveRequest.setEmployee(employee);
        leaveRequest.setStartDate(LocalDate.of(2025, 6, 1));
        leaveRequest.setEndDate(LocalDate.of(2025, 6, 1));
        leaveRequest.setStatus(RequestStatus.APPROVED);
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Arrays.asList(leaveRequest));
        AttendenceStatus status = attendenceService.calculateStatus(employee, LocalDate.of(2025, 6, 1), LocalTime.of(7, 30));
        assertEquals(AttendenceStatus.ON_LEAVE, status);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
    }

    @Test
    void testCalculateStatus_Absent() {
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Collections.emptyList());
        AttendenceStatus status = attendenceService.calculateStatus(employee, LocalDate.of(2025, 6, 1), null);
        assertEquals(AttendenceStatus.ABSENT, status);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
    }

    @Test
    void testCalculateStatus_Late() {
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Collections.emptyList());
        AttendenceStatus status = attendenceService.calculateStatus(employee, LocalDate.of(2025, 6, 1), LocalTime.of(8, 15));
        assertEquals(AttendenceStatus.LATE, status);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
    }

    @Test
    void testCalculateStatus_Present() {
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1)))
                .thenReturn(Collections.emptyList());
        AttendenceStatus status = attendenceService.calculateStatus(employee, LocalDate.of(2025, 6, 1), LocalTime.of(7, 30));
        assertEquals(AttendenceStatus.PRESENT, status);
        verify(leaveRequestRepository).findApprovedLeaveByEmployeeAndDate(1L, LocalDate.of(2025, 6, 1));
    }

    @Test
    void testMarkAttendence_NewAttendence() {
        when(attendenceRepository.findByEmployeeAndDate(employee, LocalDate.now())).thenReturn(Collections.emptyList());
        when(leaveRequestRepository.findApprovedLeaveByEmployeeAndDate(1L, LocalDate.now()))
                .thenReturn(Collections.emptyList());
        when(attendenceRepository.save(any(Attendence.class))).thenReturn(attendence);
        Attendence result = attendenceService.markAttendence(employee);
        assertNotNull(result);
        assertEquals(employee, result.getEmployee());
        assertNotNull(result.getCheckInTime());
        verify(attendenceRepository).findByEmployeeAndDate(employee, LocalDate.now());
        verify(attendenceRepository).save(any(Attendence.class));
    }

    @Test
    void testMarkAttendence_ExistingAttendence() {
        when(attendenceRepository.findByEmployeeAndDate(employee, LocalDate.now())).thenReturn(Arrays.asList(attendence));
        Attendence result = attendenceService.markAttendence(employee);
        assertNotNull(result);
        assertEquals(attendence, result);
        verify(attendenceRepository, times(1)).findByEmployeeAndDate(employee, LocalDate.now());
        verify(attendenceRepository, never()).save(any(Attendence.class));
    }

    @Test
    void testMarkCheckoutAttendence_Success() {
        attendence.setCheckOutTime(null);
        when(attendenceRepository.findByEmployeeAndDate(employee, LocalDate.now())).thenReturn(Arrays.asList(attendence));
        when(attendenceRepository.save(attendence)).thenReturn(attendence);
        Attendence result = attendenceService.markCheckoutAttendence(employee);
        assertNotNull(result);
        assertNotNull(result.getCheckOutTime());
        verify(attendenceRepository).findByEmployeeAndDate(employee, LocalDate.now());
        verify(attendenceRepository).save(attendence);
    }

    @Test
    void testMarkCheckoutAttendence_AlreadyCheckedOut() {
        when(attendenceRepository.findByEmployeeAndDate(employee, LocalDate.now())).thenReturn(Arrays.asList(attendence));
        Attendence result = attendenceService.markCheckoutAttendence(employee);
        assertNotNull(result);
        assertEquals(LocalTime.of(17, 0), result.getCheckOutTime());
        verify(attendenceRepository).findByEmployeeAndDate(employee, LocalDate.now());
        verify(attendenceRepository, never()).save(any(Attendence.class));
    }

    @Test
    void testMarkCheckoutAttendence_NoAttendence() {
        when(attendenceRepository.findByEmployeeAndDate(employee, LocalDate.now())).thenReturn(Collections.emptyList());
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            attendenceService.markCheckoutAttendence(employee);
        });
        assertEquals("No attendance found for employee on " + LocalDate.now(), exception.getMessage());
        verify(attendenceRepository).findByEmployeeAndDate(employee, LocalDate.now());
        verify(attendenceRepository, never()).save(any(Attendence.class));
    }
}
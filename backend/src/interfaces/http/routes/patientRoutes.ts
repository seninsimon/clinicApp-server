import express from "express";
import { authenticate } from "../../../infrastructure/middleware/authMiddleware";
import { checkRole } from "../../../infrastructure/middleware/roleMiddleware";

const router = express.Router();

// Patient dashboard
router.get("/dashboard", authenticate, checkRole(['patient']), (req, res) => {
  // This would typically fetch patient dashboard data from a service
  res.status(200).json({
    message: "Patient dashboard data retrieved successfully",
    stats: {
      upcomingAppointments: 2,
      pastAppointments: 5,
      prescriptions: 3,
      medicalRecords: 2
    }
  });
});

// Get available doctors
router.get("/doctors", authenticate, checkRole(['patient']), (req, res) => {
  // This would typically fetch available doctors from a service
  res.status(200).json({
    message: "Available doctors retrieved successfully",
    doctors: [
      { 
        id: 1, 
        name: "Dr. Smith", 
        specialisation: "Cardiology", 
        experience: 10,
        fee: 1500,
        availableSlots: [
          { date: "2025-05-20", time: "10:00 AM" },
          { date: "2025-05-20", time: "11:00 AM" },
          { date: "2025-05-21", time: "02:00 PM" }
        ]
      },
      { 
        id: 2, 
        name: "Dr. Johnson", 
        specialisation: "Neurology", 
        experience: 15,
        fee: 2000,
        availableSlots: [
          { date: "2025-05-19", time: "09:00 AM" },
          { date: "2025-05-19", time: "10:00 AM" },
          { date: "2025-05-22", time: "03:00 PM" }
        ]
      }
    ]
  });
});

// Book appointment
router.post("/appointments", authenticate, checkRole(['patient']), (req: express.Request & { user?: { sub: string; role: string } }, res) => {
  const { doctorId, date, time } = req.body;
  
  if (!doctorId || !date || !time) {
    res.status(400).json({ message: "Doctor ID, date, and time are required" });
    return;
  }
  
  // This would typically book the appointment in the database
  res.status(201).json({
    message: "Appointment booked successfully",
    appointment: {
      id: Math.floor(Math.random() * 1000),
      doctorId,
      patientId: req.user?.sub || 'unknown',
      date,
      time,
      status: "Scheduled"
    }
  });
});

// Get patient appointments
router.get("/appointments", authenticate, checkRole(['patient']), (req, res) => {
  // This would typically fetch the patient's appointments from a service
  res.status(200).json({
    message: "Appointments retrieved successfully",
    appointments: [
      { 
        id: 101, 
        doctor: "Dr. Smith", 
        specialisation: "Cardiology", 
        date: "2025-05-20", 
        time: "10:00 AM", 
        status: "Scheduled" 
      },
      { 
        id: 102, 
        doctor: "Dr. Johnson", 
        specialisation: "Neurology", 
        date: "2025-05-15", 
        time: "09:00 AM", 
        status: "Completed" 
      }
    ]
  });
});

// Cancel appointment
router.delete("/appointments/:id", authenticate, checkRole(['patient']), (req, res) => {
  const { id } = req.params;
  
  // This would typically cancel the appointment in the database
  res.status(200).json({
    message: `Appointment ${id} cancelled successfully`,
    appointmentId: id
  });
});

// Get medical records
router.get("/medical-records", authenticate, checkRole(['patient']), (req, res) => {
  // This would typically fetch the patient's medical records from a service
  res.status(200).json({
    message: "Medical records retrieved successfully",
    records: [
      { 
        id: 201, 
        date: "2025-04-15", 
        doctor: "Dr. Smith", 
        diagnosis: "Hypertension", 
        prescription: "Lisinopril 10mg" 
      },
      { 
        id: 202, 
        date: "2025-03-10", 
        doctor: "Dr. Johnson", 
        diagnosis: "Migraine", 
        prescription: "Sumatriptan 50mg" 
      }
    ]
  });
});

export default router;

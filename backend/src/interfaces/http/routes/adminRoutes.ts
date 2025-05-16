import express from "express";
import { authenticate } from "../../../infrastructure/middleware/authMiddleware";
import { checkRole } from "../../../infrastructure/middleware/roleMiddleware";

const router = express.Router();

// Admin dashboard data
router.get("/dashboard", authenticate, checkRole(['admin']), (req, res) => {
  // This would typically fetch admin dashboard data from a service
  res.status(200).json({
    message: "Admin dashboard data retrieved successfully",
    stats: {
      totalUsers: 120,
      totalDoctors: 25,
      pendingApprovals: 5,
      totalAppointments: 450
    }
  });
});

// Get all users (admin only)
router.get("/users", authenticate, checkRole(['admin']), (req, res) => {
  // This would typically fetch users from a service
  res.status(200).json({
    message: "Users retrieved successfully",
    // Sample data
    users: [
      { id: 1, name: "User 1", email: "user1@example.com", role: "patient" },
      { id: 2, name: "User 2", email: "user2@example.com", role: "patient" }
    ]
  });
});

// Get all doctors (admin only)
router.get("/doctors", authenticate, checkRole(['admin']), (req, res) => {
  // This would typically fetch doctors from a service
  res.status(200).json({
    message: "Doctors retrieved successfully",
    // Sample data
    doctors: [
      { id: 1, name: "Dr. Smith", specialization: "Cardiology", status: "Approved" },
      { id: 2, name: "Dr. Johnson", specialization: "Neurology", status: "Pending" }
    ]
  });
});

// Approve or reject doctor (admin only)
router.patch("/doctors/:id/status", authenticate, checkRole(['admin']), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status || !['Approved', 'Rejected'].includes(status)) {
    res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'" });
    return;
  }
  
  // This would typically update the doctor's status in the database
  res.status(200).json({
    message: `Doctor ${id} status updated to ${status}`,
    doctorId: id,
    status
  });
});

export default router;

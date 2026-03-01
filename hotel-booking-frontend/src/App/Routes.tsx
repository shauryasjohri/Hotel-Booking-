import { Routes, Route } from "react-router-dom";

import AnimatedLayout from "./AnimatedLayout";
import LandingPage from "../Pages/Landing/LandingPage";
import SearchResultsPage from "../Pages/Search/SearchResultsPage";
import HotelDetailPage from "../Pages/Hotels/HotelDetailPage";
import BookingPage from "../Pages/Booking/BookingPage";
import ConfirmationPage from "../Pages/Confirmation/ConfirmationPage";
import MyBookingsPage from "../Pages/MyBookings/MyBookings";
import ProtectedRoute from "../Components/Common/ProtectedRoute/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AnimatedLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />

        <Route
          path="/hotel/:id/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route path="/booking/confirmation" element={<ConfirmationPage />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

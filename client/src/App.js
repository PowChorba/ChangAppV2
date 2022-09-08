/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
//COMPONENTES PARA LAS RUTAS
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import Servicios from "./componentes/Servicios/Servicios";
import EditProfile from "./componentes/Settings/EditProfile";
import Password from "./componentes/ResetPassword/Password";
import Profile from "./componentes/Settings/Profile";
import Settings from "./componentes/Settings/Settings";
import Landing from "./componentes/landing/Landing.jsx";
import RequestService from "./componentes/RequestService/RequestService";
import Stripe from "./componentes/Stripe";
import PublicServices from "./componentes/Settings/ServicePublic";
import UpdateService from "./componentes/Settings/UpdateService/UpdateService";
import Guardar from "./componentes/Home/Guardar";
import FilterCategory from "./componentes/Home/FiltersCategorys/FilterCategory";
import AllCategorys from "./componentes/Home/FiltersCategorys/AllCategorys";
import StateRequest from "./componentes/Settings/Request/StateRequest";
import StateRequester from "./componentes/Settings/Request/StateOfer";
import Review from "./componentes/Review";
import PublicProfile from "./componentes/Home/RenderProfile/PublicProfile";
import Notifications from "./componentes/Settings/Notifications";
import Admin from "./componentes/admin/Admin";
import Adminnavbar from "./componentes/admin/Admin-navbar";
import Users from "./componentes/admin/Users";
import Categories from "./componentes/admin/Categories";
import CreateCategory from "./componentes/admin/CreateCategory";
import PrivateRoute from "./componentes/PrivateRoute/PrivateRoute";
import UserDetail from "./componentes/admin/UserDetail";
import DeleteCategory from "./componentes/admin/DeleteCategory";
import AdminPrivate from "./componentes/PrivateRoute/AdminPrivate";
import Services from "./componentes/admin/Services";
import Request from "./componentes/admin/Requests";
import ProfileRev from "./componentes/Settings/ProfileRev";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Guardar />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/:name"
          element={
            <PrivateRoute>
              <FilterCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/public/:id"
          element={
            <PrivateRoute>
              <PublicProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/todos"
          element={
            <PrivateRoute>
              <AllCategorys />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/createService"
          element={
            <PrivateRoute>
              <Servicios />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/services/:id"
          element={
            <PrivateRoute>
              <RequestService />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/review/:id"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/services/payment/:id"
          element={
            <PrivateRoute>
              <Stripe />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings/"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        >
          <Route path="edit" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />

          <Route path="services/" element={<PublicServices />} />
          <Route path="reviews" element={<ProfileRev />} />
          <Route path="services/:id" element={<UpdateService />} />
          <Route path="request" element={<StateRequest />} />
          <Route path="requester" element={<StateRequester />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reviews" element={<ProfileRev />} />
        </Route>

        {/* SECCION ADMINISTRADOR */}
        <Route
          path="/admin/"
          element={
            <AdminPrivate>
              <Adminnavbar />
            </AdminPrivate>
          }
        >
          <Route
            path="users"
            element={
              <AdminPrivate>
                <Users />
              </AdminPrivate>
            }
          />
          <Route
            path="dashboard"
            element={
              <AdminPrivate>
                <Admin />
              </AdminPrivate>
            }
          />
          <Route
            path="users/:id"
            element={
              <AdminPrivate>
                <UserDetail />
              </AdminPrivate>
            }
          />
          <Route
            path="categories"
            element={
              <AdminPrivate>
                <Categories />
              </AdminPrivate>
            }
          />
          <Route
            path="createCategory"
            element={
              <AdminPrivate>
                <CreateCategory />
              </AdminPrivate>
            }
          />
          <Route
            path="deleteCategory"
            element={
              <AdminPrivate>
                <DeleteCategory />
              </AdminPrivate>
            }
          />
          <Route
            path="services"
            element={
              <AdminPrivate>
                <Services />
              </AdminPrivate>
            }
          />
          <Route
            path="requests"
            element={
              <AdminPrivate>
                <Request />
              </AdminPrivate>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import HomePage from "./pages/home/HomePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import {Toaster} from "react-hot-toast"
import { useQuery} from "@tanstack/react-query"
import LoadingSpinner from "./components/common/LoadingSpinner"
import Videos from "./pages/home/Videos"
// import EditProfileModal from "./pages/profile/EditProfileModal"

function App() {

  const {data:authUser, isLoading}=useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
          const res=await fetch("/api/auth/me");
          const data=await res.json();
          if(data.error) return null;
          if(!res.ok) throw new Error(data.error  || "Somethin went wrong");        
          console.log("Auth user is here:",data);  //!Suprime this line 
          return data.user;    
      } catch (error) {
        throw new Error(error);
      }
    },
    retry:false,
  })

  if(isLoading){
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"/>
      </div>
    )
  } 

  // console.log(authUser)

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar/>}
      <Routes>
        
        <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage/>: <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage/>: <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ?<NotificationPage/>: <Navigate to="/login" />} />
        <Route path="/profile/:username" element={authUser ?<ProfilePage/>: <Navigate to="/login" />} />
        <Route path="/videos/videos" element={authUser ?<Videos/>: <Navigate to="/login" />} />

      </Routes>
      {authUser && location.pathname !== '/videos/videos' && <RightPanel />}
        <Toaster/>
    </div>
  )
}

export default App
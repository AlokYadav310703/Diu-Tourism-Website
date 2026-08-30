import { createBrowserRouter } from "react-router-dom";
import Nagoa from "./components/Places/Nagoa";
import Ghoghla from "./components/Places/Ghoghla";
import Chakratirth from "./components/Places/Chakratirth";
import DiuFort from "./components/Places/DiuFort";
import Maps from "./components/Places/Maps";
import AdminActivities from "./components/Admin/AdminActivities";
import PaniKotha from "./components/Places/PaniKotha";
import Jallandhar from "./components/Places/Jallandhar";
import Gomtimata from "./components/Places/Gomtimata";
import GangeshwarTemple from "./components/Places/GangeshwarTemple";
import Home from "./components/Places/Home";
import LocalBuses from "./components/Transport/LocalBuses";
import StateBuses from "./components/Transport/StateBuses";
import Rickshaw from "./components/Transport/Rickshaw";
import Hotels from "./components/Hotels_Restaurants/Hotels";
import Restaurants from "./components/Hotels_Restaurants/Restaurants";
import Flights from "./components/Transport/Flights";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import AddRemovePublicToilets from "./components/Admin/AddRemovePublicToilets";
import RemoveFeedback from "./components/Admin/RemoveFeedback";
import RemoveReply from "./components/Admin/RemoveReply";
import AdminContactUs from "./components/Admin/AdminContactUs";
import AdminLogin from "./components/Admin/AdminLogin";
import SideBar from "./components/Slidebar/Slidebar";
import EventPlanner from "./components/EventPlanner/EventPlanner";
import About from "./components/Features/About";
// import Disp from "./components/Features/UtilityMaps";
import ContactUs from "./components/Features/ContactUs";
import Layout from "./components/Features/Layout";
import DispNearUtility from "./components/Features/DispNearUtility";
import StPaulsChurch from "./components/Places/StPaulsChurch";
import SeaShellMuseum from "./components/Places/SeaShellMuseum";
import NadiaCaves from "./components/Places/NadiaCaves";
import KhukhriMemorial from "./components/Places/KhukriMemorial";
// import Gangeshwar from "./components/Places/GangeshwarTemple";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "/DispNearUtility",
        element: <DispNearUtility />
      },
      {
        path: "/AdminActivities",
        element: <AdminActivities />
      },
      {
        path: "/addPublicToilets",
        element: <AddRemovePublicToilets />
      },
      {
        path: "/removePublicToilets",
        element: <AddRemovePublicToilets />
      },
      {
        path: "/AdminContactUs",
        element: <AdminContactUs />
      }
    ],
  },


  {
    path: "/places",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Nagoa />,
      },
      {
        path: "nagoa",
        element: <Nagoa />,
      },
      {
        path: "ghoghla",
        element: <Ghoghla />,
      },
      {
        path: "chakratirth",
        element: <Chakratirth />,
      },
      {
        path: "jallandhar",
        element: <Jallandhar />,
      },
      {
        path: "gomtimata",
        element: <Gomtimata />,
      },
      {
        path: "diuFort",
        element: <DiuFort />,
      },
      {
        path: "paniKotha",
        element: <PaniKotha />,
      },
      {
        path: "temples",
        element: <GangeshwarTemple />,
      },
      {
        path: "stPaulsChurch",
        element: <StPaulsChurch />,
      },
      {
        path: "nadiaCaves",
        element: <NadiaCaves />,
      },
      {
        path: "khukriMemorial",
        element: <KhukhriMemorial />,
      },

      {
        path: "seaShellMuseum",
        element: <SeaShellMuseum />,
      },
    ],
  },

  {
    path: "/transport",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LocalBuses />,
      },
      {
        path: "buses",
        element: <LocalBuses />
      },
      {
        path: "statebuses",
        element: <StateBuses />
      },
      {
        path: "rickshaw",
        element: <Rickshaw />
      },

    ],
  },

  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminLogin/>,
      },
      {
        path: "Login",
        element: <AdminLogin/>
      },
      {
        path: "statebuses",
        element: <StateBuses />
      },
      {
        path: "rickshaw",
        element: <Rickshaw />
      },
      {
        path: "Remove_reply",
        element: <RemoveReply />
      },
      {
        path: "Remove_feedback",
        element: <RemoveFeedback />
      },
    ],
  },

  {
    path: "/eventPlanner",
    element: <EventPlanner />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/hotels",
    element: <Hotels />
  },
  {
    path: "/adminAct",
    element: <AdminActivities />
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />
  },
  {
    path: "/restaurants",
    element: <Restaurants />
  },
  {
    path: "/transport/flights",
    element: <Flights />
  },
 
  {
    path: "/maps",
    element: <Maps />
  },
  {
    path: "/sidebar",
    element: <SideBar />
  },

  // {
  //   path: "/admin/Add_remove_stateBuses",
  //   element: <AddRemoveStateBuses />
  // },
  // {
  //   path: "/admin/Add_remove_rickshaw",
  //   element: <AddRemoveRickshaw />
  // },
  // {
  //   path: "/admin/Add_remove_restaurants",
  //   element: <AddRemoveRestaurants />
  // },
  // {
  //   path: "/admin/Add_remove_localBuses",
  //   element: <AddRemoveLocalBuses />
  // },
  // {
  //   path: "/admin/Add_remove_hotels",
  //   element: <AddRemoveHotels />
  // },
  // {
  //   path: "/admin/Remove_reply",
  //   element: <RemoveReply />
  // },
  // {
  //   path: "/admin/Remove_feedback",
  //   element: <RemoveFeedback />
  // },

]);

export default router;

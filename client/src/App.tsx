import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/layout";
import TournamentDetails from "./pages/TournamentDetails";
import CreateTournament from "./pages/CreateTournament";
import EditTournament from "./pages/editTournament";
// import TournamentForm from "./pages/form";
const Loading = () => {
  return (
    <div className="w-full min-h-96 flex justify-center items-center text-center py-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg font-semibold text-blue-500">Loading ...</p>
    </div>
  );
};

function App() {
  const Home = lazy(() => import("./pages/home"));

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <TournamentDetails />
            </Suspense>
          }
        />
        //{" "}
        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EditTournament />
            </Suspense>
          }
        />
        <Route
          path="/create"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CreateTournament />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

import { useEffect } from "react";
import { fetchAppData } from "./features/app/appSlice";
import Loader from "./components/Loader";
import BlockStyles from "./components/Styles/BlockStyles";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { ThemeProvider } from "./themes/ThemeProvider";
import EditorView from "./components/Editor";
import Sidebar from "./components/Editor/Sidebar";
import { useDrag } from "react-dnd";

const TestCard = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { id: "demo" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    console.log("dragging");
  }, [isDragging]);

  return (
    <div
      ref={drag}
      className={`p-4 border rounded ${isDragging ? "opacity-50" : ""}`}
    >
      Drag Me
    </div>
  );
};

export default function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.loading); // 👈 get loading state

  useEffect(() => {
    console.log(window.location.pathname);
    dispatch(fetchAppData(window.location.pathname));
  }, [dispatch]);

  if (loading) {
    return <Loader />; // 👈 show loader while data is being fetched
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <BlockStyles />
        {/* Fixed Sidebar */}

        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {/* <TestCard /> */}
          <EditorView />
        </div>
      </div>
    </ThemeProvider>
  );
}

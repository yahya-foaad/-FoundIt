import { createContext, useContext, useEffect, useMemo, useState } from "react";
import initialReports from "../data/adminitems.json";

const AdminReportsContext = createContext();

const AdminReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(initialReports);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

//   const getAllReports = async () => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);
// //       // const res = await fetch("/api/reports");
// //       // const data = await res.json();
// //       // setReports(data);
// //       console.log("get reports done");
// //     } catch (e) {
// //       setError(e.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

//   useEffect(() => {
//     getAllReports();
//   }, []);

  const stats = useMemo(
    () => ({
      totalReports: reports.length,
      openReports: reports.filter((report) => report.status === "pending")
        .length,
    }),
    [reports]
  );

  return (
    <AdminReportsContext.Provider
      value={{
        reports,
        setReports,
        stats,
        isLoading,
        error,
        // getAllReports,
      }}
    >
      {children}
    </AdminReportsContext.Provider>
  );
};

export default AdminReportsProvider;

export const useAdminReports = () => useContext(AdminReportsContext);
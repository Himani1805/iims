import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AcademicYear,
  Department,
  Institution,
  Programme,
  ProgrammeType,
  School,
  Section,
  Semester,
} from "../assets/js/data/Commondata/commonData.js";
import { getMasterData } from "../services/masterDataApi";
import { useAuth } from "./AuthContext";

const MasterDataContext = createContext(null);

const FALLBACK = {
  Institution: Institution.map((item) => ({ id: item.id, name: item.name })),
  School: School.map((item) => ({ id: item.id, name: item.name })),
  Department: Department.map((item) => ({ id: item.id, name: item.name })),
  AcademicYear: AcademicYear.map((item) => ({ id: item.id, name: item.year })),
  ProgrammeType: ProgrammeType.map((item) => ({ id: item.id, name: item.name })),
  Programme: Programme.map((item) => ({ id: item.id, name: item.name })),
  Semester: Semester.map((item) => ({ id: item.id, name: item.name })),
  Section: Section.map((item) => ({ id: item.id, name: item.name })),
};

export function MasterDataProvider({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const [items, setItems] = useState(FALLBACK);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!isAuthenticated || !isAdmin) {
      setItems(FALLBACK);
      return;
    }
    setLoading(true);
    try {
      const data = await getMasterData();
      setItems({
        Institution: data.Institution?.length ? data.Institution : FALLBACK.Institution,
        School: data.School?.length ? data.School : FALLBACK.School,
        Department: data.Department?.length ? data.Department : FALLBACK.Department,
        AcademicYear: data.AcademicYear?.length ? data.AcademicYear : FALLBACK.AcademicYear,
        ProgrammeType: data.ProgrammeType?.length ? data.ProgrammeType : FALLBACK.ProgrammeType,
        Programme: data.Programme?.length ? data.Programme : FALLBACK.Programme,
        Semester: data.Semester?.length ? data.Semester : FALLBACK.Semester,
        Section: data.Section?.length ? data.Section : FALLBACK.Section,
      });
    } catch {
      setItems(FALLBACK);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [isAuthenticated, isAdmin]);

  const value = useMemo(
    () => ({
      items,
      loading,
      refresh,
      optionsFor: (type) => items[type] || [],
    }),
    [items, loading]
  );

  return (
    <MasterDataContext.Provider value={value}>{children}</MasterDataContext.Provider>
  );
}

export function useMasterData() {
  const ctx = useContext(MasterDataContext);
  if (!ctx) throw new Error("useMasterData must be used inside MasterDataProvider");
  return ctx;
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ISchooling } from "../../../types";
import { useTranslation } from "react-i18next";

import "../styles/styles.scss";
import { useMemo } from "react";

type GraphsViewProps = {
  data: ISchooling[];
  isLoading: boolean;
};

/**
 * Represents a view for displaying graphs.
 * This class provides methods for rendering and interacting with graphs.
 */
export const GraphsView = ({ data, isLoading }: GraphsViewProps) => {
  const { t } = useTranslation();

  const graphBySex = useMemo(
    () => [
      {
        name: t("male"),
        masculino: 0,
      },
      {
        name: t("female"),
        femenino: 0,
      },
    ],
    [t],
  );

  const graphByEducationType = useMemo(
    () => [
      {
        name: "Especial",
        especial: 0,
      },
      {
        name: "Regular",
        regular: 0,
      },
    ],
    [],
  );

  const graphByEducationLevel = useMemo(
    () => [
      { name: t("MATERNAL"), maternal: 0 },
      { name: t("KINDERGARTEN"), kinder: 0 },
      { name: t("ELEMENTARY_SCHOOL"), primaria: 0 },
      { name: t("MIDDLE_SCHOOL"), secundaria: 0 },
      { name: t("HIGH_SCHOOL"), preparatoria: 0 },
      { name: t("COLLEGE"), universidad: 0 },
    ],
    [t],
  );

  if (!data.length || isLoading) {
    return <>{t("no data")}</>;
  }

  data.forEach((beneficiary) => {
    if (beneficiary.specialEducation) {
      graphByEducationType[0].especial++;
    } else {
      graphByEducationType[1].regular++;
    }

    if (beneficiary.sex) {
      if (beneficiary.studying) graphBySex[0].masculino++;
    } else if (!beneficiary.sex && beneficiary.studying)
      graphBySex[1].femenino++;

    switch (beneficiary.levelOfEducation) {
      case "KINDERGARTEN":
        graphByEducationLevel[1].kinder++;
        break;
      case "MATERNAL":
        graphByEducationLevel[0].maternal++;
        break;
      case "ELEMENTARY_SCHOOL":
        graphByEducationLevel[2].primaria++;
        break;
      case "MIDDLE_SCHOOL":
        graphByEducationLevel[3].secundaria++;
        break;
      case "HIGH_SCHOOL":
        graphByEducationLevel[4].preparatoria++;
        break;
      case "COLLEGE":
        graphByEducationLevel[5].universidad++;
        break;
      default:
        throw new Error("unhandled education type");
    }
  });

  return (
    <section className="graphs-container">
      <div>
        <p>{t("beneficiaries that attend school")}</p>
        <BarChart
          width={500}
          height={300}
          data={graphBySex}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={40}
            dataKey="masculino"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="femenino"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
      <div>
        <p>{t("specialEducation")}</p>
        <BarChart
          width={500}
          height={300}
          data={graphByEducationType}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={40}
            dataKey="especial"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="regular"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
      <div className="align-center education-level">
        <p style={{ width: "fit-content" }}>{t("last education level")}</p>
        <BarChart
          width={700}
          height={300}
          data={graphByEducationLevel}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={40}
            dataKey="maternal"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="kinder"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="primaria"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="secundaria"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="preparatoria"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="universidad"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
    </section>
  );
};

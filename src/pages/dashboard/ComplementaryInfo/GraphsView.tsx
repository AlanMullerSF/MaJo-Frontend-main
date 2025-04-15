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
import { IComplementaryInfo } from "../../../types";
import { useTranslation } from "react-i18next";

import "../styles/styles.scss";
import { useMemo } from "react";

type GraphsViewProps = {
  data: IComplementaryInfo[];
  isLoading: boolean;
};

/**
 * Renders a view that displays graphs based on the provided data.
 * @param {GraphsViewProps} data - The data to be displayed in the graphs.
 * @param {boolean} isLoading - Indicates whether the data is currently being loaded.
 * @returns The rendered view with the graphs.
 */
export const GraphsView = ({ data, isLoading }: GraphsViewProps) => {
  const { t } = useTranslation();

  const graphsByReasonForJoining = useMemo(
    () => [
      {
        name: t("KNOWLEDGE"),
        [t("KNOWLEDGE")]: 0,
      },
      {
        name: t("COMMUNITY"),
        [t("COMMUNITY")]: 0,
      },
      {
        name: t("MEDICAL_SUPPORT"),
        [t("MEDICAL_SUPPORT")]: 0,
      },
      {
        name: t("ECONOMIC_SUPPORT"),
        [t("ECONOMIC_SUPPORT")]: 0,
      },
      {
        name: t("OTHER"),
        [t("OTHER")]: 0,
      },
    ],
    [t],
  );

  const graphsBySocialSecurityType = useMemo(
    () => [
      { name: t("NONE"), ninguno: 0 },
      { name: "IMSS", IMSS: 0 },
      { name: "ISSSTE", ISSSTE: 0 },
      { name: "INSABI", INSABI: 0 },
      { name: "SEDENA", SEDENA: 0 },
      { name: "PEMEX", PEMEX: 0 },
      { name: t("MAJOR_MEDIC_EXPENSES"), ["Gastos Medicos Mayores"]: 0 },
    ],
    [t],
  );

  if (!data.length || isLoading) {
    return <>{t("no data")}</>;
  }

  data.forEach((beneficiary) => {
    beneficiary.reasonsForJoining.forEach((el) => {
      switch (el) {
        case "KNOWLEDGE":
          graphsByReasonForJoining[0][t("KNOWLEDGE")]++;
          break;
        case "COMMUNITY":
          graphsByReasonForJoining[1][t("COMMUNITY")]++;
          break;
        case "MEDICAL_SUPPORT":
          graphsByReasonForJoining[2][t("MEDICAL_SUPPORT")]++;
          break;
        case "ECONOMIC_SUPPORT":
          graphsByReasonForJoining[3][t("ECONOMIC_SUPPORT")]++;
          break;
        default:
          graphsByReasonForJoining[4][t("OTHER")]++;
          break;
      }
    });

    switch (beneficiary.socialSecurityRegime) {
      case "NONE":
        graphsBySocialSecurityType[0].ninguno++;
        break;
      case "IMSS":
        graphsBySocialSecurityType[1].IMSS++;
        break;
      case "ISSSTE":
        graphsBySocialSecurityType[2].ISSSTE++;
        break;
      case "INSABI":
        graphsBySocialSecurityType[3].INSABI++;
        break;
      case "SEDENA":
        graphsBySocialSecurityType[4].SEDENA++;
        break;
      case "PEMEX":
        graphsBySocialSecurityType[5].PEMEX++;
        break;
      case "MAJOR_MEDIC_EXPENSES":
        graphsBySocialSecurityType[6]["Gastos Medicos Mayores"]++;
        break;
      default:
        throw new Error("unhandled social security regime");
    }
  });

  return (
    <section className="graphs-container">
      <div className="align-center reasons-for-joining">
        <p>{t("social security type")}</p>
        <BarChart
          width={1000}
          height={300}
          data={graphsBySocialSecurityType}
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
            dataKey={t("NONE")}
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="IMSS"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="ISSSTE"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="INSABI"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="SEDENA"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey="PEMEX"
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey="Gastos Medicos Mayores"
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </div>
      <div className="align-center reasons-for-joining">
        <p>{t("main reason for joining")}</p>
        <BarChart
          width={1000}
          height={300}
          data={graphsByReasonForJoining}
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
            dataKey={t("KNOWLEDGE")}
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey={t("COMMUNITY")}
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey={t("MEDICAL_SUPPORT")}
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            barSize={40}
            dataKey={t("ECONOMIC_SUPPORT")}
            fill="#FF9BD5"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            barSize={40}
            dataKey={t("OTHER")}
            fill="#AE196F"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </div>
    </section>
  );
};
